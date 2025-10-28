
// @/components/kokonutui/organizations-table.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  interface Organization {
    id: string;
    name: string;
    wallet_address: string;
    is_verified: boolean;
    website_url: string;
  }
  
  interface Props {
    organizations: Organization[];
  }
  
  export default function OrganizationsTable({ organizations }: Props) {
    return (
      <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations?.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>{org.name}</TableCell>
                  <TableCell className="truncate max-w-[150px]">{org.wallet_address}</TableCell>
                  <TableCell>
                    <a
                      href={org.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {org.website_url}
                    </a>
                  </TableCell>
                  <TableCell>
                    {org.is_verified ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      <span className="text-yellow-500">Pending</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    );
  }
  