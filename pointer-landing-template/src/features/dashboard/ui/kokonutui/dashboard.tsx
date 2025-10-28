import Content from "./content";
import Layout from "./layout";

// Define types for our data to ensure type safety
interface Organization {
  id: string;
  name: string;
  logo_url: string;
  // Add other organization fields as needed
}

interface Credential {
  id: string;
  title: string;
  recipient_wallet_address: string;
  organizations: {
    name: string;
    logo_url: string;
  };
  // Add other credential fields as needed
}

interface DashboardProps {
  organizations: Organization[];
  credentials: Credential[];
}

export default function Dashboard({ organizations, credentials }: DashboardProps) {
  return (
    <Layout>
      <Content organizations={organizations} credentials={credentials} />
    </Layout>
  );
}

