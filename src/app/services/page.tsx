import { Metadata } from 'next'
import { Breadcrumbs, ServiceCard, CTASection } from '@/components'
import { getAllServices } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Our Services - Payday Loans & Cash Advances | Ace Payday Loans',
  description: 'Explore our payday loan services including cash advances, installment loans, title loans, check cashing, and more. Fast approval, same-day funding available.',
}

export default function ServicesPage() {
  const services = getAllServices()

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
      />

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Our Financial Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We offer a range of short-term lending solutions to help you through unexpected financial challenges.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                name={service.name}
                slug={service.slug}
                description={service.shortDescription}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="section section--alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Benefits of Our Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Fast Approval</h3>
              <p className="text-gray-600 mb-0">Get approved in minutes, not days. Most applications are processed within hours.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Transparent Fees</h3>
              <p className="text-gray-600 mb-0">All costs are disclosed upfront. No hidden fees or surprise charges.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>State Licensed</h3>
              <p className="text-gray-600 mb-0">We&apos;re fully licensed and regulated in California and Texas.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
