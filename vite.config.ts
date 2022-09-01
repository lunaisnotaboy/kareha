import locales from './app/frontend/locales'
import GZipPlugin from 'rollup-plugin-gzip'
import VuePlugin from '@vitejs/plugin-vue'
import { brotliCompressSync } from 'zlib'
import RubyPlugin from 'vite-plugin-ruby'
import JSON5Plugin from './vite.json5'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Seperate Vue from the rest of the chunks
          // to help reduce chunk sizes
          vue: ['vue']
        }
      }
    },
    sourcemap: process.env.NODE_ENV !== 'production' || process.env.RAILS_ENV !== 'production'
  },
  define: {
    _DEV_: process.env.NODE_ENV !== 'production' || process.env.RAILS_ENV !== 'production',
    _LANGS_: JSON.stringify(Object.entries(locales).map(([k, v]) => [k, v._lang_]))
  },
  plugins: [
    JSON5Plugin(),
    GZipPlugin(),
    GZipPlugin({
      customCompression: (content) => brotliCompressSync(Buffer.from(content)),
      fileName: '.br'
    }),
    RubyPlugin(),
    VuePlugin({
      reactivityTransform: true
    })
  ],
  resolve: {
    alias: {
      '@/': `${__dirname}/app/frontend/`
    }
  }
})
