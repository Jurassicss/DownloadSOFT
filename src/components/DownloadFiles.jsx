

// "use client";

// import { useEffect, useState } from "react";
// import styles from "./DownloadFiles.module.scss";
// import { FaFolder, FaFile } from "react-icons/fa";

// export default function DownloadFiles() {
//   const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });
//   const [selectedOS, setSelectedOS] = useState("");
//   const [selectedArch, setSelectedArch] = useState("");
//   const [selectedSoftware, setSelectedSoftware] = useState("");
//   const [selectedVersion, setSelectedVersion] = useState("");
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     fetch("/api/manifest")
//       .then((res) => res.json())
//       .then(setManifest);
//   }, []);

//   useEffect(() => {
//     if (selectedOS && selectedArch && selectedSoftware && selectedVersion) {
//       fetch(
//         `/api/download?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}`
//       )
//         .then((res) => res.json())
//         .then((data) => setFiles(data.files || []));
//     } else {
//       setFiles([]);
//     }
//   }, [selectedOS, selectedArch, selectedSoftware, selectedVersion]);

//   // Преобразуем список файлов в дерево
//   const buildTree = (filePaths) => {
//     const tree = {};
//     filePaths.forEach((filePath) => {
//       const parts = filePath.split("/");
//       let current = tree;
//       parts.forEach((part, idx) => {
//         if (!current[part]) {
//           current[part] = { __isFile: idx === parts.length - 1, children: {} };
//         }
//         current = current[part].children;
//       });
//     });
//     return tree;
//   };

//   const renderTree = (node, path = "") =>
//     Object.entries(node).map(([key, val]) => {
//       const fullPath = path ? `${path}/${key}` : key;
//       if (val.__isFile) {
//         return (
//           <a
//             key={fullPath}
//             href={`/downloads/${selectedOS}/${selectedArch}/${selectedSoftware}/${selectedVersion}/${fullPath}`}
//             download
//             className={styles.fileLink}
//           >
//             <FaFile /> {key}
//           </a>
//         );
//       } else {
//         return (
//           <div key={fullPath} className={styles.folder}>
//             <span>
//               <FaFolder /> {key}
//             </span>
//             <div className={styles.folderChildren}>
//               {renderTree(val.children, fullPath)}
//             </div>
//           </div>
//         );
//       }
//     });

//   const tree = buildTree(files);

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Download Files</h2>

//       <div className={styles.selectGroup}>
//         <label>OS:</label>
//         <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)}>
//           <option value="">Select OS</option>
//           {manifest.os.map((os) => (
//             <option key={os} value={os}>
//               {os}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Architecture:</label>
//         <select value={selectedArch} onChange={(e) => setSelectedArch(e.target.value)}>
//           <option value="">Select Arch</option>
//           {manifest.arch.map((arch) => (
//             <option key={arch} value={arch}>
//               {arch}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Software:</label>
//         <select
//           value={selectedSoftware}
//           onChange={(e) => setSelectedSoftware(e.target.value)}
//         >
//           <option value="">Select Software</option>
//           {Object.keys(manifest.software)
//             .sort()
//             .map((sw) => (
//               <option key={sw} value={sw}>
//                 {sw}
//               </option>
//             ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Version:</label>
//         <select
//           value={selectedVersion}
//           onChange={(e) => setSelectedVersion(e.target.value)}
//         >
//           <option value="">Select Version</option>
//           {selectedSoftware &&
//             manifest.software[selectedSoftware]
//               .sort((a, b) => a - b)
//               .map((ver) => (
//                 <option key={ver} value={ver}>
//                   {ver}
//                 </option>
//               ))}
//         </select>
//       </div>

//       <div className={styles.filesList}>
//         {files.length === 0 && <p>No files found</p>}
//         {renderTree(tree)}
//       </div>

//       <button
//         className={styles.downloadAllButton}
//         disabled={
//           !selectedOS ||
//           !selectedArch ||
//           !selectedSoftware ||
//           !selectedVersion ||
//           files.length === 0
//         }
//         onClick={() => {
//           const url = `/api/download-all?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}`;
//           window.open(url, "_blank");
//         }}
//       >
//         Download All
//       </button>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import styles from "./DownloadFiles.module.scss";
// import { FaFolder, FaFile } from "react-icons/fa";

