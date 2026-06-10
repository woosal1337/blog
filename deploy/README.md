# Spotify sync (VDS deployment)

Weekly sync of Spotify Liked Songs into `data/music-library.json`. Runs as a systemd timer on the VDS, commits and pushes to `main`, Vercel redeploys.

## Files

- `scripts/sync-spotify.py` — fetches liked tracks, writes `data/music-library.json`.
- `scripts/spotify-bootstrap.py` — local one-shot OAuth flow to mint the refresh token.
- `deploy/spotify-sync.service` — systemd oneshot unit.
- `deploy/spotify-sync.timer` — weekly timer (Mon 06:00, persistent).
- `deploy/commit-and-push.sh` — commits the JSON if it changed and pushes.

## One-time setup

### 1. Spotify app

1. https://developer.spotify.com/dashboard → create app.
2. Add redirect URI: `http://127.0.0.1:8765/callback`.
3. Note the client id and secret.

### 2. Mint the refresh token (run locally on your laptop)

```bash
export SPOTIFY_CLIENT_ID=...
export SPOTIFY_CLIENT_SECRET=...
python3 scripts/spotify-bootstrap.py
```

Approve in the browser. The script prints a refresh token to stdout.

### 3. VDS install

```bash
# on the VDS

# clone the blog repo with a deploy key that has write access
ssh-keygen -t ed25519 -f /root/.ssh/blog_deploy -N ""
cat /root/.ssh/blog_deploy.pub
# add this to github.com/<user>/blog → settings → deploy keys (allow write)

# in ~/.ssh/config:
#   Host github-blog
#     HostName github.com
#     User git
#     IdentityFile /root/.ssh/blog_deploy
#     IdentitiesOnly yes

git clone git@github-blog:<user>/blog.git /srv/blog

# env file
cat > /etc/spotify-sync.env <<EOF
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
BLOG_REPO=/srv/blog
EOF
chmod 600 /etc/spotify-sync.env

# log file
touch /var/log/spotify-sync.log
chmod 640 /var/log/spotify-sync.log

# install units
cp /srv/blog/deploy/spotify-sync.service /etc/systemd/system/
cp /srv/blog/deploy/spotify-sync.timer   /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now spotify-sync.timer

# test run
systemctl start spotify-sync.service
journalctl -u spotify-sync.service -n 50 --no-pager
```

## Checking status

```bash
# next scheduled run
systemctl list-timers spotify-sync.timer

# last run output
tail -n 100 /var/log/spotify-sync.log

# force a run now
systemctl start spotify-sync.service
```

## Schedule

- `OnCalendar=Mon 06:00:00` (UTC by default; set `Environment=TZ=Europe/Istanbul` in the service if you want local time).
- `Persistent=true` — if the VDS was off at trigger time, the run fires on next boot.
- `RandomizedDelaySec=300` — jitters up to 5 minutes to avoid thundering herd on Spotify.

## Schema

`data/music-library.json`:

```json
{
  "generatedAt": "2026-05-13T06:00:00Z",
  "totalArtists": 84,
  "totalSongs": 1423,
  "source": "spotify:liked",
  "library": [
    {
      "artist": "drake",
      "artistId": "3TVXtAsR1Inumwj472S9r4",
      "artistImage": "https://i.scdn.co/image/...",
      "songs": [
        {
          "title": "rich flex",
          "artist": "drake, 21 savage",
          "album": "her loss",
          "duration": "3:59",
          "cover": "https://i.scdn.co/image/...",
          "spotifyId": "1bDbXMyjaUIooNwFE9wn0N",
          "spotifyUrl": "https://open.spotify.com/track/...",
          "previewUrl": "https://p.scdn.co/mp3-preview/...",
          "addedAt": "2026-05-01T12:34:56Z",
          "sources": ["spotify"]
        }
      ]
    }
  ]
}
```
