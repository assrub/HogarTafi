import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, //obligas a Vite a verificar periódicamente si los archivos han cambiado  
      interval: 100, // Intervalo en milisegundos (ajústalo según tu preferencia)
    },
    host: true, // Asegúrate de que el servidor esté accesible desde Docker
    strictPort: true, // Mantiene el puerto establecido sin cambiar
    port: 5173, // El puerto que expones en tu contenedor
  },
})
