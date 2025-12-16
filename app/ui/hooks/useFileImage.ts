import { ChangeEventHandler, useState } from "react";
import axios from "axios";

export const useFileImage = ({
  setIsSaveDisabled,
  s3Key,
}: {
  setIsSaveDisabled?: (value: boolean) => void;
  s3Key?: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string >("");

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      setIsSaveDisabled?.(false);
      const url = URL.createObjectURL(file);
      setPreviewImageUrl(url); // store in state
    }
  };

  const uploadFile = async () => {
    if (!file) return undefined;

    const response = await axios.post("/api/uploadFile", {
      fileName: file.name,
      fileType: file.type,
      file,
      s3Key,   //: updatedValue,
    });

    const signedUrl = response.data.signedUrl;

    await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    const path = signedUrl.split("?")[0];

    //onUploaded?.(path);
    setFile(null);
    return path;
  };

  const clearPreviewImage = () => {
    setPreviewImageUrl("");
    setFile(null);
  }

  return {previewImageUrl, onFileChange, uploadFile, clearPreviewImage}
};
