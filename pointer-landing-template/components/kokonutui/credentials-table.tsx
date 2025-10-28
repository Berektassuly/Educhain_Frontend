// @/components/kokonutui/credentials-table.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  interface Credential {
    id: string;
    title: string;
    recipient_wallet_address: string;
    transaction_hash: string;
    organizations: {
      name: string;
    };
  }
  
  interface Props {
    credentials: Credential[];
  }
  
  export default function CredentialsTable({ credentials }: Props) {
    return (
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Verifiable Credentials
        </h2>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Credential</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Issuer</TableHead>
                <TableHead>Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentials?.map((cred) => (
                <TableRow key={cred.id}>
                  <TableCell>{cred.title}</TableCell>
                  <TableCell className="truncate max-w-[150px]">{cred.recipient_wallet_address}</TableCell>
                  <TableCell>{cred.organizations.name}</TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    <a
                      href={`https://etherscan.io/tx/${cred.transaction_hash}`} // Example for Ethereum
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {cred.transaction_hash}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  