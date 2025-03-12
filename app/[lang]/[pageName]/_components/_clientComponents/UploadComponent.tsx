import React, { useState } from "react";
import axios from "axios";
import { StaticTexts } from "@/app/dictionaries/definitions";

export function UploadComponent({
  onUploaded,
  isUpdate,
  staticTexts,
}: {
  onUploaded?: (value: string) => void;
  isUpdate?: boolean;
  staticTexts: StaticTexts;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;

    const response = await axios.post("/api/uploadFile", {
      fileName: file.name,
      fileType: file.type,
      file,
    });

    const signedUrl = response.data.signedUrl;

    await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    const path = signedUrl.split("?")[0];

    setUploadUrl(path); // Remove the query string to get the public URL
    onUploaded?.(path);
  };

  const buttonText = isUpdate ? staticTexts.updateFile : staticTexts.uploadFile;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>{buttonText}</button>
      {/*  {uploadUrl && (
        <p>
          File uploaded! Access it <a href={uploadUrl}>here</a>.
        </p>
      )} */}
    </div>
  );
}
