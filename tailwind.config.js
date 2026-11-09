/**
 * Konfigurasi Tailwind CSS DarahTerpadu.
 *
 * Berkas ini adalah SATU-SATUNYA sumber design token (warna, font, bayangan).
 * Dimuat oleh Tailwind v4 melalui `@config "../../tailwind.config.js"` di
 * `src/shared/styles/global.css`.
 *
 * Aturan main:
 * - Komponen wajib memakai kelas token (`bg-surface`, `text-muted`, ...).
 * - Jangan tulis nilai warna mentah (`#hex`, `rgb()`, `hsl()`) di className.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Teks dasar aplikasi
        sans: ['Fustat', 'Segoe UI', 'system-ui', '-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Headline, judul, angka besar
        display: ['Fraunces', 'Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
      },
      colors: {
        // ---- Primary (merek / aksi utama) ----
        primary: {
          DEFAULT: '#b3261e',
          hover: '#8c1d17',
          active: '#70130e',
          soft: '#fbe9e7',
          50: '#fff6f3',
          100: '#fbe9e7',
          200: '#f6cfc9',
          300: '#eda79e',
          400: '#e07a6d',
          500: '#cf4a3c',
          600: '#b3261e',
          700: '#8c1d17',
          800: '#70130e',
          900: '#591110',
        },
        // Teks & ikon di atas permukaan primary
        'on-primary': '#ffffff',

        // ---- Teks ----
        heading: '#281e1b',
        foreground: '#1f1b1a',
        label: '#4a4341',
        muted: '#6b6461',
        placeholder: '#b4aca8',

        // ---- Latar ----
        background: '#fffaf7',
        surface: {
          DEFAULT: '#ffffff',
          muted: '#faf8f7',
          sunken: '#f7f5f4',
          highlight: '#f0ebe9',
        },

        // ---- Garis ----
        border: {
          DEFAULT: '#e3dedb',
          strong: '#d3cbc7',
        },

        // ---- Status ----
        success: '#1f7a4d',
        warning: '#a8620a',
        danger: '#c0281c',
        info: '#4354c9',
      },
      boxShadow: {
        panel: '0 30px 60px -32px rgb(40 30 27 / 0.35)',
        field: '0 1px 2px rgb(40 30 27 / 0.05)',
        hero: '24px 24px 0 rgb(179 38 30 / 0.08)',
        heart: 'inset -14px -16px 0 rgb(112 19 14 / 0.18)',
      },
    },
  },
}
