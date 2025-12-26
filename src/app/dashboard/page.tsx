import { supabase } from "@/infrastructure/supabase-client";
import { unstable_noStore as noStore } from 'next/cache';
import DashboardContent from "@/features/dashboard/components/dashboard";

export default async function DashboardPage() {
  noStore(); // Ensure dynamic data fetching
  
  const { data: credentials, error: credsError } = await supabase
    .from('credentials')
    .select('*');

  if (credsError) {
    console.error('Error fetching data:', credsError);
    return <div className="text-red-500">Error loading dashboard data.</div>;
  }

  return <DashboardContent credentials={credentials || []} />;
}