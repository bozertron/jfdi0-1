import React, { useState } from 'react';

const KnowledgeBase: React.FC = () => {
  const [files, setFiles] = useState<string[]>(['Document 1', 'Document 2', 'Document 3']);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFiles([...files, file.name]);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Knowledge Base</h2>
      <div className="flex">
        <div className="w-1/3 pr-4">
          <h3 className="font-bold mb-2">Files</h3>
          <ul>
            {files.map((file, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedFile === file ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedFile(file)}
              >
                {file}
              </li>
            ))}
          </ul>
          <input
            type="file"
            onChange={addFile}
            className="mt-4"
          />
        </div>
        <div className="w-2/3 pl-4 border-l">
          <h3 className="font-bold mb-2">Content</h3>
          {selectedFile ? (
            <div>
              <h4 className="text-lg font-semibold">{selectedFile}</h4>
              <p>Content for {selectedFile} goes here...</p>
            </div>
          ) : (
            <p>Select a file to view its content</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;