// export default function DownloadFiles() {
//   const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });
//   const [selectedOS, setSelectedOS] = useState("");
//   const [selectedArch, setSelectedArch] = useState("");
//   const [selectedSoftware, setSelectedSoftware] = useState("");
//   const [selectedVersion, setSelectedVersion] = useState("");
//   const [items, setItems] = useState([]); // файлы и папки

//   useEffect(() => {
//     fetch("/api/manifest")
//       .then((res) => res.json())
//       .then(setManifest);
//   }, []);

//   useEffect(() => {
//     if (selectedOS && selectedArch && selectedSoftware && selectedVersion) {
//       fetch(
//         `/api/list-files?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}`
//       )
//         .then((res) => res.json())
//         .then((data) => setItems(data.items));
//     } else {
//       setItems([]);
//     }
//   }, [selectedOS, selectedArch, selectedSoftware, selectedVersion]);

//   const handleDownload = (item) => {
//     let url = "";
//     if (item.type === "folder") {
//       url = `/api/download-folder?path=${encodeURIComponent(item.path)}`;
//     } else {
//       url = `/api/download-file?path=${encodeURIComponent(item.path)}`;
//     }
//     window.open(url, "_blank");
//   };

//   const handleDownloadAll = () => {
//     const url = `/api/download-folder?path=${encodeURIComponent(
//       `${selectedOS}/${selectedArch}/${selectedSoftware}/${selectedVersion}`
//     )}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Download Files</h2>

//       {/* Selects */}
//       <div className={styles.selectGroup}>
//         <label>OS:</label>
//         <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)}>
//           <option value="">Select OS</option>
//           {manifest.os.map((os) => (
//             <option key={os} value={os}>{os}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Architecture:</label>
//         <select value={selectedArch} onChange={(e) => setSelectedArch(e.target.value)}>
//           <option value="">Select Arch</option>
//           {manifest.arch.map((arch) => (
//             <option key={arch} value={arch}>{arch}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Software:</label>
//         <select value={selectedSoftware} onChange={(e) => setSelectedSoftware(e.target.value)}>
//           <option value="">Select Software</option>
//           {Object.keys(manifest.software).sort().map((sw) => (
//             <option key={sw} value={sw}>{sw}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Version:</label>
//         <select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
//           <option value="">Select Version</option>
//           {selectedSoftware &&
//             manifest.software[selectedSoftware]
//               .sort((a, b) => a - b)
//               .map((ver) => (
//                 <option key={ver} value={ver}>{ver}</option>
//               ))}
//         </select>
//       </div>

//       {/* Files & Folders */}
//       <div className={styles.itemsList}>
//         {items.length === 0 && <p>No files found</p>}
//         {items.map((item) => (
//           <div
//             key={item.path}
//             className={styles.item}
//             onClick={() => handleDownload(item)}
//           >
//             {item.type === "folder" ? <FaFolder /> : <FaFile />}
//             <span>{item.name}</span>
//           </div>
//         ))}
//       </div>

//       <button
//         className={styles.downloadAllButton}
//         disabled={!selectedOS || !selectedArch || !selectedSoftware || !selectedVersion || items.length === 0}
//         onClick={handleDownloadAll}
//       >
//         Download All
//       </button>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import styles from "./DownloadFiles.module.scss";
// import { FaFolder, FaFile, FaFolderOpen } from "react-icons/fa";

// export default function DownloadFiles() {
//   const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });
//   const [selectedOS, setSelectedOS] = useState("");
//   const [selectedArch, setSelectedArch] = useState("");
//   const [selectedSoftware, setSelectedSoftware] = useState("");
//   const [selectedVersion, setSelectedVersion] = useState("");
//   const [treeData, setTreeData] = useState([]); // файлы и папки как дерево

//   useEffect(() => {
//     fetch("/api/manifest")
//       .then((res) => res.json())
//       .then(setManifest);
//   }, []);

//   useEffect(() => {
//     if (selectedOS && selectedArch && selectedSoftware && selectedVersion) {
//       fetch(
//         `/api/list-files?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}`
//       )
//         .then((res) => res.json())
//         .then((data) => setTreeData(data.items));
//     } else {
//       setTreeData([]);
//     }
//   }, [selectedOS, selectedArch, selectedSoftware, selectedVersion]);

