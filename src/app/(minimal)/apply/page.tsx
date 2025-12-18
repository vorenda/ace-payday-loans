import { Metadata } from 'next'
import Link from 'next/link'
import { ApplyWizard } from '@/components/ApplyWizard'

export const metadata: Metadata = {
  title: 'Apply Now - Get Cash Fast | Ace Payday Loans',
  description: 'Apply for a payday loan online in minutes. Fast approval, same-day funding available.',
}

export default function ApplyPage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f8f9fa' }}>
      {/* Minimal Header - Logo Only */}
      <header className="py-6 px-4" style={{ background: 'white', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            <span className="logo-icon">A</span>
            <span>Ace Payday Loans</span>
          </Link>
        </div>
      </header>

      {/* Form Section */}
      <main className="flex-1 py-8 px-4">
        <ApplyWizard />
      </main>

      {/* Minimal Footer - Disclosures Only */}
      <footer style={{ background: 'var(--color-primary-dark)', color: 'white' }}>
        {/* Disclaimer Section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
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
        <div className="border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
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
    </div>
  )
}
