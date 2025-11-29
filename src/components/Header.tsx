'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface HeaderProps {
  phone?: string
}

export function Header({ phone = '(800) 555-1234' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const phoneHref = `tel:+1${phone.replace(/\D/g, '')}`

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'
    }`} style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            <span className="logo-icon">A</span>
            <span>Ace Payday Loans</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/services" className="font-medium transition-colors" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
              Services
            </Link>
            <Link href="/locations" className="font-medium transition-colors" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
              Locations
            </Link>
            <Link href="/about" className="font-medium transition-colors" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
              About
            </Link>
            <Link href="/contact" className="font-medium transition-colors" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
              Contact
            </Link>
          </nav>

          {/* Header CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href={phoneHref} className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5" style={{ color: 'var(--color-success)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{phone}</span>
            </a>
            <Link href="/apply" className="btn btn--primary">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden flex flex-col gap-1.5 p-2 ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--color-primary)' }}></span>
            <span className={`block w-6 h-0.5 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--color-primary)' }}></span>
            <span className={`block w-6 h-0.5 transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--color-primary)' }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className={`lg:hidden fixed top-20 left-0 right-0 bottom-0 bg-white p-6 transition-transform duration-300 overflow-y-auto ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col gap-2">
          <Link href="/services" className="block p-4 text-lg font-medium rounded-lg hover:bg-gray-50" style={{ fontFamily: 'var(--font-display)' }} onClick={() => setMobileMenuOpen(false)}>
            Services
          </Link>
          <Link href="/locations" className="block p-4 text-lg font-medium rounded-lg hover:bg-gray-50" style={{ fontFamily: 'var(--font-display)' }} onClick={() => setMobileMenuOpen(false)}>
            Locations
          </Link>
          <Link href="/about" className="block p-4 text-lg font-medium rounded-lg hover:bg-gray-50" style={{ fontFamily: 'var(--font-display)' }} onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block p-4 text-lg font-medium rounded-lg hover:bg-gray-50" style={{ fontFamily: 'var(--font-display)' }} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <a href={phoneHref} className="btn btn--phone btn--large w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {phone}
          </a>
          <Link href="/apply" className="btn btn--primary btn--large w-full" onClick={() => setMobileMenuOpen(false)}>
            Apply Now
          </Link>
        </div>
      </nav>
    </header>
  )
}
