"use client"

import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full border-t border-white/10 bg-transparent">
      <div className="max-w-[1320px] mx-auto px-5 py-10 md:py-14 flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left: brand + tagline + socials */}
        <div className="min-w-[240px] flex-1">
          <div className="flex items-center gap-2">
            <span className="text-foreground text-xl font-semibold">Legacy</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Verifiable credentials. Owned by you.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/Berektassuly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-white/10 hover:bg-white/5 transition"
            >
              <Github className="h-4 w-4 text-muted-foreground" />
            </a>
            <a
              href="https://www.linkedin.com/in/mukhammedali-berektassuly-aa8a43364/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-white/10 hover:bg-white/5 transition"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Right: links */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#features-section" className="text-sm text-foreground hover:underline">Features</Link></li>
              <li><Link href="#testimonials-section" className="text-sm text-foreground hover:underline">Testimonials</Link></li>
              <li><Link href="#faq-section" className="text-sm text-foreground hover:underline">FAQ</Link></li>
              <li><Link href="#pricing-section" className="text-sm text-foreground hover:underline">Pricing</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium">Company</h3>
            <ul className="space-y-2">
              {/* при необходимости поставишь реальные роуты */}
              <li><span className="text-sm text-foreground/70">About</span></li>
              <li><span className="text-sm text-foreground/70">Careers</span></li>
              <li>
                <a
                  href="mailto:hello@legacy.app?subject=Contact%20Legacy"
                  className="text-sm text-foreground hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-sm text-foreground hover:underline">Documentation</Link></li>
              <li><a href="https://github.com/Berektassuly" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:underline">API / GitHub</a></li>
              <li>
                <a
                  href="mailto:hello@legacy.app?subject=Legacy%20Support"
                  className="text-sm text-foreground hover:underline"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Legacy. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/mukhammedali-berektassuly-aa8a43364/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Mukhamedali Berektassuly
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
