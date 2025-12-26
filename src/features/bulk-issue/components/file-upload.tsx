
"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

interface FileUploadProps {
  onFileParsed: (data: any[], errors: any[]) => void;
}

export default function FileUpload({ onFileParsed }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validationErrors: any[] = [];
        if (!results.meta.fields?.includes('recipient_id')) {
          setError('CSV must have a "recipient_id" column.');
          onFileParsed([], []);
          return;
        }

        const validatedData = results.data.map((row: any, index) => {
          if (!row.recipient_id) {
            validationErrors.push({ row: index + 1, message: 'recipient_id is required' });
          }
          return row;
        });

        onFileParsed(validatedData, validationErrors);
      },
    });
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      setError('Invalid file type. Please upload a CSV file.');
      setFile(null);
      onFileParsed([], []);
      return;
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      if (acceptedFile.type !== 'text/csv') {
        setError('Invalid file type. Please upload a CSV file.');
        setFile(null);
        onFileParsed([], []);
        return;
      }
      setFile(acceptedFile);
      setError(null);
      parseFile(acceptedFile);
    }
  }, [onFileParsed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
    onFileParsed([], []);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop a CSV file here, or click to select a file</p>
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
