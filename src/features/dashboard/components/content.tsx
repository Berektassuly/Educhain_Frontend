
"use client";

import { useState } from "react";
import CredentialsTable from "./credentials-table";
import Search from "./search";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("issuer_id");

  const filteredCredentials = credentials.filter((credential) =>
    credential[searchType as keyof Credential]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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

      <div className="flex justify-between items-center">
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <p className="text-gray-600 dark:text-gray-400">
          {searchQuery
            ? `Showing ${filteredCredentials.length} credentials for "${searchQuery}"`
            : "Showing all credentials"}
        </p>
      </div>

      <CredentialsTable credentials={filteredCredentials} />
    </div>
  );
}

