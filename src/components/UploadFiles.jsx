// "use client";

// import { useEffect, useState } from "react";
// import styles from "./UploadFiles.module.scss";

// export default function UploadFiles() {
//   const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });

//   const [selectedOS, setSelectedOS] = useState("");
//   const [selectedArch, setSelectedArch] = useState("");
//   const [selectedSoftware, setSelectedSoftware] = useState("");
//   const [selectedVersion, setSelectedVersion] = useState("");
//   const [files, setFiles] = useState([]);

//   // Загружаем манифест
//   useEffect(() => {
//     fetch("/api/manifest")
//       .then((res) => res.json())
//       .then((data) => setManifest(data));
//   }, []);

//   // Обновляем выбранную версию при смене ПО
//   useEffect(() => {
//     setSelectedVersion("");
//   }, [selectedSoftware]);

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const handleUpload = async () => {
//     if (!selectedOS || !selectedArch || !selectedSoftware || !selectedVersion) {
//       return alert("Выберите все параметры из селектов!");
//     }

//     if (files.length === 0) return alert("Выберите файлы для загрузки");

//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file));
//     formData.append("os", selectedOS);
//     formData.append("arch", selectedArch);
//     formData.append("software", selectedSoftware);
//     formData.append("version", selectedVersion);

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     if (data.success) {
//       alert("Файлы успешно загружены!");
//       setFiles([]);
//     } else {
//       alert("Ошибка при загрузке");
//     }
//   };

//   return (
//   <div className={styles.container}>
//     <h2 className={styles.title}>Upload Files</h2>

//     <div className={styles.selectGroup}>
//       <label className={styles.label}>OS:</label>
//       <select
//         className={styles.select}
//         value={selectedOS}
//         onChange={(e) => setSelectedOS(e.target.value)}
//       >
//         <option value="">Select OS</option>
//         {manifest.os.map((os) => (
//           <option key={os} value={os}>{os}</option>
//         ))}
//       </select>
//     </div>

//     <div className={styles.selectGroup}>
//       <label className={styles.label}>Architecture:</label>
//       <select
//         className={styles.select}
//         value={selectedArch}
//         onChange={(e) => setSelectedArch(e.target.value)}
//       >
//         <option value="">Select Arch</option>
//         {manifest.arch.map((arch) => (
//           <option key={arch} value={arch}>{arch}</option>
//         ))}
//       </select>
//     </div>

//     <div className={styles.selectGroup}>
//       <label className={styles.label}>Software:</label>
//       <select
//         className={styles.select}
//         value={selectedSoftware}
//         onChange={(e) => setSelectedSoftware(e.target.value)}
//       >
//         <option value="">Select Software</option>
//         {Object.keys(manifest.software)
//           .sort()
//           .map((sw) => (
//             <option key={sw} value={sw}>{sw}</option>
//           ))}
//       </select>
//     </div>

//     <div className={styles.selectGroup}>
//       <label className={styles.label}>Version:</label>
//       <select
//         className={styles.select}
//         value={selectedVersion}
//         onChange={(e) => setSelectedVersion(e.target.value)}
//       >
//         <option value="">Select Version</option>
//         {selectedSoftware &&
//           manifest.software[selectedSoftware]
//             .sort((a, b) => a - b)
//             .map((ver) => (
//               <option key={ver} value={ver}>{ver}</option>
//             ))}
//       </select>
//     </div>

//     <div className={styles.inputGroup}>
//       <label className={styles.label}>Files:</label>
//       <input
//         className={styles.fileInput}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//       />
//     </div>

//     <button
//       className={styles.uploadButton}
//       onClick={handleUpload}
//       disabled={
//         !selectedOS ||
//         !selectedArch ||
//         !selectedSoftware ||
//         !selectedVersion ||
//         files.length === 0
//       }
//     >
//       Upload
//     </button>
//   </div>
// );

// }




"use client";

import { useEffect, useState } from "react";
import styles from "./UploadFiles.module.scss";

export default function UploadFiles() {
  const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });

  const [selectedOS, setSelectedOS] = useState("");
  const [selectedArch, setSelectedArch] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [files, setFiles] = useState([]);

  // Загружаем манифест
  useEffect(() => {
    fetch("/api/manifest")
      .then((res) => res.json())
      .then((data) => setManifest(data));
  }, []);

  // Обновляем выбранную версию при смене ПО
  useEffect(() => {
    setSelectedVersion("");
  }, [selectedSoftware]);

  // Сохраняем файлы с относительными путями
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map(file => ({
      file,
      relativePath: file.webkitRelativePath || file.name
    }));
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (!selectedOS || !selectedArch || !selectedSoftware || !selectedVersion) {
      return alert("Выберите все параметры из селектов!");
    }
    if (files.length === 0) return alert("Выберите файлы для загрузки");

    const formData = new FormData();
    files.forEach(f => {
      formData.append("files", f.file, f.relativePath);
    });
    formData.append("os", selectedOS);
    formData.append("arch", selectedArch);
    formData.append("software", selectedSoftware);
    formData.append("version", selectedVersion);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Файлы успешно загружены!");
      setFiles([]);
    } else {
      alert("Ошибка при загрузке: " + data.error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Soft</h2>

      <div className={styles.selectGroup}>
        <label className={styles.label}>OS:</label>
        <select
          className={styles.select}
          value={selectedOS}
          onChange={(e) => setSelectedOS(e.target.value)}
        >
          <option value="">Select OS</option>
          {manifest.os.map(os => <option key={os} value={os}>{os}</option>)}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Architecture:</label>
        <select
          className={styles.select}
          value={selectedArch}
          onChange={(e) => setSelectedArch(e.target.value)}
        >
          <option value="">Select Arch</option>
          {manifest.arch.map(arch => <option key={arch} value={arch}>{arch}</option>)}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Software:</label>
        <select
          className={styles.select}
          value={selectedSoftware}
          onChange={(e) => setSelectedSoftware(e.target.value)}
        >
          <option value="">Select Software</option>
          {Object.keys(manifest.software).sort().map(sw => (
            <option key={sw} value={sw}>{sw}</option>
          ))}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Version:</label>
        <select
          className={styles.select}
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
        >
          <option value="">Select Version</option>
          {selectedSoftware &&
            manifest.software[selectedSoftware]
              .sort((a, b) => a - b)
              .map(ver => <option key={ver} value={ver}>{ver}</option>)}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Files / Folders:</label>
        <input
          className={styles.fileInput}
          type="file"
          multiple
          webkitdirectory="true"
          directory="true"
          onChange={handleFileChange}
        />
      </div>

      <button
        className={styles.uploadButton}
        onClick={handleUpload}
        disabled={!selectedOS || !selectedArch || !selectedSoftware || !selectedVersion || files.length === 0}
      >
        Upload
      </button>
    </div>
  );
}
