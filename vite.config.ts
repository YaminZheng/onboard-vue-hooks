import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  build: {
    lib: {
      entry: "./src/main.ts",
      formats: ["cjs", "es"],
      fileName: 'onboard-vue-hooks',
    },
    sourcemap: true,
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