//   const handleDownload = (item) => {
//     let url = "";
//     if (item.type === "folder") {
//       url = `/api/download-folder?path=${encodeURIComponent(item.path)}`;
//     } else {
//       url = `/api/download-file?path=${encodeURIComponent(item.path)}`;
//     }
//     window.open(url, "_blank");
//   };

//   const toggleFolder = (item) => {
//     item.open = !item.open;
//     setTreeData([...treeData]);
//   };

//   // Рекурсивный рендер дерева
//   const renderTree = (items, level = 0) => {
//     return items.map((item) => (
//       <div key={item.path} style={{ paddingLeft: `${level * 20}px` }} className={styles.itemRow}>
//         {item.type === "folder" ? (
//           <span className={styles.folderLabel} onClick={() => toggleFolder(item)}>
//             {item.open ? <FaFolderOpen /> : <FaFolder />} {item.name}
//           </span>
//         ) : (
//           <span className={styles.fileLabel} onClick={() => handleDownload(item)}>
//             <FaFile /> {item.name}
//           </span>
//         )}
//         {item.open && item.children && renderTree(item.children, level + 1)}
//       </div>
//     ));
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Download Files</h2>

//       {/* Selects */}
//       <div className={styles.selectGroup}>
//         <label>OS:</label>
//         <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)}>
//           <option value="">Select OS</option>
//           {manifest.os.map((os) => (
//             <option key={os} value={os}>{os}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Architecture:</label>
//         <select value={selectedArch} onChange={(e) => setSelectedArch(e.target.value)}>
//           <option value="">Select Arch</option>
//           {manifest.arch.map((arch) => (
//             <option key={arch} value={arch}>{arch}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Software:</label>
//         <select value={selectedSoftware} onChange={(e) => setSelectedSoftware(e.target.value)}>
//           <option value="">Select Software</option>
//           {Object.keys(manifest.software).sort().map((sw) => (
//             <option key={sw} value={sw}>{sw}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Version:</label>
//         <select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
//           <option value="">Select Version</option>
//           {selectedSoftware &&
//             manifest.software[selectedSoftware]
//               .sort((a, b) => a - b)
//               .map((ver) => (
//                 <option key={ver} value={ver}>{ver}</option>
//               ))}
//         </select>
//       </div>

//       <div className={styles.itemsList}>
//         {treeData.length === 0 && <p>No files found</p>}
//         {renderTree(treeData)}
//       </div>

//       <button
//         className={styles.downloadAllButton}
//         disabled={!selectedOS || !selectedArch || !selectedSoftware || !selectedVersion || treeData.length === 0}
//         onClick={() => {
//           const url = `/api/download-folder?path=${encodeURIComponent(
//             `${selectedOS}/${selectedArch}/${selectedSoftware}/${selectedVersion}`
//           )}`;
//           window.open(url, "_blank");
//         }}
//       >
//         Download All
//       </button>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "./DownloadFiles.module.scss";
// import { FaFolder, FaFile } from "react-icons/fa";

// export default function DownloadFiles() {
//   const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });
//   const [selectedOS, setSelectedOS] = useState("");
//   const [selectedArch, setSelectedArch] = useState("");
//   const [selectedSoftware, setSelectedSoftware] = useState("");
//   const [selectedVersion, setSelectedVersion] = useState("");
//   const [filesTree, setFilesTree] = useState([]);
//   const [openedFolders, setOpenedFolders] = useState([]);

//   useEffect(() => {
//     fetch("/api/manifest")
//       .then((res) => res.json())
//       .then(setManifest);
//   }, []);

//   useEffect(() => {
//     if (selectedOS && selectedArch && selectedSoftware && selectedVersion) {
//       fetch(
//         `/api/list-files?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}`
//       )
//         .then((res) => res.json())
//         .then((data) => setFilesTree(data.files));
//     } else {
//       setFilesTree([]);
//     }
//   }, [selectedOS, selectedArch, selectedSoftware, selectedVersion]);

//   const toggleFolder = (path) => {
//     setOpenedFolders((prev) =>
//       prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
//     );
//   };

// //   const renderFiles = (items) => {
// //     return items.map((item) => {
// //       if (item.type === "folder") {
// //         return (
// //             <>
// //           <div key={item.path} className={styles.folder}>
// //             <div className={styles.folderHeader}>
// //               <FaFolder /> {item.name}
// //               <button
// //                 className={styles.expandButton}
// //                 onClick={() => toggleFolder(item.path)}
// //               >
// //                 {openedFolders.includes(item.path) ? "Collapse" : "Expand"}
// //               </button>
// //             </div>

