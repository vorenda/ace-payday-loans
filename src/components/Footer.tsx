import Link from 'next/link'

interface FooterProps {
  phone?: string
  email?: string
}

export function Footer({ phone = '(800) 555-1234', email = 'support@acepayday.com' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--color-primary-dark)', color: 'white' }} className="pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Brand Column */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="w-10 h-10 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}>A</span>
              <span>Ace Payday Loans</span>
            </Link>
            <p className="text-white/70 mb-4">
              Fast, fair, and transparent payday loans serving California and Texas. Get the cash you need when you need it.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                CA DFPI Licensed
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                TX OCCC Registered
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-display)' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-white/70 hover:text-amber-400 transition-colors">Our Services</Link></li>
              <li><Link href="/locations" className="text-white/70 hover:text-amber-400 transition-colors">Locations</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/apply" className="text-white/70 hover:text-amber-400 transition-colors">Apply Now</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-display)' }}>Locations</h4>
            <ul className="space-y-2">
              <li><Link href="/locations/california" className="text-white/70 hover:text-amber-400 transition-colors">California</Link></li>
              <li><Link href="/locations/california/los-angeles" className="text-white/70 hover:text-amber-400 transition-colors">Los Angeles, CA</Link></li>
              <li><Link href="/locations/california/san-diego" className="text-white/70 hover:text-amber-400 transition-colors">San Diego, CA</Link></li>
              <li><Link href="/locations/texas" className="text-white/70 hover:text-amber-400 transition-colors">Texas</Link></li>
              <li><Link href="/locations/texas/houston" className="text-white/70 hover:text-amber-400 transition-colors">Houston, TX</Link></li>
              <li><Link href="/locations/texas/dallas" className="text-white/70 hover:text-amber-400 transition-colors">Dallas, TX</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-display)' }}>Contact Us</h4>
            <ul className="space-y-2">
              <li><a href={`tel:+1${phone.replace(/\D/g, '')}`} className="text-white/70 hover:text-amber-400 transition-colors">{phone}</a></li>
              <li><a href={`mailto:${email}`} className="text-white/70 hover:text-amber-400 transition-colors">{email}</a></li>
              <li className="text-white/70">Mon-Fri: 8am - 8pm</li>
              <li className="text-white/70">Sat: 9am - 5pm</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="py-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid var(--color-warning)' }}>
            <h4 className="flex items-center gap-2 text-base mb-4" style={{ color: 'var(--color-warning)', fontFamily: 'var(--font-display)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Disclosures
            </h4>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              <strong>APR Disclosure:</strong> The Annual Percentage Rate (APR) is the cost of your loan expressed as a yearly rate. For payday loans, APRs are typically much higher than other forms of credit. In California, the maximum APR for a 14-day, $300 loan is approximately 460%. In Texas, APRs can range from 200% to over 500% depending on loan terms and fees.
            </p>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              <strong>Texas Disclosure:</strong> Ace Payday Loans operates as a Credit Access Business (CAB) in Texas. As a CAB, we do not make loans directly. We arrange for you to obtain credit from an independent third-party lender. CAB fees and lender fees are disclosed separately on your loan agreement.
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              <strong>Loan Responsibility:</strong> Payday loans are intended for short-term financial needs only, not as a long-term financial solution. Customers with credit difficulties should seek credit counseling. Late payments, missed payments, and rollovers may result in additional fees and collection actions.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          <p className="text-sm text-white/60">
            &copy; {currentYear} Ace Payday Loans. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-sm text-white/60 hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-white/60 hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link href="/disclosures" className="text-sm text-white/60 hover:text-amber-400 transition-colors">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
