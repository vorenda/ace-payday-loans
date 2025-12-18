'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 'loan-amount' | 'state' | 'vehicle' | 'balance' | 'iframe';

interface WizardState {
  loanAmount: string;
  state: string;
  paidOff: string;
  balance: string;
}

export function ApplyWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('loan-amount');
  const [wizardState, setWizardState] = useState<WizardState>({
    loanAmount: '',
    state: '',
    paidOff: '',
    balance: '',
  });

  const handleLoanAmount = (amount: string) => {
    setWizardState({ ...wizardState, loanAmount: amount });
    setCurrentStep('state');
  };

  const handleStateSelect = (selectedState: string) => {
    setWizardState({ ...wizardState, state: selectedState });

    if (selectedState === 'CA') {
      router.push('/sda');
    } else if (selectedState === 'TX') {
      setCurrentStep('vehicle');
    }
  };

  const handleVehiclePaidOff = (isPaidOff: string) => {
    setWizardState({ ...wizardState, paidOff: isPaidOff });

    if (isPaidOff === 'yes') {
      setWizardState({ ...wizardState, paidOff: isPaidOff, balance: '0' });
      setCurrentStep('iframe');
    } else {
      setCurrentStep('balance');
    }
  };

  const handleBalance = (balanceAmount: string) => {
    setWizardState({ ...wizardState, balance: balanceAmount });

    if (balanceAmount === '1500') {
      setCurrentStep('iframe');
    } else {
      router.push('/sda');
    }
  };

  const getSalesforceUrl = () => {
    const baseUrl = 'https://montanacapital.my.salesforce-sites.com/trust';
    const cssUrl = typeof window !== 'undefined' ? `${window.location.origin}/css/apply-iframe.css` : '';
    const params = new URLSearchParams({
      leadSource: 'Ace Payday Loans',
      leadstate: wizardState.state,
      paidoff: wizardState.paidOff,
      balance: wizardState.balance,
      leadChannel: 'Web',
      sourcePage: typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '',
      sourceReferer: typeof window !== 'undefined' ? encodeURIComponent(document.referrer || '') : '',
      css: cssUrl,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1rem',
    }}>
      {/* Step 1: Loan Amount */}
      {currentStep === 'loan-amount' && (
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              marginBottom: '1rem',
            }}>
              Step 1 of 4
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--color-text)',
              marginBottom: '0.5rem',
            }}>
              How much do you need?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
            }}>
              Select your loan amount range
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '1rem',
          }}>
            <button
              onClick={() => handleLoanAmount('1000')}
              style={{
                padding: '2rem 1.5rem',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                borderRadius: '1rem',
                border: '2px solid var(--color-border)',
                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              $100 - $2,000
            </button>

            <button
              onClick={() => handleLoanAmount('5000')}
              style={{
                padding: '2rem 1.5rem',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                borderRadius: '1rem',
                border: '2px solid var(--color-border)',
                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              $2,000 - $50,000
            </button>
          </div>
        </div>
      )}

      {/* Step 2: State Selection */}
      {currentStep === 'state' && (
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              marginBottom: '1rem',
            }}>
              Step 2 of 4
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--color-text)',
              marginBottom: '0.5rem',
            }}>
              Which state are you in?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
            }}>
              We serve California and Texas
            </p>
          </div>

          <div style={{
            marginBottom: '1.5rem',
          }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontWeight: '500',
              marginBottom: '0.75rem',
              fontSize: '1rem',
            }}>
              Select your state:
            </label>
            <select
              value={wizardState.state}
              onChange={(e) => handleStateSelect(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem',
                fontFamily: 'var(--font-body)',
                borderRadius: '0.75rem',
                border: '2px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-subtle)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="">-- Choose a state --</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Vehicle Paid Off (TX only) */}
      {currentStep === 'vehicle' && (
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              marginBottom: '1rem',
            }}>
              Step 3 of 4
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--color-text)',
              marginBottom: '0.5rem',
            }}>
              Is your vehicle paid off?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
            }}>
              Let us know your vehicle status
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '1rem',
          }}>
            <button
              onClick={() => handleVehiclePaidOff('yes')}
              style={{
                padding: '2rem 1.5rem',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                borderRadius: '1rem',
                border: '2px solid var(--color-border)',
                background: 'linear-gradient(135deg, var(--color-success) 0%, #238b4e 100%)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              Yes, It&apos;s Paid Off
            </button>

            <button
              onClick={() => handleVehiclePaidOff('no')}
              style={{
                padding: '2rem 1.5rem',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                borderRadius: '1rem',
                border: '2px solid var(--color-border)',
                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              No, I Still Owe Money
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Balance (TX + paidoff=no) */}
      {currentStep === 'balance' && (
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              marginBottom: '1rem',
            }}>
              Step 4 of 4
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--color-text)',
              marginBottom: '0.5rem',
            }}>
              What is your balance?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
            }}>
              How much do you still owe on your vehicle?
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '1rem',
          }}>
            <button
              onClick={() => handleBalance('1500')}
              style={{
                padding: '2rem 1.5rem',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                borderRadius: '1rem',
                border: '2px solid var(--color-border)',
                background: 'linear-gradient(135deg, var(--color-success) 0%, #238b4e 100%)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              Less than $2,000
            </button>

            <button
              onClick={() => handleBalance('2500')}
              style={{
                padding: '2rem 1.5rem',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                borderRadius: '1rem',
                border: '2px solid var(--color-border)',
                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              More than $2,000
            </button>
          </div>
        </div>
      )}

      {/* Final: Salesforce Iframe */}
      {currentStep === 'iframe' && (
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              background: 'var(--color-success)',
              color: 'white',
              marginBottom: '1rem',
            }}>
              Final Step
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--color-text)',
              marginBottom: '0.5rem',
            }}>
              Complete Your Application
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
            }}>
              Fill out the form below to get your loan
            </p>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '800px',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
          }}>
            <iframe
              src={getSalesforceUrl()}
              style={{
                width: '100%',
                height: '800px',
                border: 'none',
              }}
              title="Loan Application Form"
            />
          </div>
        </div>
      )}
    </div>
  );
}
