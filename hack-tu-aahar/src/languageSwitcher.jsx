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
  // Select all elements with the "data-translate" attribute.
  const elements = document.querySelectorAll("[data-translate]");

  const translationPromises = Array.from(elements).map(async (element) => {
    // Store original HTML if not already done.
    const originalHtml = element.dataset.originalHtml || element.innerHTML;
    if (!element.dataset.originalHtml) {
      element.dataset.originalHtml = originalHtml;
    }

    // If the target language is English, revert to the original HTML.
    if (targetLang === "English") {
      element.innerHTML = originalHtml;
      return;
    }

    // Replace <br> tags with a placeholder.
    const textForTranslation = originalHtml.replace(/<br\s*\/?>/g, "[br]");

    // Translate the text.
    const translatedText = await translateText(
      textForTranslation,
      "English",
      targetLang
    );

    // Restore the <br> tags from the placeholder.
    const translatedHtml = translatedText.replace(/\[br\]/g, "<br/>");

    // Update the element's HTML.
    element.innerHTML = translatedHtml;
  });

  await Promise.all(translationPromises);
};

export default LanguageSwitcher;
