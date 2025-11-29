import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs, CTASection } from '@/components'
import { getBusinessProfile, getAllStates } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Us - Ace Payday Loans | Trusted Since 2010',
  description: 'Learn about Ace Payday Loans - a trusted payday loan provider serving California and Texas since 2010. State licensed, BBB accredited, and committed to transparent lending.',
}

export default function AboutPage() {
  const business = getBusinessProfile()
  const states = getAllStates()
  const totalCities = states.reduce((acc, state) => acc + state.cities.length, 0)

  // Handle different business profile structures safely
  const businessAny = business as unknown as Record<string, unknown>
  const contactAny = businessAny.contact as Record<string, unknown> || {}
  const phoneAny = contactAny.phone as Record<string, string> || {}
  const statsAny = businessAny.stats as Record<string, unknown> || {}
  const availabilityAny = businessAny.availability as Record<string, string> || {}

  const tollFreePhone = phoneAny.tollFree || (contactAny.tollFree as string) || '1-888-888-8888'
  const email = (contactAny.email as string) || 'info@acepaydayloans.com'
  const yearEstablished = (businessAny.yearEstablished as string) || (businessAny.established as string) || '2015'
  const yearsInBusiness = (statsAny.yearsInBusiness as number) || parseInt(yearEstablished) ? new Date().getFullYear() - parseInt(yearEstablished as string) : 9
  const customersServed = (statsAny.customersServed as string) || '50,000+'
  const averageRating = (statsAny.customerSatisfactionRate as string) || (statsAny.averageRating as number)?.toString() || '4.6/5'
  const hoursWeekdays = ((contactAny.hours as Record<string, string>)?.weekdays) || availabilityAny.standardHours || 'Mon-Fri 9am-7pm'
  const hoursSaturday = ((contactAny.hours as Record<string, string>)?.saturday) || 'Sat 10am-4pm'
  const hoursSunday = ((contactAny.hours as Record<string, string>)?.sunday) || 'Closed'
  const trustSignals = (businessAny.trustSignals as string[]) || (businessAny.uniqueSellingPoints as string[])?.slice(0, 4) || [
    'State Licensed Lender',
    'BBB Accredited',
    'CFSA Member',
    'Secure & Private'
  ]

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
        ]}
      />

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            About {business.businessName}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {business.tagline}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Serving Communities Since {yearEstablished}</h2>
              <p className="text-gray-600 mb-6">
                {business.description}
              </p>
              <p className="text-gray-600 mb-6">
                We understand that unexpected expenses can happen to anyone. A car repair, medical bill,
                or utility payment can put a strain on your budget. That&apos;s why we&apos;ve built a simple,
                transparent process to help you get the cash you need quickly.
              </p>
              <p className="text-gray-600">
                Today, we serve {totalCities} communities across California and Texas, maintaining the
                same commitment to honest, responsible lending that we started with.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary rounded-2xl p-6 text-center text-white">
                <span className="text-4xl font-bold block mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {yearsInBusiness}+
                </span>
                <span className="text-white/80">Years in Business</span>
              </div>
              <div className="bg-accent rounded-2xl p-6 text-center">
                <span className="text-4xl font-bold block mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {customersServed}
                </span>
                <span className="text-gray-600">Customers Served</span>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6 text-center">
                <span className="text-4xl font-bold block mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                  {totalCities}
                </span>
                <span className="text-gray-600">Locations</span>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6 text-center">
                <span className="text-4xl font-bold block mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                  {averageRating}
                </span>
                <span className="text-gray-600">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section section--alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Transparency</h3>
              <p className="text-gray-600 mb-0">
                All fees and terms are disclosed upfront. No hidden charges, no surprises. You&apos;ll know
                exactly what you&apos;re paying before you sign anything.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Integrity</h3>
              <p className="text-gray-600 mb-0">
                We follow all state and federal regulations. Our staff treats every customer with
                respect and dignity, regardless of their financial situation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Community</h3>
              <p className="text-gray-600 mb-0">
                We&apos;re part of the communities we serve. Our local staff understands local needs
                and regulations, providing personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Licensed & Accredited</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map((signal, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-success)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p className="font-medium text-sm">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section section--alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Contact Us
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Toll-Free</p>
                      <a href={`tel:${tollFreePhone.replace(/\D/g, '')}`} className="text-primary hover:underline">
                        {tollFreePhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${email}`} className="text-primary hover:underline">
                        {email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Hours of Operation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">{hoursWeekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">{hoursSaturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">{hoursSunday}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Online applications are available 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations CTA */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Find a Location Near You
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            With {totalCities} locations across California and Texas, there&apos;s an Ace Payday Loans branch nearby.
          </p>
          <Link href="/locations" className="btn btn--primary">
            View All Locations
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
