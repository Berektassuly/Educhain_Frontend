// app/components/trust-ecosystem-section.tsx
"use client"

import { ShieldCheck, QrCode, CheckCircle2, Key, GraduationCap, Building2, Briefcase, Users, Rocket, TrendingUp } from "lucide-react"
import React from "react"

type Feature = {
  title: string
  text: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const Card: React.FC<Feature> = ({ title, text, Icon }) => (
  <div
    className="
      group relative overflow-hidden rounded-2xl
      bg-white/5 backdrop-blur-md
      [--ring:theme(colors.teal.400/45%)]
      transition-all duration-300
      ring-1 ring-white/10 hover:ring-[--ring]
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]
      hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]
      "
  >
    {/* gradient border glow */}
    <div
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(45,212,191,0.18), rgba(59,130,246,0.12))",
        mask: "linear-gradient(#000,#000) content-box,linear-gradient(#000,#000)",
        WebkitMask:
          "linear-gradient(#000,#000) content-box,linear-gradient(#000,#000)",
        padding: 1,
      }}
    />
    <div className="relative z-10 p-6 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div
          className="grid place-items-center size-10 rounded-xl ring-1 ring-white/10
                     bg-gradient-to-br from-white/10 to-transparent
                     group-hover:from-teal-400/20 transition-colors"
        >
          <Icon className="size-5 text-teal-300/90" strokeWidth={2} />
        </div>
        <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      </div>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  </div>
)

export default function TrustEcosystemSection() {
  // Row 1 — Foundation of Trust
  const foundation: Feature[] = [
    {
      title: "Cryptographic Truth",
      Icon: ShieldCheck, // alt: Lock
      text:
        "Every achievement is a soulbound token on Solana. Tamper-proof, forgery-proof, and forever yours. This isn’t a claim — it’s a fact.",
    },
    {
      title: "Instant Verification",
      Icon: QrCode, // alt: CheckCircle2
      text:
        "No more background checks or phone calls. Employers and partners can verify credentials in seconds — directly on-chain.",
    },
    {
      title: "You Own Your Data",
      Icon: Key,
      text:
        "Your profile isn’t on our servers — it’s in your wallet. You decide who sees your data and when. That’s digital sovereignty.",
    },
  ]

  // Row 2 — Ecosystem of Opportunities
  const ecosystem: Feature[] = [
    {
      title: "For Universities & Schools",
      Icon: GraduationCap, // alt: Building2
      text:
        "Stop issuing paper diplomas that get lost or faked. Issue verifiable, prestigious digital certificates your graduates carry forever.",
    },
    {
      title: "For HR & Companies",
      Icon: Briefcase, // alt: Users
      text:
        "Hire faster with 100% confidence. Tap into a talent pool with pre-verified skills and achievements. Cut hiring from weeks to hours.",
    },
    {
      title: "Built for the Future",
      Icon: Rocket, // alt: TrendingUp
      text:
        "Our protocol is the foundation. Next: reputation-based lending, decentralized job marketplaces, and a new economy of trust.",
    },
  ]

  return (
    <section className="w-full bg-transparent">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* subtle background aura */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 h-[360px] w-[820px] rounded-full blur-[140px] opacity-35"
            style={{ background: "radial-gradient(50% 50% at 50% 30%, rgba(45,212,191,0.10), rgba(0,0,0,0))" }}
          />
        </div>

        {/* Row 1 */}
        <header className="mb-4 md:mb-6">
          <p className="text-sm uppercase tracking-[0.18em] text-teal-300/80 text-center md:text-left">
            Foundation of Trust
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {foundation.map((f) => (
            <Card key={f.title} {...f} />
          ))}
        </div>

        {/* Row 2 */}
        <header className="mt-10 md:mt-14 mb-4 md:mb-6">
          <p className="text-sm uppercase tracking-[0.18em] text-teal-300/80 text-center md:text-left">
            Ecosystem of Opportunities
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {ecosystem.map((f) => (
            <Card key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}
