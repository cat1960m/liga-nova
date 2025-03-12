import React, { ChangeEventHandler, useState } from "react";
import axios from "axios";
import { NullValueField } from "aws-sdk/clients/glue";

export function UploadComponent() {
  const [file, setFile] = useState<File | null>(null);

  const uploadToAWS = async ({
    fileName,
    fileType,
    fileContent,
  }: {
    fileName: string;
    fileType: string;
    fileContent: string | ArrayBuffer | null | undefined;
  }) => {
    const rrr = await axios.post("/api/uploadFile", {
      fileName,
      fileType,
      fileContent,
    });

    return rrr;
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target?.files?.[0]) {
      const ff = event.target?.files?.[0];
      setFile(ff);

      const reader = new FileReader();

      reader.onload = (e) => {
        uploadToAWS({
          fileName: ff.name,
          fileType: ff.type,
          fileContent: e?.target?.result,
        });
      };

      reader.readAsText(event.target?.files?.[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        axios.post("/api/uploadFile", {
          fileName: file.name,
          fileType: file.type,
          file,
        });
      } catch (err) {
        console.log("err", err);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ border: "1px solid magenta" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