// //             {openedFolders.includes(item.path) &&
// //               item.children?.length > 0 && (
// //                 <div className={styles.folderContent}>
// //                   {renderFiles(item.children)}
// //                 </div>
// //               )}
// //           </div>
// //           {/* <button
// //           className={styles.downloadAllButton}
// //           onClick={() =>
// //             window.open(
// //               `/api/download-folder?path=${encodeURIComponent(item.path)}`,
// //               "_blank"
// //             )
// //           }
// //         >
// //           Download All
// //         </button> */}
        
// //         <button
// //   className={styles.downloadAllButton}
// //   onClick={() =>
// //     window.open(
// //       `/api/download-all?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}&folder=${encodeURIComponent(item.path)}`,
// //       "_blank"
// //     )
// //   }
// // >
// //   Download All
// // </button>
// // </>
// //         );
// //       } else {
// //         return (
// //           <a
// //             key={item.path}
// //             href={item.path}
// //             download
// //             className={styles.fileLink}
// //           >
// //             <FaFile /> {item.name}
// //           </a>
// //         );
// //       }
// //     });
// //   };

// const renderFiles = (items) => {
//   return items.map((item) => {
//     if (item.type === "folder") {
//       return (
//         <React.Fragment key={item.path}>
//           <div className={styles.folder}>
//             <div className={styles.folderHeader}>
//               <div>
//                 <FaFolder /> {item.name}
//                 <button
//                   className={styles.expandButton}
//                   onClick={() => toggleFolder(item.path)}
//                 >
//                   {openedFolders.includes(item.path) ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//               {openedFolders.includes(item.path) &&
//               item.children?.length > 0 && (
//                 <div className={styles.folderContent}>
//                   {renderFiles(item.children)}
//                 </div>
//               )}
//               <button
//                 className={styles.downloadAllButton}
//                 onClick={() =>
//                   window.open(
//                     `/api/download-folder?path=${encodeURIComponent(item.path)}`,
//                     "_blank"
//                   )
//                 }
//               >
//                 Download All
//               </button>
//             </div>
            
//           </div>
//         </React.Fragment>
//       );
//     } else {
//       return (
//         <a
//           key={item.path}
//           href={item.path}
//           download
//           className={styles.fileLink}
//         >
//           <FaFile /> {item.name}
//         </a>
//       );
//     }
//   });
// };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Download Files</h2>

//       <div className={styles.selectGroup}>
//         <label>OS:</label>
//         <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)}>
//           <option value="">Select OS</option>
//           {manifest.os.map((os) => (
//             <option key={os} value={os}>{os}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Architecture:</label>
//         <select
//           value={selectedArch}
//           onChange={(e) => setSelectedArch(e.target.value)}
//         >
//           <option value="">Select Arch</option>
//           {manifest.arch.map((arch) => (
//             <option key={arch} value={arch}>{arch}</option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Software:</label>
//         <select
//           value={selectedSoftware}
//           onChange={(e) => setSelectedSoftware(e.target.value)}
//         >
//           <option value="">Select Software</option>
//           {Object.keys(manifest.software)
//             .sort()
//             .map((sw) => (
//               <option key={sw} value={sw}>{sw}</option>
//             ))}
//         </select>
//       </div>

//       <div className={styles.selectGroup}>
//         <label>Version:</label>
//         <select
//           value={selectedVersion}
//           onChange={(e) => setSelectedVersion(e.target.value)}
//         >
//           <option value="">Select Version</option>
//           {selectedSoftware &&
//             manifest.software[selectedSoftware]
//               .sort((a, b) => a - b)
//               .map((ver) => (
//                 <option key={ver} value={ver}>{ver}</option>
//               ))}
//         </select>
//       </div>

//       <div className={styles.filesList}>
//         {filesTree.length === 0 && <p>No files found</p>}
//         {renderFiles(filesTree)}
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import styles from "./DownloadFiles.module.scss";
import { FaFolder, FaFile } from "react-icons/fa";

