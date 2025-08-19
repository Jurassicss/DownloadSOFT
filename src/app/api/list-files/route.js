// import fs from "fs";
// import path from "path";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const { os, arch, software, version } = Object.fromEntries(searchParams);

//   if (!os || !arch || !software || !version) {
//     return new Response(JSON.stringify({ items: [] }), { status: 400 });
//   }

//   const dir = path.join(process.cwd(), "public", "downloads", os, arch, software, version);
//   if (!fs.existsSync(dir)) return new Response(JSON.stringify({ items: [] }));

//   const files = fs.readdirSync(dir).map((name) => {
//     const fullPath = path.join(dir, name);
//     const isFolder = fs.statSync(fullPath).isDirectory();
//     return {
//       name,
//       type: isFolder ? "folder" : "file",
//       path: `${os}/${arch}/${software}/${version}/${name}`,
//     };
//   });

//   return new Response(JSON.stringify({ items: files }));
// }


import fs from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const os = searchParams.get("os");
  const arch = searchParams.get("arch");
  const software = searchParams.get("software");
  const version = searchParams.get("version");

  if (!os || !arch || !software || !version) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });
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
    return new Response(JSON.stringify({ files: [] }), { status: 200 });
  }

  const buildTree = (currentPath, relativePath = "") => {
    const items = fs.readdirSync(currentPath);

    return items.map((itemName) => {
      const fullPath = path.join(currentPath, itemName);
      const relPath = path.join(relativePath, itemName);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        return {
          type: "folder",
          name: itemName,
          path: relPath.replaceAll("\\", "/"), // для Windows
          children: buildTree(fullPath, relPath),
        };
      } else {
        return {
          type: "file",
          name: itemName,
          path: "/" + relPath.replaceAll("\\", "/"), // путь для скачивания
        };
      }
    });
  };

  const tree = buildTree(dirPath);

  return new Response(JSON.stringify({ files: tree }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

