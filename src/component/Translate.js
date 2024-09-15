import React, { useState } from "react";
import "./Translate.css";

const Translate = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    setLoading(true);
    setError("");
    setTranslatedText("");

    try {
      const apiUrl = "https://apertium.org/apy/translate";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          langpair: `en|${language}`, // Example: en|es for English to Spanish
          q: text,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Translation API request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translate-page">
      <div className="translate-container">
        <h1 className="translate-heading">Text Translator</h1>
        <div className="translate-input-group">
          <label className="translate-label" htmlFor="text-input">
            Enter text to translate:
          </label>
          <input
            className="translate-input"
            type="text"
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="translate-input-group">
          <label className="translate-label" htmlFor="language-select">
            Select language:
          </label>
          <select
            className="translate-select"
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <button className="translate-button" onClick={handleTranslate} disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
        <div className="translate-result">
          <h2>Translated Text:</h2>
          {error ? (
            <p className="translate-error">{error}</p>
          ) : (
            <p className="translate-text">{translatedText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translate;