export default function DownloadFiles() {
  const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedArch, setSelectedArch] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [filesTree, setFilesTree] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);

  useEffect(() => {
    fetch("/api/manifest")
      .then((res) => res.json())
      .then(setManifest);
  }, []);

  useEffect(() => {
    if (selectedOS && selectedArch && selectedSoftware && selectedVersion) {
      fetch(
        `/api/list-files?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}`
      )
        .then((res) => res.json())
        .then((data) => setFilesTree(data.files));
    } else {
      setFilesTree([]);
    }
  }, [selectedOS, selectedArch, selectedSoftware, selectedVersion]);

  const toggleFolder = (path) => {
    setOpenedFolders((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  // const renderFiles = (items) => {
  //   return items.map((item) => {
  //     if (item.type === "folder") {
  //       return (
  //         <>
  //         <React.Fragment key={item.path}>
  //           <div className={styles.folder}>
  //             <div className={styles.folderHeader}>
  //               <div>
  //               <FaFolder /> {item.name}
  //               <button
  //                 className={styles.expandButton}
  //                 onClick={() => toggleFolder(item.path)}
  //               >
  //                 {openedFolders.includes(item.path) ? "Collapse" : "Expand"}
  //               </button>
  //               </div>
                
  //               <button
  //                 className={styles.downloadAllButton}
  //                 onClick={() =>
  //                   window.open(
  //                     `/api/download-folder?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}&folder=${encodeURIComponent(
  //                       item.path
  //                     )}`,
  //                     "_blank"
  //                   )
  //                 }
  //               >
  //                 Download All
  //               </button>
  //             </div>

              
  //           </div>
  //         </React.Fragment>
          
  //       </>
  //       );
  //     } else {
  //       return (
  //         <a
  //           key={item.path}
  //           href={item.path}
  //           download
  //           className={styles.fileLink}
  //         >
  //           <FaFile /> {item.name}
  //         </a>
  //       );
  //     }
  //   });
  // };
  const renderFiles = (items) => {
    return items.map((item) => {
      if (item.type === "folder") {
        return (
          <div key={item.path} className={styles.folder}>
            <div className={styles.folderHeader}>
              <FaFolder /> {item.name}
              <button
                className={styles.expandButton}
                onClick={() => toggleFolder(item.path)}
              >
                {openedFolders.includes(item.path) ? "Collapse" : "Expand"}
              </button>
            </div>
  
            {openedFolders.includes(item.path) &&
              item.children?.length > 0 && (
                <div className={styles.folderContent}>
                  {renderFiles(item.children)}
                </div>
              )}
          </div>
        );
      } else {
        return (
          <a
            key={item.path}
            href={item.path}
            download
            className={styles.fileLink}
          >
            <FaFile /> {item.name}
          </a>
        );
      }
    });
  };
  
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>
      <h2 >Download</h2>
      <h4>SOFT</h4>
      </div>
      

      <div className={styles.selectGroup}>
        <label>OS:</label>
        <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)}>
          <option value="">Select OS</option>
          {manifest.os.map((os) => (
            <option key={os} value={os}>{os}</option>
          ))}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label>Architecture:</label>
        <select
          value={selectedArch}
          onChange={(e) => setSelectedArch(e.target.value)}
        >
          <option value="">Select Arch</option>
          {manifest.arch.map((arch) => (
            <option key={arch} value={arch}>{arch}</option>
          ))}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label>Software:</label>
        <select
          value={selectedSoftware}
          onChange={(e) => setSelectedSoftware(e.target.value)}
        >
          <option value="">Select Software</option>
          {Object.keys(manifest.software)
            .sort()
            .map((sw) => (
              <option key={sw} value={sw}>{sw}</option>
            ))}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label>Version:</label>
        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
        >
          <option value="">Select Version</option>
          {selectedSoftware &&
            manifest.software[selectedSoftware]
              .sort((a, b) => a - b)
              .map((ver) => (
                <option key={ver} value={ver}>{ver}</option>
              ))}
        </select>
      </div>
      

      <div className={styles.filesList}>
        {filesTree.length === 0 && <p>No soft found</p>}
        

         {/* Кнопка Download All для всех файлов верхнего уровня */}
         <div className={styles.folders}>
         {renderFiles(filesTree)}
         </div>
  {filesTree.length > 0 && (
    <button
      className={styles.downloadAllButton}
      onClick={() =>
        window.open(
          `/api/download-all?os=${selectedOS}&arch=${selectedArch}&software=${selectedSoftware}&version=${selectedVersion}`,
          "_blank"
        )
      }
    >
      Download All
    </button>
  )}
        
      </div>
    </div>
  );
}
