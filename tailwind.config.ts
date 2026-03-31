import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#E85D2C',
        'accent-hover': '#D14E1F',
      },
    },
  },
  plugins: [],
}

export default config
