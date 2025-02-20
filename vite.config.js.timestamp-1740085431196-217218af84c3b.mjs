// vite.config.js
import path from "path";
import { defineConfig, loadEnv } from "file:///Users/admin/Sites/WEBPACK/vite-react-boilerplate/node_modules/vite/dist/node/index.js";
import react from "file:///Users/admin/Sites/WEBPACK/vite-react-boilerplate/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tailwindcss from "file:///Users/admin/Sites/WEBPACK/vite-react-boilerplate/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "/Users/admin/Sites/WEBPACK/vite-react-boilerplate";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const d = Date.now();
  return {
    root: "src",
    build: {
      chunkSizeWarningLimit: 3600,
      outDir: "../dist",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-${d}.js`,
          chunkFileNames: `assets/[name]-${d}.js`,
          assetFileNames: `assets/[name].[ext]`,
          manualChunks: () => `index-${d}.js`
        }
      }
    },
    plugins: [react(), tailwindcss()],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    define: {
      "process.env": env
      // Make env variables available in your app
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRtaW4vU2l0ZXMvV0VCUEFDSy92aXRlLXJlYWN0LWJvaWxlcnBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWRtaW4vU2l0ZXMvV0VCUEFDSy92aXRlLXJlYWN0LWJvaWxlcnBsYXRlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZG1pbi9TaXRlcy9XRUJQQUNLL3ZpdGUtcmVhY3QtYm9pbGVycGxhdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8vIExvYWQgZW52IGZpbGUgYmFzZWQgb24gYG1vZGVgIGluIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LlxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgY29uc3QgZCA9IERhdGUubm93KCk7XG5cbiAgcmV0dXJuIHtcbiAgICByb290OiAnc3JjJyxcbiAgICBidWlsZDoge1xuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAzNjAwLFxuICAgICAgb3V0RGlyOiAnLi4vZGlzdCcsXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLSR7ZH0uanNgLFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS0ke2R9LmpzYCxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uW2V4dF1gLFxuICAgICAgICAgIG1hbnVhbENodW5rczogKCkgPT4gYGluZGV4LSR7ZH0uanNgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtyZWFjdCgpLCB0YWlsd2luZGNzcygpXSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kY3NzKCldLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52JzogZW52LCAvLyBNYWtlIGVudiB2YXJpYWJsZXMgYXZhaWxhYmxlIGluIHlvdXIgYXBwXG4gICAgfSxcbiAgfTtcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsT0FBTyxVQUFVO0FBQ3RWLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUh4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUV4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxJQUFJLEtBQUssSUFBSTtBQUVuQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCx1QkFBdUI7QUFBQSxNQUN2QixRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0IsaUJBQWlCLENBQUM7QUFBQSxVQUNsQyxnQkFBZ0IsaUJBQWlCLENBQUM7QUFBQSxVQUNsQyxnQkFBZ0I7QUFBQSxVQUNoQixjQUFjLE1BQU0sU0FBUyxDQUFDO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7QUFBQSxJQUNoQyxLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQUEsTUFDekI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixlQUFlO0FBQUE7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
