/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Ocean Breeze Palette
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2C5AA0', // Azul Principal
          600: '#1E3A8A',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0A3A8A',
        },
        secondary: {
          50: '#E8F4FD',
          100: '#CCE7FB',
          200: '#99CEF7',
          300: '#66B6F3',
          400: '#4A90E2', // Azul Secundário
          500: '#1976D2',
          600: '#1565C0',
          700: '#0D47A1',
          800: '#0A3A8A',
          900: '#082E6B',
        },
        accent: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#87CEEB', // Azul Claro
          400: '#0EA5E9',
          500: '#0284C7',
          600: '#0369A1',
          700: '#0F5A7A',
          800: '#164E63',
          900: '#0C4A6E',
        },
        neutral: {
          50: '#F8F9FA', // Cinza Muito Claro
          100: '#E9ECEF', // Cinza Claro
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D', // Cinza Médio
          600: '#495057',
          700: '#343A40', // Cinza Escuro
          800: '#212529',
          900: '#0F1419',
        },
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'micro': '0.75rem',    // 12px
        'small': '0.875rem',   // 14px
        'base': '1rem',        // 16px
        'lg': '1.25rem',       // 20px
        'xl': '1.5rem',        // 24px
        '2xl': '2rem',         // 32px
        '3xl': '2.5rem',       // 40px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
        strong: '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      screens: {
        'xs': '480px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1440px',
        'xl': '1920px',
      },
    },
  },
  plugins: [],
};
