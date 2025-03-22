import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './src', // Indica que la raíz del proyecto es la carpeta `src`
  build: {
    outDir: '../dist', // Los archivos generados se colocarán en la carpeta `dist`
    emptyOutDir: true, // Vacía la carpeta `dist` antes de construir
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'), // Punto de entrada
      },
    },
  },
  server: {
    open: true, // Abre el navegador automáticamente
  },
});
