
"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface SingleFileUploadProps {
  onFileSelected: (file: File | null) => void;
  acceptedFileTypes?: string[];
  label: string;
}

export default function SingleFileUpload({ onFileSelected, acceptedFileTypes, label }: SingleFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      setError(`Invalid file type. Please upload ${acceptedFileTypes?.join(", ") || "a file"}.`);
      setFile(null);
      onFileSelected(null);
      return;
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      if (acceptedFileTypes && !acceptedFileTypes.includes(acceptedFile.type)) {
        setError(`Invalid file type. Please upload ${acceptedFileTypes.join(", ")}.`);
        setFile(null);
        onFileSelected(null);
        return;
      }
      setFile(acceptedFile);
      setError(null);
      onFileSelected(acceptedFile);
    }
  }, [onFileSelected, acceptedFileTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? acceptedFileTypes.reduce((acc: any, type) => {
      acc[type] = [];
      return acc;
    }, {}) : undefined,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
    onFileSelected(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>{label}</p>
        )}
      </div>
      {file && (
        <div className="flex items-center justify-between p-2 border rounded-lg">
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
          <button onClick={removeFile} className="text-red-500 hover:text-red-700">Remove</button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
