import { Metadata } from 'next'
import { Breadcrumbs } from '@/components'
import { LmsForm } from '@/components/LmsForm'
import { getBusinessProfile } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Get Your Free Loan Quote - Secured Debt Agreement | Ace Payday Loans',
  description: 'Get a free loan quote in minutes. Fast approval, competitive rates, and flexible terms. Complete our secure form to see what you qualify for.',
}

export default function SDAPage() {
  const business = getBusinessProfile()

  // Handle different business profile structures safely
  const businessAny = business as unknown as Record<string, unknown>
  const contactAny = businessAny.contact as Record<string, unknown> || {}
  const phoneAny = contactAny.phone as Record<string, string> || {}
  const availabilityAny = businessAny.availability as Record<string, string> || {}

  const tollFreePhone = phoneAny.tollFree || (contactAny.tollFree as string) || '1-888-888-8888'
  const hours = ((contactAny.hours as Record<string, string>)?.weekdays) || availabilityAny.standardHours || 'Mon-Fri 9am-7pm'

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Get a Quote', href: '/sda' },
        ]}
      />

      {/* Hero */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Get Your Free Loan Quote
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Complete our quick form to see what you qualify for. Fast approval and competitive rates available.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Request Your Quote
                </h2>

                <LmsForm />

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By submitting, you agree to receive loan quotes and information. No obligation to accept.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Trust Signals */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Why Get a Quote?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Free with no obligation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">See rates instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Compare loan options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Secure 256-bit encryption</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">State licensed lender</span>
                  </li>
                </ul>
              </div>

              {/* Need Help */}
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Need Help?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Our team is ready to assist you with your quote request.
                </p>
                <a
                  href={`tel:${tollFreePhone.replace(/\D/g, '')}`}
                  className="btn w-full flex items-center justify-center gap-2"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {tollFreePhone}
                </a>
                <p className="text-white/60 text-xs mt-2 text-center">
                  {hours}
                </p>
              </div>

              {/* What We Offer */}
              <div className="bg-gray-50 rounded-2xl p-6 mt-6">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Loan Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Competitive interest rates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Flexible repayment terms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Quick approval process
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Transparent fees and terms
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <p className="text-xs text-gray-500">
            <strong>Important Disclosure:</strong> Ace Payday Loans is a licensed lender in California (DFPI License #XXXXXXX)
            and a registered Credit Access Business in Texas (OCCC License #XXXXXXX). Loan amounts, fees, and terms vary by state
            and individual qualifications. By requesting a quote, you are not obligated to accept any loan offer. Quotes are subject
            to approval and verification. APRs for payday loans can range from 200% to 700% depending on the loan amount and term.
            Please review all disclosures carefully before accepting a loan. Not all applicants will qualify.
          </p>
        </div>
      </section>
    </div>
  )
}
