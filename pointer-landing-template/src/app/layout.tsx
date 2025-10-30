import type { Metadata } from 'next'
import {
  ClerkProvider
} from '@clerk/nextjs'
import { dark } from '@clerk/themes';

import { Geist, Geist_Mono } from 'next/font/google'
import '@/shared/styles/globals.css'
import { ThemeProvider } from '@/core/theme/theme-provider'
import { Providers } from '@/core/providers'
import { Toaster } from '@/shared/components/ui/toaster';

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
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Providers>{children}</Providers>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
