#!/usr/bin/env python3
"""One-shot Spotify OAuth bootstrap.

Run this locally ONCE to mint a refresh token with user-library-read scope.
Copies an authorization URL to your terminal, captures the redirect on
http://127.0.0.1:8765/callback, exchanges the code, and prints the refresh
token. Paste that token into /etc/spotify-sync.env on the VDS.

Usage:
    export SPOTIFY_CLIENT_ID=...
    export SPOTIFY_CLIENT_SECRET=...
    python3 scripts/spotify-bootstrap.py

Required redirect URI in your Spotify app dashboard:
    http://127.0.0.1:8765/callback
"""

from __future__ import annotations

import base64
import http.server
import json
import os
import secrets
import sys
import threading
import urllib.parse
import urllib.request
import webbrowser

REDIRECT = "http://127.0.0.1:8765/callback"
# Superset of every scope the existing token already had (playlists, playback
# state, recently-played) plus user-library-read for the weekly liked-songs
# sync. Minting one token with all of them keeps the now-playing widget
# (server/spotify.ts) working and unlocks scripts/sync-spotify.py.
SCOPE = " ".join(
    [
        "user-library-read",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "playlist-modify-public",
    ]
)
AUTH = "https://accounts.spotify.com/authorize"
TOKEN = "https://accounts.spotify.com/api/token"  # noqa: S105

state_token = secrets.token_urlsafe(16)
received: dict[str, str] = {}


class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *_args) -> None:  # silence default logging
        return

    def do_GET(self) -> None:  # noqa: N802
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != "/callback":
            self.send_response(404)
            self.end_headers()
            return
        qs = urllib.parse.parse_qs(parsed.query)
        if qs.get("state", [""])[0] != state_token:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"state mismatch")
            return
        if "code" in qs:
            received["code"] = qs["code"][0]
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"ok, you can close this tab.\n")
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"no code")


def main() -> int:
    client_id = os.environ.get("SPOTIFY_CLIENT_ID")
    client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET")
    if not client_id or not client_secret:
        print("set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET", file=sys.stderr)
        return 2

    params = urllib.parse.urlencode(
        {
            "client_id": client_id,
            "response_type": "code",
            "redirect_uri": REDIRECT,
            "scope": SCOPE,
            "state": state_token,
        }
    )
    url = f"{AUTH}?{params}"
    print("open this in your browser if it does not auto-open:\n")
    print(url, "\n")
    webbrowser.open(url)

    server = http.server.HTTPServer(("127.0.0.1", 8765), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    print("waiting for callback on http://127.0.0.1:8765/callback ...")
    while "code" not in received:
        try:
            threading.Event().wait(0.25)
        except KeyboardInterrupt:
            print("aborted", file=sys.stderr)
            return 1
    server.shutdown()

    basic = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    body = urllib.parse.urlencode(
        {
            "grant_type": "authorization_code",
            "code": received["code"],
            "redirect_uri": REDIRECT,
        }
    ).encode()
    req = urllib.request.Request(
        TOKEN,
        data=body,
        headers={
            "Authorization": f"Basic {basic}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:  # noqa: S310
        data = json.loads(resp.read())

    refresh = data.get("refresh_token")
    if not refresh:
        print(f"no refresh_token in response: {data}", file=sys.stderr)
        return 1

    print("\nrefresh token (paste into /etc/spotify-sync.env):\n")
    print(refresh)
    return 0


if __name__ == "__main__":
    sys.exit(main())
