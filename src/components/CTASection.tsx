import Link from 'next/link'

interface CTASectionProps {
  headline?: string
  subheadline?: string
  primaryCtaText?: string
  primaryCtaHref?: string
  phone?: string
}

export function CTASection({
  headline = 'Ready to Get Started?',
  subheadline = 'Apply now and get the cash you need. Fast approval, same-day funding available.',
  primaryCtaText = 'Apply Now - Takes 5 Minutes',
  primaryCtaHref = '/apply',
  phone = '(800) 555-1234',
}: CTASectionProps) {
  const phoneHref = `tel:+1${phone.replace(/\D/g, '')}`

  return (
    <section className="section section--primary relative overflow-hidden">
      <div className="absolute -top-1/2 -right-1/5 w-[600px] h-[600px] bg-gradient-radial from-amber-400/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {headline}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href={primaryCtaHref} className="btn btn--primary btn--large">
              {primaryCtaText}
            </Link>
            <a href={phoneHref} className="btn btn--large" style={{ background: 'transparent', color: 'white', border: '2px solid white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xl text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Or call us at{' '}
            <a href={phoneHref} className="font-bold hover:underline" style={{ color: 'var(--color-accent-light)' }}>
              {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
