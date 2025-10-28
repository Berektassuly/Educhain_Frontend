import Dashboard from "@/components/kokonutui/dashboard";
import { supabase } from "@/lib/supabaseClient";
import { unstable_noStore as noStore } from 'next/cache';

export default async function DashboardPage() {
  noStore(); // Ensure dynamic data fetching
  
  const { data: organizations, error: orgsError } = await supabase
    .from('organizations')
    .select('*');

  const { data: credentials, error: credsError } = await supabase
    .from('verifiable_credentials')
    .select(`
      *,
      organizations (
        name,
        logo_url
      )
    `);

  if (orgsError || credsError) {
    console.error('Error fetching data:', orgsError || credsError);
    // Handle error appropriately
    return <div>Error loading dashboard data.</div>;
  }

  return <Dashboard organizations={organizations} credentials={credentials} />;
}

