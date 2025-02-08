import React, { useState } from "react";
import { translateText } from "./translationService.jsx";

const languages = [
  { name: "English" },
  { name: "Hindi" },
  { name: "Punjabi" },
  { name: "Tamil" },
  { name: "Bengali" },
  { name: "Chinese" },
  { name: "Turkish" },
  { name: "Hebrew" },
];

const LanguageSwitcher = () => {
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = async (e) => {
    const selectedLang = e.target.value;
    setLoading(true);
    await translatePage(selectedLang);
    setLoading(false);
  };

  return (
    <div className="language-switcher">
      <select onChange={handleLanguageChange}>
        {languages.map((lang) => (
          <option key={lang.name} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>
      {loading && <div>Translating...</div>}
    </div>
  );
};

const translatePage = async (targetLang) => {
  const elements = document.querySelectorAll("[data-translate]");

  const translationPromises = Array.from(elements).map(async (element) => {
    const originalText = element.dataset.originalText || element.innerText;

    if (!element.dataset.originalText) {
      element.dataset.originalText = originalText;
    }

    if (targetLang === "English") {
      element.innerText = originalText;
      return;
    }

    const translatedText = await translateText(
      originalText,
      "English",
      targetLang
    );
    element.innerText = translatedText;
  });

  await Promise.all(translationPromises);
};

export default LanguageSwitcher;
