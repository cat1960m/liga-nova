import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

export type Props = {
  text: string;
  onChange: (value: string) => void;
};

export const QuillEditor = ({ text, onChange }: Props) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const quill = new Quill(editorRef.current, {
      theme: "snow", // 'snow' is a clean and simple theme
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
      },
    });

    quill.clipboard.dangerouslyPasteHTML(text);

    // Listen for text changes
    quill.on("text-change", (delta, oldDelta, source) => {
      console.log(quill.root.innerHTML); // Get the HTML content
      onChange(quill.root.innerHTML);
    });

    return () => {
      quill.off("text-change"); // Clean up the listener
    };
  }, []);

  return <div ref={editorRef} style={{ height: "300px" }} />;
};
