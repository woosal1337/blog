import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const size = 128;
const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
	let value = index;
	for (let bit = 0; bit < 8; bit++) {
		value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
	}
	return value >>> 0;
});

function chunk(type: string, data: Buffer): Buffer {
	const body = Buffer.concat([Buffer.from(type), data]);
	let crc = 0xffffffff;
	for (let index = 0; index < body.length; index++) {
		crc = crcTable[(crc ^ body[index]) & 255] ^ (crc >>> 8);
	}
	const result = Buffer.alloc(data.length + 12);
	result.writeUInt32BE(data.length, 0);
	body.copy(result, 4);
	result.writeUInt32BE((crc ^ 0xffffffff) >>> 0, result.length - 4);
	return result;
}

const header = Buffer.alloc(13);
header.writeUInt32BE(size, 0);
header.writeUInt32BE(size, 4);
header[8] = 8;
header[9] = 6;
const pixels = Buffer.alloc(size * (size * 4 + 1));
let seed = 0x5eed1234;
for (let y = 0; y < size; y++) {
	for (let x = 0; x < size; x++) {
		seed ^= seed << 13;
		seed ^= seed >>> 17;
		seed ^= seed << 5;
		const offset = y * (size * 4 + 1) + x * 4 + 1;
		pixels[offset] = 255;
		pixels[offset + 1] = 255;
		pixels[offset + 2] = 255;
		pixels[offset + 3] = 64 + (seed >>> 25);
	}
}

const png = Buffer.concat([
	Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
	chunk("IHDR", header),
	chunk("IDAT", deflateSync(pixels, { level: 9 })),
	chunk("IEND", Buffer.alloc(0)),
]);
writeFileSync(new URL("../public/grain.png", import.meta.url), png);
console.log(`Grain texture: ${size} × ${size}, ${png.length} bytes.`);
