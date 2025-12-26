// settings/components/settings-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/utils";
import { 
  User, 
  Building, 
  Bell, 
  Shield 
} from "lucide-react";

const settingsNavItems = [
  {
    title: "Account",
    href: "/settings/account",
    icon: User,
    description: "Personal information and preferences"
  },
  {
    title: "Organization",
    href: "/settings/organization",
    icon: Building,
    description: "Organization details and branding"
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
    description: "Notification preferences"
  },
  {
    title: "Security",
    href: "/settings/security",
    icon: Shield,
    description: "Security and authentication"
  },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {settingsNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          <div className="flex-1">
            <div>{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.description}</div>
          </div>
        </Link>
      ))}
    </nav>
  );
}