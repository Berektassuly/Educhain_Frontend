// @/components/kokonutui/credentials-table.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/shared/ui/table";
  
  interface Credential {
    hash: string;
    issuer_id: string;
    recipient_id: string;
    solana_tx_id: string;
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
                <TableHead>Issuer</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentials?.map((cred) => (
                <TableRow key={cred.hash}>
                  <TableCell>{cred.issuer_id}</TableCell>
                  <TableCell className="truncate max-w-[150px]">{cred.recipient_id}</TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    <a
                      href={`https://explorer.solana.com/tx/${cred.solana_tx_id}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {cred.solana_tx_id}
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
  