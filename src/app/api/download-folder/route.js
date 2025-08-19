import fs from "fs";
import path from "path";
import archiver from "archiver";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const os = searchParams.get("os");
  const arch = searchParams.get("arch");
  const software = searchParams.get("software");
  const version = searchParams.get("version");

  if (!os || !arch || !software || !version) {
    return new Response("Missing parameters", { status: 400 });
  }

  const dirPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    os,
    arch,
    software,
    version.toString()
  );

  if (!fs.existsSync(dirPath)) {
    return new Response("Folder not found", { status: 404 });
  }

  const archive = archiver("zip", { zlib: { level: 9 } });
  const zipFileName = `${software}_${version}.zip`;

  const stream = new Response(archive, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=${zipFileName}`,
    },
  });

  // В архив добавляем всю папку целиком с именем папки
  archive.directory(dirPath, path.basename(dirPath));
  archive.finalize();

  return stream;
}
