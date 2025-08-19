// import fs from "fs";
// import path from "path";
// import archiver from "archiver";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);

//   const os = searchParams.get("os");
//   const arch = searchParams.get("arch");
//   const software = searchParams.get("software");
//   const version = searchParams.get("version");

//   if (!os || !arch || !software || !version) {
//     return new Response("Missing parameters", { status: 400 });
//   }

//   const dirPath = path.join(
//     process.cwd(),
//     "public",
//     "downloads",
//     os,
//     arch,
//     software,
//     version.toString()
//   );

//   if (!fs.existsSync(dirPath)) {
//     return new Response("No files found", { status: 404 });
//   }

//   const archive = archiver("zip", { zlib: { level: 9 } });
//   const zipFileName = `${software}_${version}.zip`;

//   // Создаем поток ответа
//   const stream = new Response(archive, {
//     headers: {
//       "Content-Type": "application/zip",
//       "Content-Disposition": `attachment; filename=${zipFileName}`,
//     },
//   });

//   // Рекурсивно добавляем все файлы и папки
//   archive.directory(dirPath, false);

//   archive.finalize();

//   return stream;
// }



import fs from "fs";
import path from "path";

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      results.push(relativePath);
    }
  });
  return results;
}

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
    return new Response("No files found", { status: 404 });
  }

  const files = getAllFiles(dirPath);
  return new Response(JSON.stringify({ files }), {
    headers: { "Content-Type": "application/json" },
  });
}
