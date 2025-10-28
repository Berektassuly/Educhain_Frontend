// @/components/kokonutui/add-organization-form.tsx
"use client";

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { addOrganization } from '@/features/dashboard/api/actions';
import { useToast } from '@/shared/hooks/use-toast';

const initialState = {
  success: false,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding...' : 'Add Organization'}
    </Button>
  );
}

export function AddOrganizationForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [state, formAction] = useFormState(addOrganization, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  if (state.success) {
    toast({
      title: "Success!",
      description: "The new organization has been added.",
    });
    formRef.current?.reset();
    closeDialog();
  } else if (state.error) {
    toast({
      title: "Error",
      description: "Failed to add organization. " + state.error,
      variant: "destructive",
    });
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Organization Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="wallet_address">Wallet Address</Label>
        <Input id="wallet_address" name="wallet_address" required />
      </div>
      <div>
        <Label htmlFor="website_url">Website URL</Label>
        <Input id="website_url" name="website_url" type="url" />
      </div>
      <div>
        <Label htmlFor="logo_url">Logo URL</Label>
        <Input id="logo_url" name="logo_url" type="url" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
      </div>
      <SubmitButton />
    </form>
  );
}
