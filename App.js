import React, { useState } from "react";
import FileUpload from "./FileUpload";

const App = () => {
  const [files, setFiles] = useState({});

  const handleFileSelect = (name, file) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(files)) {
      if (value) {
        formData.append(key, value);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Upload success:", result);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <FileUpload name="UploadInvoice" onFileSelect={handleFileSelect} />
      <FileUpload name="ConfirmationInvoice" onFileSelect={handleFileSelect} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
