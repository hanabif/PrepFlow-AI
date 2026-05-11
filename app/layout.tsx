import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'PrepFlow - AI-Powered Interview Preparation',
  description: 'Master your next interview with AI-powered mock interviews, instant feedback, and performance analytics. Practice technical, behavioral, and system design interviews.',
  keywords: ['interview preparation', 'AI mock interview', 'technical interview', 'coding interview', 'software engineering'],
  authors: [{ name: 'PrepFlow' }],
  openGraph: {
    title: 'PrepFlow - AI-Powered Interview Preparation',
    description: 'Master your next interview with AI-powered mock interviews, instant feedback, and performance analytics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrepFlow - AI-Powered Interview Preparation',
    description: 'Master your next interview with AI-powered mock interviews, instant feedback, and performance analytics.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
