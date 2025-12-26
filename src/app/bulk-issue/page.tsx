
"use client";

import { useState } from "react";
import FileUpload from "@/features/bulk-issue/components/file-upload";
import SingleFileUpload from "@/features/bulk-issue/components/single-file-upload";
import PreviewTable from "@/features/bulk-issue/components/preview-table";

interface CredentialStatus {
  status: "pending" | "processing" | "success" | "error";
  message?: string;
}

export default function BulkIssuePage() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [issuanceStatus, setIssuanceStatus] = useState<CredentialStatus[]>([]);
  const [isIssuing, setIsIssuing] = useState(false);
  const [selectedIssuerId, setSelectedIssuerId] = useState<string | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);

  // Placeholder for issuers. In a real app, this would come from an API.
  const issuers = [
    { id: "issuer1", name: "Issuer One" },
    { id: "issuer2", name: "Issuer Two" },
    { id: "issuer3", name: "Issuer Three" },
  ];

  const validateData = (data: any[]) => {
    const validationErrors: any[] = [];
    data.forEach((row, index) => {
      if (!row.recipient_id) {
        validationErrors.push({
          row: index + 1,
          message: "recipient_id is required",
        });
      }
    });
    return validationErrors;
  };

  const handleFileParsed = (data: any[]) => {
    const validationErrors = validateData(data);
    setParsedData(data);
    setErrors(validationErrors);
    setIssuanceStatus(data.map(() => ({ status: "pending" })));
  };

  const issueCredential = async (credentialData: any): Promise<CredentialStatus> => {
    try {
      if (!selectedIssuerId || !templateFile) {
        throw new Error("Issuer or template file not selected.");
      }

      const formData = new FormData();
      formData.append("file", templateFile);
      formData.append("issuerId", selectedIssuerId);
      formData.append("recipientId", credentialData.recipient_id);
      if (credentialData.serial) {
        formData.append("serialNumber", credentialData.serial);
      }

      const response = await fetch("/api/credentials/issue", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to issue credential");
      }

      return { status: "success" };
    } catch (error: any) {
      return { status: "error", message: error.message };
    }
  };

  const startBulkIssuance = async () => {
    setIsIssuing(true);
    for (let i = 0; i < parsedData.length; i++) {
      setIssuanceStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[i] = { status: "processing" };
        return newStatus;
      });

      const result = await issueCredential(parsedData[i]);

      setIssuanceStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[i] = result;
        return newStatus;
      });

      // Add a delay to avoid overwhelming the backend
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setIsIssuing(false);
  };

  const handleStartIssuance = () => {
    if (!selectedIssuerId) {
      alert("Please select an issuer.");
      return;
    }
    if (!templateFile) {
      alert("Please upload a template file.");
      return;
    }
    if (errors.length > 0) {
      alert("Please fix the errors before starting the issuance.");
      return;
    }
    if (window.confirm(`You are about to issue ${parsedData.length} credentials. Do you want to proceed?`)) {
      startBulkIssuance();
    }
  };

  const downloadTemplate = () => {
    const template = `recipient_id,serial\n,`;
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalCredentials = parsedData.length;
  const successfulIssuances = issuanceStatus.filter(s => s.status === "success").length;
  const failedIssuances = issuanceStatus.filter(s => s.status === "error").length;
  const processingIssuances = issuanceStatus.filter(s => s.status === "processing").length;
  const pendingIssuances = issuanceStatus.filter(s => s.status === "pending").length;

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Bulk Issue Credentials
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Upload a CSV file to issue multiple credentials at once.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">1. Select Issuer</h2>
          <select
            value={selectedIssuerId || ""}
            onChange={(e) => setSelectedIssuerId(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="" disabled>Select an Issuer</option>
            {issuers.map((issuer) => (
              <option key={issuer.id} value={issuer.id}>
                {issuer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">2. Upload Template File</h2>
          <SingleFileUpload
            onFileSelected={setTemplateFile}
            acceptedFileTypes={["application/pdf", "image/png", "image/jpeg"]}
            label="Drag 'n' drop a template file here, or click to select a file (PDF, PNG, JPG)"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">3. Upload CSV File</h2>
          <FileUpload onFileParsed={handleFileParsed} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">4. CSV Format Guide</h2>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Your CSV file should have the following columns:</p>
            <ul className="list-disc list-inside">
              <li><b>recipient_id</b> (required): The ID of the recipient.</li>
              <li><b>serial</b> (optional): A unique serial number for the credential.</li>
            </ul>
            <p>You can download a template to get started.</p>
          </div>
          <button onClick={downloadTemplate} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Download Template
          </button>
        </div>
      </div>

      {parsedData.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">5. Preview and Confirmation</h2>
          <PreviewTable data={parsedData} errors={errors} issuanceStatus={issuanceStatus} />
          <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Issuance Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${(successfulIssuances / totalCredentials) * 100 || 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Total: {totalCredentials}</span>
                <span>Processing: {processingIssuances}</span>
                <span>Successful: {successfulIssuances}</span>
                <span>Failed: {failedIssuances}</span>
                <span>Pending: {pendingIssuances}</span>
              </div>
            </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handleStartIssuance} 
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
              disabled={errors.length > 0 || isIssuing}
            >
              {isIssuing ? "Issuing..." : "Start Issuance"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
