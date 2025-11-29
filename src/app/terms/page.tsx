import { Metadata } from 'next'
import { Breadcrumbs } from '@/components'
import { getBusinessProfile } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Terms of Service | Ace Payday Loans',
  description: 'Read the terms of service for Ace Payday Loans website and services. Understand your rights and responsibilities.',
}

export default function TermsPage() {
  const business = getBusinessProfile()

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service', href: '/terms' },
        ]}
      />

      <section className="section">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: January 2025
            </p>

            <p className="text-gray-600 mb-6">
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using the {business.businessName}
              website and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              1. Services Description
            </h2>
            <p className="text-gray-600 mb-6">
              {business.businessName} provides short-term lending services including payday loans, cash advances,
              and related financial products. In California, we operate as a licensed lender under the California
              Deferred Deposit Transaction Law. In Texas, we operate as a licensed Credit Access Business (CAB),
              arranging loans between borrowers and third-party lenders.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              2. Eligibility
            </h2>
            <p className="text-gray-600 mb-4">To use our services, you must:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Be at least 18 years of age</li>
              <li>Be a resident of California or Texas</li>
              <li>Have a valid government-issued ID</li>
              <li>Have a steady source of income</li>
              <li>Have an active checking account</li>
              <li>Not be on active military duty (additional restrictions apply under MLA)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              3. Loan Terms and Conditions
            </h2>
            <p className="text-gray-600 mb-6">
              Specific loan terms, including interest rates, fees, payment schedules, and total cost of the loan,
              will be provided to you before you accept any loan. You should carefully review all loan documents
              before signing. Loan terms vary by state and are subject to state regulations.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              4. Application and Verification
            </h2>
            <p className="text-gray-600 mb-6">
              By submitting an application, you authorize us to verify the information you provide, including
              employment, income, and banking information. We may obtain consumer reports from credit bureaus.
              Submitting an application does not guarantee loan approval.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              5. Electronic Communications
            </h2>
            <p className="text-gray-600 mb-6">
              By using our services, you consent to receive electronic communications from us, including emails,
              text messages, and electronic documents. You agree that all agreements, notices, and disclosures
              provided electronically satisfy any legal requirement that such communications be in writing.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              6. Repayment Obligations
            </h2>
            <p className="text-gray-600 mb-6">
              You agree to repay any loan according to the terms specified in your loan agreement. Failure to
              repay may result in additional fees, collection activities, and reporting to credit bureaus.
              We do not pursue criminal charges for non-payment (except in cases of fraud).
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              7. Intellectual Property
            </h2>
            <p className="text-gray-600 mb-6">
              All content on this website, including text, graphics, logos, and software, is the property of
              {business.businessName} or its licensors and is protected by intellectual property laws. You may
              not reproduce, modify, or distribute our content without permission.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-6">
              To the maximum extent permitted by law, {business.businessName} shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use of
              our website or services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              9. Dispute Resolution
            </h2>
            <p className="text-gray-600 mb-6">
              Any disputes arising from these Terms or your use of our services will be resolved through
              binding arbitration in accordance with the rules of the American Arbitration Association.
              You agree to waive any right to participate in class action lawsuits.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              10. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting
              to our website. Your continued use of our services after changes are posted constitutes acceptance
              of the modified Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              11. Governing Law
            </h2>
            <p className="text-gray-600 mb-6">
              These Terms are governed by the laws of the state in which you reside (California or Texas),
              without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              12. Contact Information
            </h2>
            <p className="text-gray-600 mb-2">
              If you have questions about these Terms, please contact us:
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
