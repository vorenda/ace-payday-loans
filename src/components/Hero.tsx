import Link from 'next/link'

interface HeroProps {
  headline: string
  highlightText?: string
  subheadline: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  phone?: string
  stats?: Array<{
    value: string
    label: string
  }>
  badges?: string[]
}

export function Hero({
  headline,
  highlightText,
  subheadline,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  phone,
  stats,
  badges = ['State Licensed', 'Secure & Encrypted', 'BBB Accredited'],
}: HeroProps) {
  const phoneHref = phone ? `tel:+1${phone.replace(/\D/g, '')}` : undefined

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(212, 168, 83, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(13, 79, 79, 0.05) 0%, transparent 50%), linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%)' }}>
      <div className="hero-pattern absolute inset-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fast Approval - Same Day Cash
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {highlightText ? (
                <>
                  {headline.split(highlightText)[0]}
                  <span className="highlight">{highlightText}</span>
                  {headline.split(highlightText)[1]}
                </>
              ) : headline}
            </h1>

            <p className="text-xl mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--color-text-secondary)' }}>
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href={primaryCtaHref} className="btn btn--primary btn--large">
                {primaryCtaText}
              </Link>
              {secondaryCtaText && secondaryCtaHref && (
                <a href={phoneHref || secondaryCtaHref} className="btn btn--secondary btn--large">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {secondaryCtaText}
                </a>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start py-6">
              {badges.map((badge, index) => (
                <div key={index} className={`trust-badge ${index === 2 ? 'trust-badge--gold' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                    {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
                  </svg>
                  {badge}
                </div>
              ))}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hero Card */}
          <div className="hidden lg:block">
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-md ml-auto">
              <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full opacity-20" style={{ background: 'var(--color-accent)' }}></div>

              <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>Quick Cash Quote</div>
                  <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>See what you qualify for</div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Loan Amount Up To</div>
                <div className="text-5xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>$1,500</div>
              </div>

              <div className="flex justify-between p-4 rounded-lg mb-6" style={{ background: 'var(--color-background-alt)' }}>
                <div className="text-center">
                  <div className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>Same Day</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Funding</div>
                </div>
                <div className="text-center">
                  <div className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>2-4 Weeks</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Loan Term</div>
                </div>
              </div>

              <Link href="/apply" className="btn btn--primary w-full">
                Check Your Rate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
