import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const manifestPath = path.join(process.cwd(), "data", "manifest.json");

function ensureDataFile() {
  const dataDir = path.dirname(manifestPath);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  // Если файла нет или пустой — создаём базовый
  if (!fs.existsSync(manifestPath) || fs.readFileSync(manifestPath, "utf8").trim() === "") {
    fs.writeFileSync(
      manifestPath,
      JSON.stringify({ os: [], arch: [], software: {} }, null, 2)
    );
  }
}

export async function GET() {
  ensureDataFile();
  const data = fs.readFileSync(manifestPath, "utf8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req) {
  ensureDataFile();
  const body = await req.json();

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (e) {
    // Если файл битый — создаём заново
    manifest = { os: [], arch: [], software: {} };
  }

  if (body.os) {
    if (!manifest.os.includes(body.os)) manifest.os.push(body.os);
    manifest.os.sort();
  }

  if (body.arch) {
    if (!manifest.arch.includes(body.arch)) manifest.arch.push(body.arch);
    manifest.arch.sort();
  }

  if (body.software && body.version === undefined) {
    if (!manifest.software[body.software]) manifest.software[body.software] = [];
  }

  if (body.software && body.version !== undefined) {
    const v = parseFloat(body.version);
    if (!manifest.software[body.software]) manifest.software[body.software] = [];
    if (!isNaN(v) && !manifest.software[body.software].includes(v)) {
      manifest.software[body.software].push(v);
      manifest.software[body.software].sort((a, b) => a - b);
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  return NextResponse.json({ success: true, manifest });
}
