#!/usr/bin/env python3
"""Weekly Spotify Liked Songs sync.

Reads SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN from
the environment, paginates /v1/me/tracks, batches /v1/artists for portraits,
and writes data/music-library.json grouped by artist.

Designed to run as a oneshot systemd service on the VDS. Exits non-zero on
any unrecoverable error so the timer surfaces it via journalctl.
"""

from __future__ import annotations

import base64
import json
import os
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

API = "https://api.spotify.com/v1"
TOKEN_URL = "https://accounts.spotify.com/api/token"  # noqa: S105
USER_AGENT = "chelebi-blog-sync/1.0"


def env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        print(f"missing env {name}", file=sys.stderr)
        sys.exit(2)
    return value


def http_json(req: urllib.request.Request, retries: int = 4) -> Any:
    delay = 1.0
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:  # noqa: S310
                return json.loads(resp.read())
        except urllib.error.HTTPError as exc:
            if exc.code == 429:
                wait = int(exc.headers.get("Retry-After", "2"))
                time.sleep(wait + 1)
                continue
            if 500 <= exc.code < 600 and attempt < retries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            body = exc.read().decode("utf-8", errors="replace")
            print(f"http {exc.code} from {req.full_url}: {body}", file=sys.stderr)
            raise
        except urllib.error.URLError:
            if attempt < retries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            raise
    raise RuntimeError("exhausted retries")


def access_token(client_id: str, client_secret: str, refresh_token: str) -> str:
    basic = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    body = urllib.parse.urlencode(
        {"grant_type": "refresh_token", "refresh_token": refresh_token}
    ).encode()
    req = urllib.request.Request(
        TOKEN_URL,
        data=body,
        headers={
            "Authorization": f"Basic {basic}",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": USER_AGENT,
        },
        method="POST",
    )
    data = http_json(req)
    return data["access_token"]


def auth_get(url: str, token: str) -> Any:
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "User-Agent": USER_AGENT,
        },
    )
    return http_json(req)


def fetch_liked_tracks(token: str) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    url: str | None = f"{API}/me/tracks?limit=50"
    while url:
        page = auth_get(url, token)
        items.extend(page.get("items", []))
        url = page.get("next")
    return items


def fetch_artist_images(token: str, artist_ids: list[str]) -> dict[str, str]:
    """Best-effort fetch of artist portrait images.

    Spotify restricts /v1/artists for apps in Development mode (returns 403),
    so the caller must tolerate an empty dict and fall back to album covers
    for artist tiles.
    """
    images: dict[str, str] = {}
    for i in range(0, len(artist_ids), 50):
        batch = artist_ids[i : i + 50]
        url = f"{API}/artists?ids={','.join(batch)}"
        try:
            data = auth_get(url, token)
        except urllib.error.HTTPError as exc:
            if exc.code == 403:
                print(
                    "artist-portrait fetch blocked (403); falling back to album covers",
                    flush=True,
                )
                return {}
            raise
        for artist in data.get("artists", []):
            if not artist:
                continue
            imgs = artist.get("images") or []
            if imgs:
                images[artist["id"]] = imgs[0]["url"]
    return images


def ms_to_duration(ms: int) -> str:
    total = ms // 1000
    return f"{total // 60}:{total % 60:02d}"


def build_library(
    items: list[dict[str, Any]], artist_images: dict[str, str]
) -> list[dict[str, Any]]:
    by_artist: dict[str, dict[str, Any]] = {}
    for item in items:
        track = item.get("track")
        if not track or not track.get("id"):
            continue
        artists = track.get("artists") or []
        if not artists:
            continue
        primary = artists[0]
        artist_id = primary.get("id")
        artist_name = (primary.get("name") or "").lower()
        if not artist_id or not artist_name:
            continue
        album = track.get("album") or {}
        cover_imgs = album.get("images") or []
        cover = cover_imgs[0]["url"] if cover_imgs else ""
        song = {
            "title": (track.get("name") or "").lower(),
            "artist": ", ".join(a.get("name", "").lower() for a in artists),
            "album": (album.get("name") or "").lower(),
            "duration": ms_to_duration(track.get("duration_ms", 0)),
            "cover": cover,
            "spotifyId": track["id"],
            "spotifyUrl": (track.get("external_urls") or {}).get("spotify", ""),
            "previewUrl": track.get("preview_url"),
            "addedAt": item.get("added_at"),
            "sources": ["spotify"],
        }
        bucket = by_artist.setdefault(
            artist_id,
            {
                "artist": artist_name,
                "artistId": artist_id,
                "artistImage": artist_images.get(artist_id, cover),
                "songs": [],
            },
        )
        bucket["songs"].append(song)

    library = sorted(by_artist.values(), key=lambda a: len(a["songs"]), reverse=True)
    for entry in library:
        entry["songs"].sort(key=lambda s: s.get("addedAt") or "", reverse=True)
    return library


def main() -> int:
    client_id = env("SPOTIFY_CLIENT_ID")
    client_secret = env("SPOTIFY_CLIENT_SECRET")
    refresh_token = env("SPOTIFY_REFRESH_TOKEN")
    repo = pathlib.Path(os.environ.get("BLOG_REPO", pathlib.Path.cwd()))
    out = repo / "data" / "music-library.json"
    out.parent.mkdir(parents=True, exist_ok=True)

    print("requesting access token", flush=True)
    token = access_token(client_id, client_secret, refresh_token)

    print("fetching liked tracks", flush=True)
    items = fetch_liked_tracks(token)
    print(f"got {len(items)} tracks", flush=True)

    artist_ids = list({
        (item["track"]["artists"][0]["id"])
        for item in items
        if item.get("track") and item["track"].get("artists")
    })
    print(f"fetching {len(artist_ids)} artist portraits", flush=True)
    artist_images = fetch_artist_images(token, artist_ids)

    library = build_library(items, artist_images)
    total_songs = sum(len(a["songs"]) for a in library)

    payload = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "totalArtists": len(library),
        "totalSongs": total_songs,
        "source": "spotify:liked",
        "library": library,
    }
    out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    print(f"wrote {out} ({len(library)} artists, {total_songs} songs)", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
