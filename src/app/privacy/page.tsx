import { Metadata } from 'next'
import { Breadcrumbs } from '@/components'
import { getBusinessProfile } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Privacy Policy | Ace Payday Loans',
  description: 'Read our privacy policy to understand how Ace Payday Loans collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  const business = getBusinessProfile()

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy', href: '/privacy' },
        ]}
      />

      <section className="section">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: January 2025
            </p>

            <p className="text-gray-600 mb-6">
              {business.businessName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Personal Information:</strong> Name, address, email, phone number, date of birth, Social Security Number</li>
              <li><strong>Financial Information:</strong> Bank account details, employment information, income verification</li>
              <li><strong>Device Information:</strong> IP address, browser type, device identifiers</li>
              <li><strong>Usage Information:</strong> Pages visited, time spent on site, click patterns</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Process loan applications and verify eligibility</li>
              <li>Service your loan account and communicate with you</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Prevent fraud and ensure security</li>
              <li>Improve our products and services</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Information Sharing
            </h2>
            <p className="text-gray-600 mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Third-party lenders:</strong> In Texas, we operate as a Credit Access Business and share information with our lending partners</li>
              <li><strong>Service providers:</strong> Companies that help us process applications, verify information, or service accounts</li>
              <li><strong>Credit bureaus:</strong> For credit reporting purposes</li>
              <li><strong>Regulatory authorities:</strong> As required by law</li>
              <li><strong>Affiliates:</strong> Companies under common ownership</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Data Security
            </h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information,
              including 256-bit SSL encryption for data transmission, secure data storage, access controls, and
              regular security assessments.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">Depending on your state of residence, you may have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of certain data sharing</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              California Privacy Rights (CCPA)
            </h2>
            <p className="text-gray-600 mb-6">
              California residents have additional rights under the California Consumer Privacy Act (CCPA),
              including the right to know what personal information we collect and how it is used, the right
              to delete personal information, and the right to opt out of the sale of personal information.
              We do not sell personal information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 mb-6">
              We use cookies and similar technologies to enhance your experience, analyze usage, and assist
              in our marketing efforts. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Changes to This Policy
            </h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Contact Us
            </h2>
            <p className="text-gray-600 mb-2">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul className="list-none text-gray-600 space-y-1 mb-6">
              <li><strong>Phone:</strong> {business.contact.tollFree}</li>
              <li><strong>Email:</strong> {business.contact.supportEmail}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
