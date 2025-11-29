import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="space-y-4">
          <p className="text-gray-500">Here are some helpful links:</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn btn--primary"
            >
              Go to Homepage
            </Link>
            <Link
              href="/locations"
              className="btn btn--secondary"
            >
              Find Locations
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Looking for something specific?</p>
            <ul className="mt-2 space-y-1">
              <li><Link href="/services" className="text-primary hover:underline">Our Services</Link></li>
              <li><Link href="/apply" className="text-primary hover:underline">Apply for a Loan</Link></li>
              <li><Link href="/contact" className="text-primary hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
