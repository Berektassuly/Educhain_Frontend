
import Dashboard from "@/features/dashboard/ui/kokonutui/dashboard";
import { supabase } from "@/infrastructure/supabase-client";
import { unstable_noStore as noStore } from 'next/cache';

export default async function DashboardPage() {
  noStore(); // Ensure dynamic data fetching
  
  const { data: credentials, error: credsError } = await supabase
    .from('credentials')
    .select('*');

  if (credsError) {
    console.error('Error fetching data:', credsError);
    // Handle error appropriately
    return <div>Error loading dashboard data.</div>;
  }

  return <Dashboard credentials={credentials || []} />;
}


