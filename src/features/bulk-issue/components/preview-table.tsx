
"use client";

interface CredentialStatus {
  status: "pending" | "processing" | "success" | "error";
  message?: string;
}

interface PreviewTableProps {
  data: any[];
  errors: any[];
  issuanceStatus: CredentialStatus[];
}

export default function PreviewTable({ data, errors, issuanceStatus }: PreviewTableProps) {
  if (data.length === 0) {
    return null;
  }

  const getRowError = (rowIndex: number) => {
    return errors.find((error) => error.row === rowIndex + 1);
  };

  const getStatusColorClass = (status: CredentialStatus) => {
    switch (status.status) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "processing":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Row</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">recipient_id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">serial</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => {
            const error = getRowError(index);
            const currentStatus = issuanceStatus[index];
            return (
              <tr key={index} className={error ? 'bg-red-100' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.recipient_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.serial}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {error ? (
                    <span className="text-red-500">Error: {error.message}</span>
                  ) : (
                    <span className={getStatusColorClass(currentStatus)}>{currentStatus.status} {currentStatus.message && `: ${currentStatus.message}`}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
