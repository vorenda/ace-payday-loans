import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Ace Payday Loans',
  description: 'Fast cash when you need it.',
}

export default function MinimalLayout({
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
        {children}
      </body>
    </html>
  )
}
