import "@/assets/styles/editor.css";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";
import { useEffect } from "react";
import { ApiClient } from "../api/api";

const Editor = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    try {
      const apiClient = new ApiClient();
      apiClient.get("upload/list").then((res) => {
        if (res?.data.data) setFiles(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="editor">
      {/* Header */}

      <div className="header">
        <button className="primary-btn">Upload Code</button>
      </div>

      <div className="my-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Filename</th>
            </tr>
          </thead>
          <tbody>
            {files.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.filename}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main Editor */}
      <div className="edit-box">
        <CodeEditor />
      </div>
    </div>
  );
};

export default Editor;
