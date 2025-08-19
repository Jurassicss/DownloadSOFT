"use client";

import { useState, useEffect } from "react";
import styles from "./ManifestEditor.module.scss";

export default function ManifestEditor() {
  const [manifest, setManifest] = useState({ os: [], arch: [], software: {} });

  const [osInput, setOsInput] = useState("");
  const [archInput, setArchInput] = useState("");
  const [softwareInput, setSoftwareInput] = useState("");
  const [versionInput, setVersionInput] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");

  useEffect(() => {
    refreshManifest();
  }, []);

  const refreshManifest = async () => {
    const res = await fetch("/api/manifest");
    const data = await res.json();
    setManifest(data);
  };




  const addOS = async () => {
  if (!osInput) return;
  try {
    const res = await fetch("/api/manifest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ os: osInput }),
    });
    const data = await res.json();
    if (data.success) {
      setManifest(data.manifest);
      setOsInput("");
      alert("OS успешно добавлена!");
    } else {
      alert("Ошибка при добавлении OS: " + (data.error || "Unknown error"));
    }
  } catch (e) {
    alert("Ошибка при добавлении OS: " + e.message);
  }
};

const addArch = async () => {
  if (!archInput) return;
  try {
    const res = await fetch("/api/manifest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arch: archInput }),
    });
    const data = await res.json();
    if (data.success) {
      setManifest(data.manifest);
      setArchInput("");
      alert("Architecture успешно добавлена!");
    } else {
      alert("Ошибка при добавлении Architecture: " + (data.error || "Unknown error"));
    }
  } catch (e) {
    alert("Ошибка при добавлении Architecture: " + e.message);
  }
};

const addSoftware = async () => {
  if (!softwareInput) return;
  try {
    const res = await fetch("/api/manifest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ software: softwareInput }),
    });
    const data = await res.json();
    if (data.success) {
      setManifest(data.manifest);
      setSoftwareInput("");
      alert("Software успешно добавлено!");
    } else {
      alert("Ошибка при добавлении Software: " + (data.error || "Unknown error"));
    }
  } catch (e) {
    alert("Ошибка при добавлении Software: " + e.message);
  }
};

const addVersion = async () => {
  if (!selectedSoftware || !versionInput) return;
  const v = parseFloat(versionInput);
  if (isNaN(v)) return alert("Version должен быть числом (float)");

  try {
    const res = await fetch("/api/manifest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ software: selectedSoftware, version: v }),
    });
    const data = await res.json();
    if (data.success) {
      setManifest(data.manifest);
      setVersionInput("");
      setSelectedSoftware("");
      alert("Version успешно добавлена!");
    } else {
      alert("Ошибка при добавлении Version: " + (data.error || "Unknown error"));
    }
  } catch (e) {
    alert("Ошибка при добавлении Version: " + e.message);
  }
};


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manifest Editor</h2>

      {/* OS */}
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder="New OS"
          value={osInput}
          onChange={(e) => setOsInput(e.target.value)}
        />
        <button className={styles.button} onClick={addOS}>Add OS</button>
      </div>

      {/* Architecture */}
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder="New Architecture"
          value={archInput}
          onChange={(e) => setArchInput(e.target.value)}
        />
        <button className={styles.button} onClick={addArch}>Add Architecture</button>
      </div>

      {/* Software */}
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder="New Software"
          value={softwareInput}
          onChange={(e) => setSoftwareInput(e.target.value)}
        />
        <button className={styles.button} onClick={addSoftware}>Add Software</button>
      </div>

      {/* Version */}
      <div className={styles.inputGroup}>
        <select
          className={styles.select}
          value={selectedSoftware}
          onChange={(e) => setSelectedSoftware(e.target.value)}
        >
          <option value="">Select software</option>
          {Object.keys(manifest.software)
            .sort()
            .map((sw) => (
              <option key={sw} value={sw}>{sw}</option>
            ))}
        </select>
        <input
          className={styles.input}
          placeholder="Version (float)"
          value={versionInput}
          onChange={(e) => setVersionInput(e.target.value)}
        />
        <button className={styles.button} onClick={addVersion}>Add Version</button>
      </div>

      <h3>Current Manifest</h3>
      <pre className={styles.current}>{JSON.stringify(manifest, null, 2)}</pre>
    </div>
  );
}
