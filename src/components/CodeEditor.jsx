import { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

const CodeEditor = ({ language = "javascript" }) => {
  const [code, setCode] = useState("let sample = 13;");
  const displayCode = useRef(null);
  // Function to handle changes in the editable div
  const handleInput = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {
    if (displayCode.current) {
      displayCode.current.innerHTML = hljs.highlight(code, {
        language: language,
      }).value;
    }
  }, [code]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h4
        style={{
          width: "80%",
          marginBottom: "12px",
        }}
      >
        Write Code
      </h4>
      <textarea
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          height: "200px",
          padding: "10px",
          fontFamily: "monospace",
          border: "1px solid #ccc",
          borderRadius: "5px",
          outline: "none",
          whiteSpace: "pre-wrap",
          overflowY: "auto",
          backgroundColor: "#f5f5f5",
          marginBottom: "24px",
        }}
        placeholder={code}
        onChange={handleInput}
      ></textarea>

      <h4
        style={{
          width: "80%",
          marginBottom: "12px",
        }}
      >
        Preview
      </h4>
      <pre
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <code
          className={"language-" + language}
          ref={displayCode}
          style={{
            width: "80%",
            height: "200px",
            padding: "10px",
            fontFamily: "monospace",
            border: "none",
            borderRadius: "5px",
            outline: "none",
            whiteSpace: "pre-wrap",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
          }}
        ></code>
      </pre>
    </div>
  );
};

export default CodeEditor;
