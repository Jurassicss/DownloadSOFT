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

//   // Создаем архив
//   const archive = archiver("zip", { zlib: { level: 9 } });

//   const zipFileName = `${software}_${version}.zip`;

//   // Читаем файлы из папки
//   const files = fs.readdirSync(dirPath).filter((f) =>
//     fs.statSync(path.join(dirPath, f)).isFile()
//   );

//   return new Response(archiveData(files, dirPath, archive, zipFileName), {
//     headers: {
//       "Content-Type": "application/zip",
//       "Content-Disposition": `attachment; filename=${zipFileName}`,
//     },
//   });
// }

// function archiveData(files, dirPath, archive, zipFileName) {
//   // Добавляем файлы в архив
//   files.forEach((file) => {
//     archive.file(path.join(dirPath, file), { name: file });
//   });

//   archive.finalize();

//   // Возвращаем поток архива
//   return archive;
// }


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



// src/app/api/download-all/route.js
import fs from "fs";
import path from "path";
import archiver from "archiver";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const os = searchParams.get("os");
  const arch = searchParams.get("arch");
  const software = searchParams.get("software");
  const version = searchParams.get("version");
  const folder = searchParams.get("folder"); // новый параметр

  if (!os || !arch || !software || !version) {
    return new Response("Missing parameters", { status: 400 });
  }

  const baseDir = path.join(
    process.cwd(),
    "public",
    "downloads",
    os,
    arch,
    software,
    version.toString()
  );

  let dirPath = baseDir;
  let zipFileName = `${software}_${version}.zip`;

  if (folder) {
    // архивируем только выбранную папку
    dirPath = path.join(baseDir, folder);
    zipFileName = `${folder}.zip`;
    if (!fs.existsSync(dirPath)) {
      return new Response("Folder not found", { status: 404 });
    }
  } else if (!fs.existsSync(baseDir)) {
    return new Response("No files found", { status: 404 });
  }

  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Response(archiveStream(dirPath, archive), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=${zipFileName}`,
    },
  });
}

function archiveStream(dirPath, archive) {
  // добавляем всю папку рекурсивно
  archive.directory(dirPath, false);
  archive.finalize();
  return archive;
}
