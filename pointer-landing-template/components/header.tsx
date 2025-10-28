"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

type NavItem = { name: string; href: `#${string}` }

export function Header() {
  const [open, setOpen] = useState(false)

  const navItems: NavItem[] = [
    { name: "Features", href: "#features-section" },
    { name: "Testimonials", href: "#testimonials-section" },
    { name: "FAQ", href: "#faq-section" },
    { name: "Pricing", href: "#pricing-section" }, // оставил, у тебя сейчас заглушка — ок
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace("#", "")
    const target = document.getElementById(id)
    if (!target) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // высота хедера, чтобы не перекрывать якорь
    const headerEl = document.getElementById("site-header")
    const offset = (headerEl?.offsetHeight ?? 0) + 8

    const y = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" })
    window.history.pushState(null, "", href)
    setOpen(false) // закрываем мобильное меню
  }

  return (
    <header
      id="site-header"
      className="
        sticky top-0 z-50 w-full
        border-b border-white/10
        bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-foreground text-xl font-semibold">Legacy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
             <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-lg py-2 text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}

                <Link href="/waitlist" className="w-full mt-4">
                  <Button className="w-full rounded-full px-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Join waitlist
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
