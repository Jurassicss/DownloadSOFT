import fs from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("path");
  if (!filePath) return new Response("Missing path", { status: 400 });

  const fullPath = path.join(process.cwd(), "public", filePath);
  if (!fs.existsSync(fullPath)) return new Response("File not found", { status: 404 });

  const fileStream = fs.createReadStream(fullPath);
  return new Response(fileStream, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${path.basename(fullPath)}`,
    },
  });
}
