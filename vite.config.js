import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// Get all HTML files in root directory
const htmlFiles = readdirSync('.').filter(file => file.endsWith('.html'))

const input = {}
htmlFiles.forEach(file => {
  const name = file.replace('.html', '')
  input[name] = resolve(__dirname, file)
})

export default defineConfig({
  build: {
    rollupOptions: {
      input
    }
  }
})
