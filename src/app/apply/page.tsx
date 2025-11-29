import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components'
import { getBusinessProfile, getAllServices } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Apply Now - Get Cash Fast | Ace Payday Loans',
  description: 'Apply for a payday loan online in minutes. Fast approval, same-day funding available. Secure application for California and Texas residents.',
}

export default function ApplyPage() {
  const business = getBusinessProfile()
  const services = getAllServices()

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
          { label: 'Apply Now', href: '/apply' },
        ]}
      />

      {/* Hero */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Apply for a Loan
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Complete your application in minutes. Fast approval and same-day funding available.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Start Your Application
                </h2>

                <form className="space-y-6">
                  {/* Loan Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">What type of loan do you need?</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <option value="">Select a loan type</option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.slug}>{service.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Desired Loan Amount</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <option value="">Select amount</option>
                      <option value="100">$100</option>
                      <option value="200">$200</option>
                      <option value="300">$300</option>
                      <option value="500">$500</option>
                      <option value="750">$750</option>
                      <option value="1000">$1,000</option>
                      <option value="1500">$1,500+</option>
                    </select>
                  </div>

                  {/* Personal Info */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Street Address</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2">City</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Los Angeles"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State</label>
                          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                            <option value="">State</option>
                            <option value="CA">California</option>
                            <option value="TX">Texas</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">ZIP Code</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="90001"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Employment */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">Employment Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Employment Status</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                          <option value="">Select status</option>
                          <option value="employed">Employed Full-Time</option>
                          <option value="part-time">Employed Part-Time</option>
                          <option value="self-employed">Self-Employed</option>
                          <option value="benefits">Receiving Benefits</option>
                          <option value="retired">Retired</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Monthly Income (Before Taxes)</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="$3,000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Pay Frequency</label>
                          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                            <option value="">Select frequency</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Bi-Weekly</option>
                            <option value="semimonthly">Semi-Monthly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="border-t pt-6">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" required />
                      <span className="text-sm text-gray-600">
                        I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. I consent to receive
                        communications regarding my loan application.
                      </span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn--primary btn--large w-full">
                    Submit Application
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By submitting, you agree to a soft credit check which does not affect your credit score.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Trust Signals */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Why Apply With Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Fast approval in minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Same-day funding available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">No hidden fees</span>
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
                  Our team is ready to assist you with your application.
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

              {/* What You Need */}
              <div className="bg-gray-50 rounded-2xl p-6 mt-6">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>What You&apos;ll Need</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Valid government-issued ID
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Proof of income (pay stubs)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Active checking account
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    Working phone number
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
            and a registered Credit Access Business in Texas (OCCC License #XXXXXXX). Loan amounts, fees, and terms vary by state.
            California loans are made pursuant to the California Deferred Deposit Transaction Law. Texas loans are arranged through
            our credit access business with third-party lenders. APRs for payday loans can range from 200% to 700% depending on the
            loan amount and term. Please review all disclosures carefully before accepting a loan. Not all applicants will qualify.
          </p>
        </div>
      </section>
    </div>
  )
}
