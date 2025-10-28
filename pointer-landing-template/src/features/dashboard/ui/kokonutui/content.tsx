
"use client";

import { useState } from 'react';
import OrganizationsTable from "./organizations-table";
import CredentialsTable from "./credentials-table";
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { AddOrganizationForm } from './add-organization-form';

// Define types for our data to ensure type safety
interface Organization {
  id: string;
  name: string;
  wallet_address: string;
  is_verified: boolean;
  website_url: string;
}

interface Credential {
  id: string;
  title: string;
  recipient_wallet_address: string;
  transaction_hash: string;
  organizations: {
    name: string;
  };
}

interface ContentProps {
  organizations: Organization[];
  credentials: Credential[];
}

export default function Content({ organizations, credentials }: ContentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Verified Organizations
          </h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Organization</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Organization</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new organization to the trust network.
                </DialogDescription>
              </DialogHeader>
              <AddOrganizationForm closeDialog={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <OrganizationsTable organizations={organizations} />
      </div>
      
      <CredentialsTable credentials={credentials} />
    </div>
  );
}

