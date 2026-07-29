/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16233A',
        'ink-light': '#243553',
        parchment: '#F3ECDD',
        'parchment-dark': '#E7DCC1',
        'parchment-darker': '#D8C9A3',
        brass: '#B08D57',
        'brass-light': '#CBA96B',
        burgundy: '#7A2331',
        'burgundy-light': '#9A3040',
        charcoal: '#26221C',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Libre Franklin"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        card: '0 1px 2px rgba(22,35,58,0.08), 0 8px 24px -8px rgba(22,35,58,0.25)',
        'card-hover': '0 2px 4px rgba(22,35,58,0.1), 0 20px 40px -12px rgba(22,35,58,0.35)',
      },
    },
  },
  plugins: [],
};
