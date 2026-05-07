import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
}

export const metadata: Metadata = {
  title: 'NodeMaster — Node.js Mastery in Hinglish',
  description:
    'Node.js ko deeply samjho — architecture se leke production deployment tak. 23 chapters of in-depth Hinglish content for developers who want to truly master Node.js.',
  keywords: [
    'Node.js',
    'JavaScript',
    'Backend development',
    'Hinglish',
    'Event loop',
    'Express.js',
    'REST API',
    'Node.js tutorial',
    'Web development',
    'Learn Node.js',
  ],
  authors: [{ name: 'NodeMaster' }],
  creator: 'NodeMaster',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nodemaster.dev',
    title: 'NodeMaster — Node.js Mastery in Hinglish',
    description:
      'Node.js ko deeply samjho — architecture se leke production deployment tak. 23 chapters, interactive visualizations, playground aur zyada.',
    siteName: 'NodeMaster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NodeMaster — Node.js Mastery in Hinglish',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NodeMaster — Node.js Mastery in Hinglish',
    description:
      'Node.js ko deeply samjho — 23 chapters, interactive visualizations, aur playground.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <div className="dark min-h-screen flex flex-col bg-[#0A0A0F] text-[#F5F5F7]">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
