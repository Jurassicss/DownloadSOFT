// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const formData = await req.formData();

//   const os = formData.get("os");
//   const arch = formData.get("arch");
//   const software = formData.get("software");
//   const version = formData.get("version");

//   if (!os || !arch || !software || !version) {
//     return NextResponse.json({ success: false, error: "Missing parameters" });
//   }

//   const uploadDir = path.join(
//     process.cwd(),
//     "public",
//     "downloads",
//     os,
//     arch,
//     software,
//     version.toString()
//   );
//   fs.mkdirSync(uploadDir, { recursive: true });

//   // Множественные файлы
//   const files = formData.getAll("files");

//   try {
//     for (const file of files) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const filePath = path.join(uploadDir, file.name);
//       fs.writeFileSync(filePath, buffer);
//     }

//     return NextResponse.json({ success: true });
//   } catch (e) {
//     return NextResponse.json({ success: false, error: e.message });
//   }
// }


import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();

  const os = formData.get("os");
  const arch = formData.get("arch");
  const software = formData.get("software");
  const version = formData.get("version");

  if (!os || !arch || !software || !version) {
    return NextResponse.json({ success: false, error: "Missing parameters" });
  }

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "downloads",
    os,
    arch,
    software,
    version.toString()
  );
  fs.mkdirSync(uploadDir, { recursive: true });

  const files = formData.getAll("files");

  try {
    for (const file of files) {
      const relativePath = file.name; // сохраняем структуру папок
      const filePath = path.join(uploadDir, relativePath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message });
  }
}



