"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

type FAQ = { question: string; answer: string }

const faqData: FAQ[] = [
  {
    question: "What is Legacy and who is it for?",
    answer:
      "Legacy is a digital trust platform that lets organizations issue, and people receive and manage, tamper-proof verifiable data and documents. It’s built for universities and companies that want to eliminate credential fraud, and for students and professionals who want indisputable proof of their achievements.",
  },
  {
    question: "How does Legacy guarantee authenticity and prevent forgery?",
    answer:
      "Each document issued through Legacy is cryptographically sealed and anchored to a decentralized ledger, creating an immutable record of provenance and integrity. That makes alteration or forgery practically impossible and protects against modern threats like AI deepfakes.",
  },
  {
    question: "Can Legacy integrate with our existing systems (HR, registrar, SIS)?",
    answer:
      "Yes. Legacy is designed for interoperability. Use APIs and webhooks to connect HR systems, student information systems, and internal portals. This removes data silos, automates verification, and improves productivity without compromising security or control.",
  },
  {
    question: "Why is a Legacy verifiable document better than a PDF certificate?",
    answer:
      "A PDF is a static file that’s easy to copy and fake. A Legacy credential is a living asset with built-in cryptographic proof of origin and integrity. Anyone you share it with can instantly verify that it was issued by the source and has not been altered.",
  },
  {
    question: "Who owns the data and documents in Legacy?",
    answer:
      "You do. Legacy follows the principles of self-sovereign identity: your documents and achievements live under your control, not on a vendor’s server. You decide what to share, with whom, and for how long.",
  },
]

type FAQItemProps = {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ id, question, answer, isOpen, onToggle }) => {
  return (
    <article
      className="
        w-full rounded-[10px] bg-[rgba(231,236,235,0.08)]
        outline outline-1 outline-border outline-offset-[-1px]
        shadow-[0_2px_4px_rgba(0,0,0,0.16)]
        transition-colors
        hover:outline-white/15
      "
    >
      <header>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-content`}
          onClick={onToggle}
          className="
            w-full px-5 py-[18px] pr-4 flex items-center justify-between gap-5
            text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-[10px]
          "
        >
          <span className="flex-1 text-foreground text-base font-medium leading-6">{question}</span>
          <ChevronDown
            className={`
              h-6 w-6 text-muted-foreground-dark motion-safe:transition-transform motion-safe:duration-300
              ${isOpen ? "rotate-180" : "rotate-0"}
            `}
          />
        </button>
      </header>

      {/* Анимация раскрытия: grid-rows trick (без измерений) */}
      <div
        id={`${id}-content`}
        className={`
          grid overflow-hidden motion-safe:transition-all motion-safe:duration-500
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
        style={{ transitionProperty: "grid-template-rows, opacity" }}
      >
        <div className="min-h-0">
          <div className="px-5 pb-[18px] pt-2 text-foreground/80 text-sm leading-6">{answer}</div>
        </div>
      </div>
    </article>
  )
}

export function FAQSection() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0])) // по умолчанию открыт первый

  const toggle = (i: number) => {
    const next = new Set(openSet)
    next.has(i) ? next.delete(i) : next.add(i)
    setOpenSet(next)
  }

  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col items-center">
      {/* мягкий фон */}
      <div className="pointer-events-none absolute top-[150px] left-1/2 -translate-x-1/2 h-[500px] w-[300px] rotate-[-33.39deg] bg-primary/10 blur-[100px] -z-10" />

      <div className="pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col items-center gap-3">
        <h2 className="text-center text-foreground text-4xl font-semibold leading-10">Frequently Asked Questions</h2>
        <p
          className="mx-auto max-w-[680px] text-center text-muted-foreground text-sm md:text-base leading-relaxed"
          style={{ textWrap: "balance" }}
        >
          Everything you need to know about Legacy and how it proves and protects your achievements.
        </p>
      </div>

      <div className="w-full max-w-[720px] flex flex-col gap-4">
        {faqData.map((f, i) => (
          <FAQItem
            key={i}
            id={`faq-${i}`}
            question={f.question}
            answer={f.answer}
            isOpen={openSet.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  )
}
