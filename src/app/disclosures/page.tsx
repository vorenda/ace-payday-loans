import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components'
import { getBusinessProfile, getStateCompliance } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Disclosures - Rates, Fees & State Regulations | Ace Payday Loans',
  description: 'Important disclosures about payday loan rates, fees, and state regulations for California and Texas. Understand the costs before borrowing.',
}

export default function DisclosuresPage() {
  const business = getBusinessProfile()
  const caCompliance = getStateCompliance('CA')
  const txCompliance = getStateCompliance('TX')

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Disclosures', href: '/disclosures' },
        ]}
      />

      <section className="section">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Important Disclosures
          </h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Important Warning
            </h2>
            <p className="text-gray-700">
              Payday loans are high-cost, short-term loans intended for temporary cash-flow needs. They are not
              suitable for long-term financial solutions. Before taking out a payday loan, consider alternatives
              such as personal loans, credit union loans, payment plans with creditors, or non-profit credit counseling.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* About Our Business */}
            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              About {business.businessName}
            </h2>
            <p className="text-gray-600 mb-6">
              {business.businessName} is a licensed lender in California and a registered Credit Access Business
              (CAB) in Texas. Our business model differs by state:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>California:</strong> We make loans directly to consumers under the California Deferred Deposit Transaction Law (CDDTL).</li>
              <li><strong>Texas:</strong> We operate as a Credit Access Business, arranging loans between consumers and third-party lenders. We charge fees for our services in addition to interest charged by the lender.</li>
            </ul>

            {/* California Disclosures */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                California Disclosures
              </h2>

              <h3 className="text-lg font-bold mb-3">Loan Terms</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li><strong>Maximum Loan Amount:</strong> $300</li>
                <li><strong>Maximum Fee:</strong> 15% of the loan amount ($45 on a $300 loan)</li>
                <li><strong>Loan Term:</strong> 14-31 days</li>
                <li><strong>APR:</strong> Approximately 426-460% on a 14-day loan (APR reflects the short-term nature of the loan)</li>
              </ul>

              <h3 className="text-lg font-bold mb-3">Example Loan Cost</h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Loan Amount</td>
                      <td className="py-2 text-right font-medium">$300.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Finance Charge (15%)</td>
                      <td className="py-2 text-right font-medium">$45.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Total of Payments</td>
                      <td className="py-2 text-right font-medium">$345.00</td>
                    </tr>
                    <tr>
                      <td className="py-2">APR (14-day term)</td>
                      <td className="py-2 text-right font-medium">391%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-bold mb-3">Important Information</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                {caCompliance?.cityPageContent.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mb-3">Regulatory Information</h3>
              <p className="text-gray-600 mb-2">
                We are licensed by the California Department of Financial Protection and Innovation (DFPI).
              </p>
              <p className="text-gray-600 mb-4">
                <strong>DFPI Consumer Helpline:</strong> 1-866-275-2677<br />
                <strong>Website:</strong>{' '}
                <a href="https://dfpi.ca.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  dfpi.ca.gov
                </a>
              </p>
            </div>

            {/* Texas Disclosures */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Texas Disclosures
              </h2>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-gray-700 text-sm">
                  <strong>Important:</strong> Texas payday loans can have very high costs. A typical $300 loan
                  can cost over $1,000 in fees, resulting in an APR exceeding 700%. Please carefully consider
                  whether you can afford to repay the loan before borrowing.
                </p>
              </div>

              <h3 className="text-lg font-bold mb-3">How Texas Loans Work</h3>
              <p className="text-gray-600 mb-4">
                In Texas, we operate as a Credit Access Business (CAB). This means we arrange loans with
                third-party lenders. You will pay interest to the lender AND fees to us for our services.
                The total cost includes both components.
              </p>

              <h3 className="text-lg font-bold mb-3">Example Loan Cost</h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Loan Amount</td>
                      <td className="py-2 text-right font-medium">$300.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Interest to Lender (168 days at 10%)</td>
                      <td className="py-2 text-right font-medium">$13.81</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">CAB Fees (typical)</td>
                      <td className="py-2 text-right font-medium">$1,008.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Total of Payments</td>
                      <td className="py-2 text-right font-medium">$1,321.81</td>
                    </tr>
                    <tr>
                      <td className="py-2">Effective APR</td>
                      <td className="py-2 text-right font-medium">730%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-bold mb-3">Your Rights in Texas</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                {txCompliance?.cityPageContent.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mb-3">City Ordinances</h3>
              <p className="text-gray-600 mb-4">
                Some Texas cities have additional protections that limit loan amounts to 20% of your gross
                monthly income and restrict rollovers. Cities with ordinances include Austin, Dallas, Houston,
                San Antonio, Fort Worth, El Paso, and others.
              </p>

              <h3 className="text-lg font-bold mb-3">Regulatory Information</h3>
              <p className="text-gray-600 mb-2">
                We are registered with the Texas Office of Consumer Credit Commissioner (OCCC).
              </p>
              <p className="text-gray-600 mb-4">
                <strong>OCCC Consumer Helpline:</strong> (800) 538-1579<br />
                <strong>Website:</strong>{' '}
                <a href="https://occc.texas.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  occc.texas.gov
                </a>
              </p>
            </div>

            {/* General Disclosures */}
            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              General Information
            </h2>

            <h3 className="text-lg font-bold mb-3">No Prepayment Penalty</h3>
            <p className="text-gray-600 mb-6">
              You can pay off your loan early without any prepayment penalty and may save on interest charges.
            </p>

            <h3 className="text-lg font-bold mb-3">Credit Reporting</h3>
            <p className="text-gray-600 mb-6">
              We may report loan information to consumer reporting agencies. Late payments, missed payments,
              or defaults may be reported and could negatively impact your credit score.
            </p>

            <h3 className="text-lg font-bold mb-3">Collection Practices</h3>
            <p className="text-gray-600 mb-6">
              If you fail to repay your loan, we may engage in collection activities. We do not pursue criminal
              prosecution for non-payment (except in cases of fraud). In Texas, your wages cannot be garnished
              for payday loan debt, and your homestead is protected from debt collection.
            </p>

            <h3 className="text-lg font-bold mb-3">Military Lending Act</h3>
            <p className="text-gray-600 mb-6">
              Special protections apply to active duty military members and their dependents under the Military
              Lending Act (MLA). The MLA caps the Military Annual Percentage Rate (MAPR) at 36% for covered
              borrowers. We comply with all MLA requirements.
            </p>

            <h3 className="text-lg font-bold mb-3">Alternatives to Payday Loans</h3>
            <p className="text-gray-600 mb-4">Before taking out a payday loan, consider these alternatives:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Credit union payday alternative loans (PALs)</li>
              <li>Personal loans from banks or online lenders</li>
              <li>Payment plans with your creditors</li>
              <li>Local community assistance programs</li>
              <li>Non-profit credit counseling (NFCC: 1-800-388-2227)</li>
              <li>Borrowing from family or friends</li>
              <li>Credit card cash advance (often cheaper than payday loans)</li>
            </ul>

            {/* Contact */}
            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Questions?
            </h2>
            <p className="text-gray-600 mb-4">
              If you have questions about our disclosures or loan terms, please contact us:
            </p>
            <ul className="list-none text-gray-600 space-y-1 mb-6">
              <li><strong>Phone:</strong> {business.contact.tollFree}</li>
              <li><strong>Email:</strong> {business.contact.supportEmail}</li>
            </ul>

            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-gray-500">
                This disclosure is provided for informational purposes only and does not constitute legal or
                financial advice. Actual loan terms will be provided before you accept a loan. Please review
                all loan documents carefully.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/apply" className="btn btn--primary">
              Apply Now
            </Link>
            <Link href="/contact" className="btn btn--secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
