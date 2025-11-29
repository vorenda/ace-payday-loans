import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs, ContactForm } from '@/components'
import { getBusinessProfile, getAllStates } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contact Us - Ace Payday Loans | Get Help Today',
  description: 'Contact Ace Payday Loans for questions about payday loans, applications, or account inquiries. Call us toll-free, email, or visit a location near you.',
}

export default function ContactPage() {
  const business = getBusinessProfile()
  const states = getAllStates()

  // Handle different business profile structures safely
  const businessAny = business as unknown as Record<string, unknown>
  const contactAny = businessAny.contact as Record<string, unknown> || {}
  const phoneAny = contactAny.phone as Record<string, string> || {}
  const availabilityAny = businessAny.availability as Record<string, string> || {}

  const tollFreePhone = phoneAny.tollFree || (contactAny.tollFree as string) || '1-888-888-8888'
  const californiaPhone = phoneAny.california || (contactAny.california as string) || '(619) 555-CASH'
  const texasPhone = phoneAny.texas || (contactAny.texas as string) || '(713) 555-LOAN'
  const email = (contactAny.email as string) || 'info@acepaydayloans.com'
  const supportEmail = (contactAny.supportEmail as string) || email
  const hoursWeekdays = ((contactAny.hours as Record<string, string>)?.weekdays) || availabilityAny.standardHours || 'Mon-Fri 9am-7pm'
  const hoursSaturday = ((contactAny.hours as Record<string, string>)?.saturday) || 'Sat 10am-4pm'
  const hoursSunday = ((contactAny.hours as Record<string, string>)?.sunday) || 'Closed'

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact' },
        ]}
      />

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Reach out by phone, email, or visit one of our locations.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Call Us</h3>
              <p className="text-gray-600 mb-4">Speak with a representative now</p>
              <a
                href={`tel:${tollFreePhone.replace(/\D/g, '')}`}
                className="text-2xl font-bold text-primary hover:underline"
              >
                {tollFreePhone}
              </a>
              <p className="text-sm text-gray-500 mt-2">{hoursWeekdays}</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Email Us</h3>
              <p className="text-gray-600 mb-4">We&apos;ll respond within 24 hours</p>
              <a
                href={`mailto:${supportEmail}`}
                className="text-lg font-bold text-primary hover:underline"
              >
                {supportEmail}
              </a>
              <p className="text-sm text-gray-500 mt-2">For support inquiries</p>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Visit Us</h3>
              <p className="text-gray-600 mb-4">Find a location near you</p>
              <Link href="/locations" className="btn btn--primary">
                Find Locations
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
                For immediate assistance, please call our toll-free number.
              </p>
              <ContactForm />
            </div>

            <div>
              {/* State-Specific Contacts */}
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                State Offices
              </h2>

              <div className="space-y-6">
                {states.map((state) => (
                  <div key={state.slug} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {state.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4" style={{ color: 'var(--color-primary)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a
                          href={`tel:${(state.abbreviation === 'CA' ? californiaPhone : texasPhone).replace(/\D/g, '')}`}
                          className="text-primary hover:underline"
                        >
                          {state.abbreviation === 'CA' ? californiaPhone : texasPhone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4" style={{ color: 'var(--color-primary)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="text-gray-600">{state.cities.length} locations</span>
                      </div>
                    </div>
                    <Link
                      href={`/locations/${state.slug}`}
                      className="inline-flex items-center gap-1 mt-3 text-primary text-sm hover:underline"
                    >
                      View {state.name} locations
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="mt-6 bg-primary rounded-xl p-6 text-white">
                <h3 className="font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Hours of Operation</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">Monday - Friday</span>
                    <span>{hoursWeekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Saturday</span>
                    <span>{hoursSaturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Sunday</span>
                    <span>{hoursSunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="section section--alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Have More Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Check our frequently asked questions for quick answers to common inquiries.
          </p>
          <Link href="/#faq" className="btn btn--secondary">
            View FAQ
          </Link>
        </div>
      </section>
    </div>
  )
}
