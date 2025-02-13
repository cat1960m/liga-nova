"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminTranslationPage() {
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("UN"); // Example: German

  const handleTranslate = async () => {
    try {
      const response = await axios.post("/api/translate", {
        text: originalText,
        targetLang,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/save-translation", {
        originalText,
        translatedText,
        targetLang,
      });
      alert("Translation saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Translate & Edit Text</h1>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter text to translate"
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleTranslate}
      >
        Translate
      </button>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Translated text"
        value={translatedText}
        onChange={(e) => setTranslatedText(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Save Translation
      </button>
    </div>
  );
}
