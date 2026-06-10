import { getSpotifyNowPlaying } from "@/server/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	const track = await getSpotifyNowPlaying();
	return NextResponse.json(track);
}
