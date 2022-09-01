import VuePlugin from '@vitejs/plugin-vue'
import RubyPlugin from 'vite-plugin-ruby'
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
    _DEV_: process.env.NODE_ENV !== 'production' || process.env.RAILS_ENV !== 'production'
  },
  plugins: [
    RubyPlugin(),
    VuePlugin()
  ],
  resolve: {
    alias: {
      '@/': `${__dirname}/app/frontend/`
    }
  }
})
