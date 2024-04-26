import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

//base url
export default defineConfig({
  plugins: [react()],
  base: "/todo-list-typescript/"
})
