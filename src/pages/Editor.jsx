import "@/assets/styles/editor.css";
import CodeEditor from "../components/CodeEditor";

const Editor = () => {
  return (
    <div className="editor">
      {/* Header */}
      <div className="header">
        <button className="primary-btn">Upload Code</button>
      </div>
      {/* Main Editor */}
      <div className="edit-box">
        <CodeEditor />
      </div>
    </div>
  );
};

export default Editor;
