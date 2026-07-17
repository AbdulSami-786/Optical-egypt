/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        400: '400ms',
        900: '900ms',
      },
      colors: {
        // Palette taken from the Al-Alamia logo: crimson red, near-black, white.
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#141414',
          line: '#262626',
        },
        bone: '#f4f2ee',
        brand: {
          DEFAULT: '#c8102e',
          dark: '#96091f',
          light: '#e63950',
        },
        // Alias kept so every existing accent utility picks up the brand red.
        accent: '#c8102e',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6%, -8%) scale(1.15)' },
          '66%': { transform: 'translate(-7%, 5%) scale(0.92)' },
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-fast': 'marquee 14s linear infinite',
        'gradient-drift': 'gradient-drift 18s ease-in-out infinite',
        'grid-pan': 'grid-pan 3s linear infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 1.1s ease-out',
        'spin-slow': 'spin-slow 18s linear infinite',
        scanline: 'scanline 6s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
