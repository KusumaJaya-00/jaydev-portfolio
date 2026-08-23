import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/toast'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex',
  weight: ['400', '500', '600', '700'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jaydev.my.id'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kusjay | Full-Stack Developer',
    template: '%s | Kusjay',
  },
  description: 'Kusjay — Full-Stack Developer specializing in modern web applications. View my projects, blog posts, and get in touch.',
  keywords: ['full-stack developer', 'web developer', 'portfolio', 'next.js', 'react'],
  authors: [{ name: 'Kusjay' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Kusjay Portfolio',
    description: 'Full-Stack Developer specializing in modern web applications.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#06070A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased dot-grid">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
