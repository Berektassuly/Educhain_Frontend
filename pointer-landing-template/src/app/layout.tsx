import type { Metadata } from 'next'
import {
  ClerkProvider
} from '@clerk/nextjs'

import { Geist, Geist_Mono } from 'next/font/google'
import '@/shared/styles/globals.css'
import { ThemeProvider } from '@/core/theme/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: 'Legacy',
  description: 'Built for Solana Day Hackathon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
