"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

export type Props = {
  text: string;
  onChange: (value: string) => void;
};

const QuillEditor = ({ text, onChange }: Props) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null); // Reference for the Quill instance
  const [data, setData] = useState<string>(text);

  useEffect(() => {
    if (!editorRef?.current) {
      return;
    }

    if (!quillInstanceRef.current) {
      const quill = new Quill(editorRef?.current, {
        theme: "snow", // 'snow' is a clean and simple theme
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      quillInstanceRef.current = quill;
    }

    const quill = quillInstanceRef.current;
    quill.on("text-change", () => {
      setData(quill.root.innerHTML);
    });
    quill.clipboard.dangerouslyPasteHTML(text);

    return () => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current.off("text-change"); // Clean up the listener
      }
    };
  }, []);

  useEffect(() => {
    const quill = quillInstanceRef.current;

    if (quill && quill.root.innerHTML !== text) {
      quill?.clipboard.dangerouslyPasteHTML(text);
    }
  }, [text]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <div
      ref={editorRef}
      style={{
        minHeight: "100px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        resize: "vertical" /* Makes it resizable */,
        overflow: "auto" /* Prevents overflow issues */,
      }}
    />
  );
};

export default QuillEditor;
