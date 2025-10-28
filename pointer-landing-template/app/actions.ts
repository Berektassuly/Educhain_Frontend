"use server";

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Note: This client uses the service_role key and should only be used on the server.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function addOrganization(formData: FormData) {
  const orgData = {
    name: formData.get('name') as string,
    wallet_address: formData.get('wallet_address') as string,
    description: formData.get('description') as string,
    website_url: formData.get('website_url') as string,
    logo_url: formData.get('logo_url') as string,
  };

  const { error } = await supabaseAdmin.from('organizations').insert([orgData]);

  if (error) {
    console.error('Error adding organization:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard'); // This will refresh the data on the dashboard page
  return { success: true };
}
