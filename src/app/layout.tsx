import type { Metadata } from 'next'
import { Header, Footer } from '@/components'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ace Payday Loans | Fast Cash Same Day | California & Texas',
  description: 'Ace Payday Loans - Fast cash when you need it. Apply online in minutes, get approved same day. Serving California and Texas with trusted payday loan services.',
  keywords: 'payday loans, cash advance, same day loans, online loans, California loans, Texas loans',
  openGraph: {
    title: 'Ace Payday Loans | Fast Cash Same Day',
    description: 'Apply online in minutes, get approved same day. Serving California and Texas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;700&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>"
        />
      </head>
      <body>
        <Header phone="(800) 555-1234" />
        <main>{children}</main>
        <Footer phone="(800) 555-1234" email="support@acepayday.com" />

        {/* Mobile Sticky CTA */}
        <div className="mobile-sticky-cta">
          <a href="tel:+18005551234" className="btn btn--phone flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </a>
          <a href="/apply" className="btn btn--primary flex-1">Apply Now</a>
        </div>
      </body>
    </html>
  )
}
