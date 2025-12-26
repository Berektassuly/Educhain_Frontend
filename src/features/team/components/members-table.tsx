"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useTeamMembers } from "../hooks/use-team-members";
import { AddMemberModal } from "./add-member-modal";
import { EditRoleModal } from "./edit-role-modal";
import { RemoveMemberDialog } from "./remove-member-dialog";

export function MembersTable() {
  const { data: members, isLoading } = useTeamMembers();
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [removeMemberOpen, setRemoveMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditRoleOpen(true);
  };

  const handleRemove = (member) => {
    setSelectedMember(member);
    setRemoveMemberOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <AddMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
      <EditRoleModal
        member={selectedMember}
        open={editRoleOpen}
        onOpenChange={setEditRoleOpen}
      />
      <RemoveMemberDialog
        member={selectedMember}
        open={removeMemberOpen}
        onOpenChange={setRemoveMemberOpen}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.email}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  {member.name}
                </div>
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Badge
                  variant={member.role === "Admin" ? "default" : "secondary"}
                >
                  {member.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                  Edit Role
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => handleRemove(member)}
                >
                  Remove Member
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
