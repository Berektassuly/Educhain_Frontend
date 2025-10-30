import Sidebar from "@/features/dashboard/components/sidebar";
import Link from "next/link";

export default function IssueCredentialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0F0F12]">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-4">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            &larr; Back to Dashboard
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
