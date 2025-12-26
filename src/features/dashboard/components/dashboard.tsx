
import Content from "./content";


// Define types for our data to ensure type safety
interface Credential {
  hash: string;
  issuer_id: string;
  recipient_id: string;
  solana_tx_id: string;
}

interface DashboardProps {
  credentials: Credential[];
}

export default function Dashboard({ credentials }: DashboardProps) {
  return <Content credentials={credentials} />;
}


