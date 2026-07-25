#!/bin/sh
# Dev server reachable from other devices on the tailnet (phone, iPad).
#
# Binds Next to this machine's Tailscale IP only — not 0.0.0.0 — so the server
# is not exposed to whatever Wi-Fi you happen to be on. Nothing here is public:
# reaching it still requires being logged into the same tailnet.
#
# Usage:  bun run dev:tailnet          (port 3000)
#         PORT=4000 bun run dev:tailnet
#
# Note: this does NOT listen on localhost. Use the printed URL on this machine
# too, or run plain `bun dev` for a localhost-only server.

set -eu

PORT="${PORT:-3000}"

# Own build directory: a `bun run build` in another terminal would otherwise
# replace the chunks this server is serving, and the page goes unstyled on the
# phone until it is restarted.
export NEXT_DIST_DIR="${NEXT_DIST_DIR:-.next-dev}"

if command -v tailscale >/dev/null 2>&1; then
	TS=tailscale
elif [ -x /Applications/Tailscale.app/Contents/MacOS/Tailscale ]; then
	TS=/Applications/Tailscale.app/Contents/MacOS/Tailscale
else
	echo "tailscale not found — install it or start the Tailscale app" >&2
	exit 1
fi

TS_IP="$("$TS" ip -4 2>/dev/null | head -1)"
if [ -z "$TS_IP" ]; then
	echo "no Tailscale IPv4 address — is Tailscale connected?" >&2
	exit 1
fi

TS_NAME="$("$TS" status --json 2>/dev/null |
	sed -n 's/.*"DNSName"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)"
TS_NAME="${TS_NAME%.}"

echo ""
echo "  dev server on the tailnet:"
[ -n "$TS_NAME" ] && echo "    http://${TS_NAME}:${PORT}"
echo "    http://${TS_IP}:${PORT}"
echo ""
echo "  open it on a device signed into the same tailnet."
echo ""

exec bun x next dev -H "$TS_IP" -p "$PORT"
