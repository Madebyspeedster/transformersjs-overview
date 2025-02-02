import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      '.onnx': 'application/onnx', // Ensure the correct MIME type is used for ONNX files
    }
  }
})
