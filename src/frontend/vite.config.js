import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import environment from 'vite-plugin-environment';

dotenv.config({ path: '../../.env' });

const aliases = {
  crypto: "empty-module",
  assert: "empty-module",
  http: "empty-module",
  https: "empty-module",
  os: "empty-module",
  url: "empty-module",
  zlib: "empty-module",
  stream: "empty-module",
  _stream_duplex: "empty-module",
  _stream_passthrough: "empty-module",
  _stream_readable: "empty-module",
  _stream_writable: "empty-module",
  _stream_transform: "empty-module",
  // Agrega más alias si es necesario
};

export default defineConfig({
  build: {
    emptyOutDir: true,
    target: ['chrome89', 'edge89', 'firefox80', 'safari14']
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    fs: {
      allow: ["."],
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
    
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
      // Agrega los alias definidos anteriormente
      ...Object.entries(aliases).map(([find, replacement]) => ({ find, replacement })),
    ],
  },
});
