"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { MembersTable } from "@/features/team/components/members-table";
import { AddMemberModal } from "@/features/team/components/add-member-modal";

export default function TeamPage() {
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  return (
    <div className="space-y-6">
      <AddMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Button onClick={() => setAddMemberOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
      <MembersTable />
    </div>
  );
}
