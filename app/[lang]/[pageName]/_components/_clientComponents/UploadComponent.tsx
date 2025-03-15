import React, { useState } from "react";
import axios from "axios";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { CommonButton } from "./CommonButton";

export function UploadComponent({
  onUploaded,
  s3Key,
  staticTexts,
}: {
  onUploaded?: (value: string) => void;
  s3Key?: string;
  staticTexts: StaticTexts;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadState, setUploadState] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    setUploadState("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploadState("Uploading...");

    const response = await axios.post("/api/uploadFile", {
      fileName: file.name,
      fileType: file.type,
      file,
      s3Key,
    });

    const signedUrl = response.data.signedUrl;

    const result = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    const path = signedUrl.split("?")[0];

    setUploadUrl(path); // Remove the query string to get the public URL
    setUploadState("Uploaded");
    onUploaded?.(path);
  };

  const buttonText = s3Key ? staticTexts.updateFile : staticTexts.uploadFile;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          style={{ wordWrap: "break-word", overflow: "hidden" }}
        />
        <div>{uploadState}</div>
      </div>
      <CommonButton onClick={handleUpload} text={buttonText ?? "N/A"} />
    </>
  );
}
