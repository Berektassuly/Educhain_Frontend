"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/shared/ui/button"

type Audience = "individual" | "organization"

export function CTASection() {
  const [audience, setAudience] = useState<Audience>("individual")

  const copy = {
    individual: {
      title: "Claim your Legacy",
      subtitle:
        "Create a verifiable profile in minutes and collect tamper-proof credentials you already earned. Your data stays in your wallet.",
      primaryHref: "/waitlist",
      primaryText: "Join waitlist",
      secondaryHref: "mailto:hello@legacy.app?subject=Legacy%20Demo",
      secondaryText: "Get a demo",
      bullets: ["Own your data", "Instant verification", "Open standard"],
    },
    organization: {
      title: "Issue verifiable credentials",
      subtitle:
        "Turn diplomas, certificates, and training into tamper-proof digital credentials. API-first integration, minutes to start.",
      primaryHref: "mailto:hello@legacy.app?subject=Legacy%20for%20Organizations",
      primaryText: "Talk to sales",
      secondaryHref: "/docs",
      secondaryText: "Read docs",
      bullets: ["Reduce fraud", "Faster hiring & onboarding", "API & webhooks"],
    },
  } as const

  const c = copy[audience]

  return (
    <section className="w-full px-5 pt-20 md:pt-32 pb-14 md:pb-24 relative flex justify-center">
      {/* мягкое свечение вместо тяжёлого SVG */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-[420px] w-[900px] rounded-full blur-[140px] opacity-40"
          style={{ background: "radial-gradient(50% 50% at 50% 30%, rgba(45,212,191,0.12), rgba(0,0,0,0))" }}
        />
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center gap-8 text-center">
        {/* переключатель аудитории */}
        <div className="p-0.5 bg-muted/60 rounded-full outline outline-1 outline-[#03071214] flex gap-1">
          <button
            onClick={() => setAudience("individual")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              audience === "individual" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            For Individuals
          </button>
          <button
            onClick={() => setAudience("organization")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              audience === "organization" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            For Organizations
          </button>
        </div>

        {/* заголовок и сабтайтл */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight" style={{ textWrap: "balance" }}>
            {c.title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl" style={{ textWrap: "balance" }}>
            {c.subtitle}
          </p>
        </div>

        {/* кнопки */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="rounded-full px-6">
            <Link href={c.primaryHref}>{c.primaryText}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href={c.secondaryHref}>{c.secondaryText}</Link>
          </Button>
        </div>

        {/* маленькие буллеты — тихий social proof */}
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
          {c.bullets.map((b) => (
            <li key={b} className="px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10">
              {b}
            </li>
          ))}
        </ul>

        {/* статус беты */}
        <div className="text-xs uppercase tracking-wider text-teal-300/80 mt-2">
          Private beta • Preferred pricing for design partners
        </div>
      </div>
    </section>
  )
}
