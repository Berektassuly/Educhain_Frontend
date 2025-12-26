
"use client";

import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

interface SearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchType: string;
    setSearchType: (type: string) => void;
}

export default function Search({ searchQuery, setSearchQuery, searchType, setSearchType }: SearchProps) {
    return (
        <div className="flex items-center space-x-4">
            <Input
                placeholder="Filter by Issuer (e.g., NU, AITU)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
            />
            <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="issuer_id">Issuer</SelectItem>
                    <SelectItem value="recipient_id">Recipient</SelectItem>
                    <SelectItem value="solana_tx_id">Transaction</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
