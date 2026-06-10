#!/usr/bin/env bash
# Commit and push data/music-library.json if it changed. No-op otherwise.
# Invoked by spotify-sync.service as ExecStartPost.

set -euo pipefail

cd /srv/blog

if git diff --quiet -- data/music-library.json; then
    echo "no changes to music-library.json"
    exit 0
fi

git config user.email "sync@chele.bi"
git config user.name  "spotify-sync"

total_songs=$(python3 -c "import json,sys; d=json.load(open('data/music-library.json')); print(d['totalSongs'])")
total_artists=$(python3 -c "import json,sys; d=json.load(open('data/music-library.json')); print(d['totalArtists'])")

git add data/music-library.json
git commit -m "music: weekly spotify sync (${total_artists} artists, ${total_songs} tracks)"
git push origin main
echo "pushed."
