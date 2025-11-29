'use client'

import { useState } from 'react'

interface ContactFormProps {
  locationId?: string
}

export function ContactForm({ locationId }: ContactFormProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('success')
  }

  if (formState === 'success') {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(45, 138, 94, 0.1)', color: 'var(--color-success)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Application Received!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for your application. Our team will review your information and contact you shortly.
        </p>
        <p className="text-sm text-gray-500">
          Expected response time: Within 1 hour during business hours
        </p>
      </div>
    )
  }

  return (
    <div id="apply" className="bg-white rounded-3xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>Quick Application</h3>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="locationId" value={locationId || ''} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input type="text" id="firstName" name="firstName" required placeholder="John" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input type="text" id="lastName" name="lastName" required placeholder="Smith" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" required placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input type="tel" id="phone" name="phone" required placeholder="(555) 555-5555" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select id="state" name="state" required>
              <option value="">Select your state...</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="loanAmount">Desired Loan Amount</label>
            <select id="loanAmount" name="loanAmount">
              <option value="">Select amount...</option>
              <option value="100-300">$100 - $300</option>
              <option value="300-500">$300 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000+">$1,000+</option>
            </select>
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="message">Additional Information</label>
          <textarea id="message" name="message" rows={3} placeholder="Tell us about your situation (optional)"></textarea>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          By submitting this form, you agree to our{' '}
          <a href="/terms" className="underline" style={{ color: 'var(--color-primary)' }}>Terms of Service</a> and{' '}
          <a href="/privacy" className="underline" style={{ color: 'var(--color-primary)' }}>Privacy Policy</a>.
          We will never sell your information.
        </p>

        <button
          type="submit"
          className={`btn btn--primary btn--large w-full ${formState === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={formState === 'submitting'}
        >
          {formState === 'submitting' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  )
}
