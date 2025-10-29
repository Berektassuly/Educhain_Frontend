
"use client";

import CredentialsTable from "./credentials-table";

// Define types for our data to ensure type safety
interface Credential {
  hash: string;
  issuer_id: string;
  recipient_id: string;
  solana_tx_id: string;
}

interface ContentProps {
  credentials: Credential[];
}

export default function Content({ credentials }: ContentProps) {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Web3 Credentials Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Monitor verified organizations and the soulbound credentials they issue.
        </p>
      </section>

      <CredentialsTable credentials={credentials} />
    </div>
  );
}

