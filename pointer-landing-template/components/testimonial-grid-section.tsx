import Image from "next/image"
import React from "react"

type TType = "large-teal" | "large-light" | "small-dark"
type Testimonial = {
  quote: string
  name: string
  company: string
  avatar?: string
  type: TType
}

const testimonials: Testimonial[] = [
  {
    quote:
      "My paper diploma is gathering dust somewhere I don't even remember. My Legacy profile is now my single source of truth. It's not a piece of paper; it's a living, verifiable record of my entire journey, from my first hackathon win to my graduation. Recruiters see this and they get it instantly.",
    name: "Ali T.",
    company: "Graduate, Alem School",
    avatar: "/images/avatars/ali-tlekbai.png",
    type: "large-teal",
  },
  {
    quote:
      "We used to spend 20% of our recruiting time on background checks. Legacy eliminated that. Now, if a candidate has a verified profile, we trust it. It’s faster, cheaper, and infinitely more secure than any CV we’ve ever received.",
    name: "Elena Kim",
    company: "Head of Talent, EPAM Kazakhstan",
    avatar: "/images/avatars/elena-kim.png",
    type: "small-dark",
  },
  {
    quote:
      "As a freelancer, my reputation is my business. Before, I had to rely on screenshots and client reviews. Now, I have immutable, on-chain proof of every completed project and certification. It's the ultimate trust signal for new clients.",
    name: "Sanzhar Omarov",
    company: "Freelance Web3 Developer",
    avatar: "/images/avatars/sanzhar-omarov.png",
    type: "small-dark",
  },
  {
    quote:
      "Diploma fraud is a silent threat to our institution's reputation. Legacy provides a simple, powerful solution to issue tamper-proof digital credentials, protecting the value of the degrees we award.",
    name: "Dr. Aisha Nurzhanova",
    company: "Dean's Office, KBTU",
    avatar: "/images/avatars/aisha-nurzhanova.png",
    type: "small-dark",
  },
  {
    quote:
      "We no longer hand out simple PDF certificates. With Legacy, every winner, every participant gets a permanent, shareable SBT. It adds real, lasting value to their participation long after the event is over.",
    name: "Sanzhar",
    company: "Admin, Decentrathon",
    avatar: "/images/avatars/sanzhar.png",
    type: "small-dark",
  },
  {
    quote:
      "Integrating Legacy for our internal training certifications was not just simple, it felt seamless. We went from manual tracking in spreadsheets to an automated, verifiable system of employee achievements in a single afternoon.",
    name: "Albert Flores",
    company: "CEO, Local Startup",
    avatar: "/images/avatars/albert-flores.png",
    type: "large-light",
  },
  {
    quote:
      "Patient safety is non-negotiable. The risk of fraudulent medical credentials has catastrophic consequences. Legacy provides an immutable, instantly verifiable record of a practitioner's qualifications. This is the new standard of trust in healthcare.",
    name: "Dr. Kiril",
    company: "Medical Director, Medina Clinic",
    avatar: "/images/avatars/doctor.png",
    type: "small-dark",
  },
]

const TestimonialCard = ({ quote, name, company, avatar, type }: Testimonial) => {
  const isLarge = type.startsWith("large")
  const avatarSize = isLarge ? 48 : 36
  const padding = isLarge ? "p-6" : "p-[30px]"

  let cardClasses =
    `relative w-full overflow-hidden rounded-[10px] ${padding} ` +
    `shadow-[0_2px_4px_rgba(0,0,0,0.08)] flex flex-col justify-between gap-4`
  let quoteClasses = ""
  let nameClasses = ""
  let companyClasses = ""
  let bg: React.ReactNode = null
  let minH = ""

  if (type === "large-teal") {
    cardClasses += " bg-primary"
    quoteClasses = "text-primary-foreground text-2xl font-medium leading-8"
    nameClasses = "text-primary-foreground text-base font-normal leading-6"
    companyClasses = "text-primary-foreground/60 text-base font-normal leading-6"
    minH = "min-h-[502px]"
    bg = (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[10px] bg-cover bg-center opacity-100"
        style={{ backgroundImage: "url('/images/large-card-background.svg')" }}
      />
    )
  } else if (type === "large-light") {
    cardClasses += " bg-[rgba(231,236,235,0.12)]"
    quoteClasses = "text-foreground text-2xl font-medium leading-8"
    nameClasses = "text-foreground text-base font-normal leading-6"
    companyClasses = "text-muted-foreground text-base font-normal leading-6"
    minH = "min-h-[502px]"
    bg = (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[10px] bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/large-card-background.svg')" }}
      />
    )
  } else {
    cardClasses += " bg-card outline outline-1 outline-border outline-offset-[-1px]"
    quoteClasses = "text-foreground/80 text-[17px] leading-6"
    nameClasses = "text-foreground text-sm leading-[22px]"
    companyClasses = "text-muted-foreground text-sm leading-[22px]"
    minH = "min-h-[244px]"
  }

  return (
    <article className={`${cardClasses} ${minH}`}>
      {bg}
      <blockquote
        className={`relative z-10 break-words ${quoteClasses}`}
        style={{ textWrap: "balance" }}
      >
        {quote}
      </blockquote>

      <footer className="relative z-10 flex items-center gap-3">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={`${name} — ${company}`}
          width={avatarSize}
          height={avatarSize}
          className="rounded-full"
          style={{ width: avatarSize, height: avatarSize, border: "1px solid rgba(255,255,255,0.08)" }}
        />
        <div className="flex flex-col">
          <cite className={nameClasses} style={{ fontStyle: "normal" }}>
            {name}
          </cite>
          <div className={companyClasses}>{company}</div>
        </div>
      </footer>
    </article>
  )
}

export function TestimonialGridSection() {
  // распределяем карточки по колонкам для читаемости и контроля высоты
  const col1 = [testimonials[0], testimonials[1]]
  const col2 = [testimonials[2], testimonials[3], testimonials[4]]
  const col3 = [testimonials[5], testimonials[6]] // добавили healthcare в правую колонку

  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14">
      <div className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-4">
        <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            What Our Users Say
        </h2>
        <p
    className="mx-auto text-center text-muted-foreground text-sm md:text-base font-medium leading- й  "
    style={{ textWrap: "balance" }}
  >
    Hear how students, recruiters, and organizations build trust and showcase achievements with Legacy.
  </p>
  </div>


      <div className="w-full pt-0.5 pb-4 md:pb-10 flex flex-col md:flex-row justify-center items-start gap-4 lg:gap-6 max-w-[1200px] mx-auto">
        <div className="flex-1 flex flex-col gap-4 lg:gap-6">
          {col1.map((t) => <TestimonialCard key={t.quote.slice(0,32)} {...t} />)}
        </div>
        <div className="flex-1 flex flex-col gap-4 lg:gap-6">
          {col2.map((t) => <TestimonialCard key={t.quote.slice(0,32)} {...t} />)}
        </div>
        <div className="flex-1 flex flex-col gap-4 lg:gap-6">
          {col3.map((t) => <TestimonialCard key={t.quote.slice(0,32)} {...t} />)}
        </div>
      </div>
    </section>
  )
}
