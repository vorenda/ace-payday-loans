import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d4f4f',
          light: '#1a6b6b',
          dark: '#083838',
          subtle: '#e8f4f4',
        },
        accent: {
          DEFAULT: '#d4a853',
          light: '#e8c77b',
          dark: '#b8923d',
        },
        success: '#2d8a5e',
        warning: '#e09f3e',
        error: '#c44536',
        background: {
          DEFAULT: '#faf8f5',
          alt: '#f5f1eb',
        },
        surface: '#ffffff',
        text: {
          DEFAULT: '#1a1a1a',
          secondary: '#4a4a4a',
          muted: '#6b6b6b',
        },
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '24px',
      },
      boxShadow: {
        glow: '0 0 40px rgba(212, 168, 83, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
