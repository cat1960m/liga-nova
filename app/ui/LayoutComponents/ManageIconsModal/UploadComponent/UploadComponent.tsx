"use client";

import React, { useState } from "react";
import axios from "axios";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";

import styles from "./uplosdComponent.module.css";

export function UploadComponent({
  onUploaded,
  s3Key,
  staticTexts,
  maxWidth,
}: {
  onUploaded?: (value: string) => void;
  s3Key?: string;
  staticTexts?: StaticTexts;
  maxWidth?: string;
}) {
  const [file, setFile] = useState<File | null>(null);
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

    setUploadState("Uploaded");
    onUploaded?.(path);
    setFile(null);
  };

  const buttonText = s3Key ? staticTexts?.updateFile : staticTexts?.uploadFile;

  return (
    <>
      <div className={styles.input_container}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            maxWidth,
          }}
        />

        <div>{uploadState}</div>
      </div>
      <CommonButton
        onClick={handleUpload}
        text={buttonText ?? "Load file"}
        isDisabled={!file}
      />
    </>
  );
}
