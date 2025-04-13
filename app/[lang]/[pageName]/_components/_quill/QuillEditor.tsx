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
      const Parchment = Quill.import("parchment"); // Access Parchment directly

      /*  const FontWeightStyle = new Parchment.Attributor.Style('fontWeight', 'font-weight', {
        scope: Parchment.Scope.INLINE,
        whitelist: ['normal', 'bold', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      });
      
      Quill.register(FontWeightStyle, true); */

      const FontWeightAttributor = new Parchment.StyleAttributor(
        "weight", // Format name for Quill
        "font-weight", // CSS property

        {
          scope: Parchment.Scope.INLINE,
          whitelist: [
            "normal",
            "bold",
            "bolder",
            "lighter",
            "100",
            "300",
            "400",
            "700",
          ], // Allowed values
        }
      );

      console.log("FontWeightAttributor", FontWeightAttributor);

      // Register the font-weight format
      Quill.register(FontWeightAttributor, true);

      /*   const FontWeight = new StyleAttributor('fontWeight', 'font-weight', {
        scope: Scope.INLINE,
        whitelist: ['normal', 'bold', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      });
      
      Quill.register(FontWeight, true); */

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ font: [] }], // Font selection
            [
              {
                weight: [
                  "normal",
                  "bold",
                  "bolder",
                  "lighter",
                  "100",
                  "300",
                  "400",
                  "700",
                ],
              },
            ], // Custom font-weight dropdown
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }], // Add color selection
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      // Find the toolbar element for font-weight and add a title
      const toolbar = document.querySelector(".ql-toolbar");
      const weightPicker = toolbar?.querySelector(".ql-weight");

      if (weightPicker) {
        const title = document.createElement("span");
        title.textContent = "Font Weight";
        title.style.marginRight = "8px"; // Add some spacing
        title.style.fontSize = "14px"; // Add some spacing

        weightPicker?.parentNode?.parentNode?.insertBefore(
          title,
          weightPicker?.parentNode
        );
      }

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
