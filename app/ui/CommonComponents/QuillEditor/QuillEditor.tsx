"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

import styles from "./quillEditor.module.css";

export type Props = {
  text: string;
  onChange: (value: string) => void;
};

const QuillEditor = ({ text, onChange }: Props) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null); // Reference for the Quill instance
  const [data, setData] = useState<string>(text);

  const changeName = ({
    classname,
    name,
  }: {
    classname: string;
    name: string;
  }) => {
    const toolbar = document.querySelector(".ql-toolbar");
    const weightPicker = toolbar?.querySelector(classname);

    if (weightPicker) {
      const title = document.createElement("span");
      title.textContent = name;
      title.style.marginRight = "8px"; // Add some spacing
      title.style.fontSize = "14px"; // Add some spacing

      weightPicker?.parentNode?.parentNode?.insertBefore(
        title,
        weightPicker?.parentNode
      );
    }
  };

  useEffect(() => {
    if (!editorRef?.current) {
      return;
    }

    if (!quillInstanceRef.current) {
      const Parchment = Quill.import("parchment"); // Access Parchment directly

      const FontWeightAttributor = new Parchment.StyleAttributor(
        "weight", // Format name for Quill
        "font-weight", // CSS property
        {
          scope: Parchment.Scope.INLINE,
          whitelist: ["normal", "bold", "100", "300", "400", "700"], // Allowed values
        }
      );
      Quill.register(FontWeightAttributor, true);

      const FontSizeAttributor = new Parchment.StyleAttributor(
        "fontsize", // Format name for Quill
        "font-size", // CSS property
        {
          scope: Parchment.Scope.INLINE,
          whitelist: ["12px", "14px", "16px", "18px", "20px", "28px"], // Allowed values
        }
      );
      Quill.register(FontSizeAttributor, true);

      const PaddingStyle = new Parchment.StyleAttributor(
        "padding", // Format name for Quill
        "padding", // Corresponding CSS property
        {
          scope: Parchment.Scope.INLINE,
          whitelist: ["5px", "10px", "15px", "20px"], // Allowed padding values
        }
      );
      Quill.register(PaddingStyle, true);

      const MarginStyle = new Parchment.StyleAttributor(
        "margin", // Format name for Quill
        "margin", // Corresponding CSS property
        {
          /*   scope: Parchment.Scope.INLINE, */
          whitelist: ["5px", "10px", "15px", "20px"], // Allowed margin values
        }
      );
      Quill.register(MarginStyle, true);

      const BackgroundColorStyle = new Parchment.StyleAttributor(
        "backgroundColor",
        "background-color",
        {
          scope: Parchment.Scope.INLINE,
          whitelist: ["lightgray", "gray"],
        }
      );
      Quill.register(BackgroundColorStyle, true);

      const CustomClass = new Parchment.ClassAttributor(
        "custom-style",
        "custom-style",
        {
          scope: Parchment.Scope.INLINE,
          whitelist: ["style1", "style2"],
        }
      );
      Quill.register(CustomClass, true);

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            [{ fontsize: ["12px", "14px", "16px", "18px", "20px", "28px"] }],
            [
              {
                weight: ["normal", "bold", "100", "300", "400", "700"],
              },
            ], // Custom font-weight dropdown
            ["bold", "italic", "underline", "strike"],
            [{ padding: ["5px", "10px", "15px", "20px"] }], // Padding dropdown
            [{ margin: ["5px", "10px", "15px", "20px"] }], // Margin dropdown
            [{ color: [] }], // Add color selection
            [{ backgroundColor: ["lightgray", "gray"] }], // Add color selection
            [{ "custom-style": ["style1", "style2"] }],
            [{ align: [] }], // Add alignment options
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      changeName({ classname: ".ql-weight", name: "Font Weight" });
      changeName({ classname: ".ql-fontsize", name: "Font Size" });
      changeName({ classname: ".ql-padding", name: "Padding" });
      changeName({ classname: ".ql-margin", name: "Margin" });
      changeName({ classname: ".ql-backgroundColor", name: "BG color" });
      changeName({ classname: ".ql-custom-style", name: "Style" });

      quillInstanceRef.current = quill;
    }

    const quill = quillInstanceRef.current;
    quill.on("text-change", () => {
      /*  const editor = document.querySelector(".ql-editor");
      editor?.querySelectorAll("p").forEach((p) => {
        p.style.marginTop = "5px";
      }); */

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

  return <div ref={editorRef} className={styles.container} />;
};

export default QuillEditor;
