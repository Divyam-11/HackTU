const API_URL = "http://192.168.11.94:8000/translate/";

const headers = {
  "Content-Type": "application/json",
};

const translationCache =
  JSON.parse(localStorage.getItem("translationCache")) || {};

const updateCache = (key, value) => {
  translationCache[key] = value;
  localStorage.setItem("translationCache", JSON.stringify(translationCache));
};

export const translateText = async (text, srcLang, tgtLang) => {
  const cacheKey = `${text}_${tgtLang}`;

  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    console.log(`Translating text: "${text}" to language: "${tgtLang}"`);

    // Construct payload for your API
    const payload = {
      question: text,
      answer: tgtLang,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 503) {
        console.error("Service is currently unavailable. Retrying...");
        // Optionally add retry logic here.
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("API Response:", data);

    // Adjusted check to use 'answer' field from your API response.
    if (data.answer) {
      const translatedText = data.answer;
      updateCache(cacheKey, translatedText);
      return translatedText;
    } else {
      console.error("Unexpected API response structure:", data);
      return text; // Fallback to original text if the structure is unexpected.
    }
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text.
  }
};
