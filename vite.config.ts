import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills({ globals: { Buffer: true } })],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  build: {
    modulePreload: { polyfill: false },
    lib: {
      entry: "./src/main.ts",
      formats: ["cjs", "es"],
      fileName: "main",
    },
    minify: false,
    rollupOptions: {
      external: [
        "@web3-onboard/core",
        "@web3-onboard/vue",
        "ethers",
        "siwe",
        "vue",
      ],
    },
  },
});
