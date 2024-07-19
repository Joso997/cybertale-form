import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueFacingDecoratorHmr from "./vite-plugin-vue-facing-decorator-hmr";
//for use in build and test mode
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    vueFacingDecoratorHmr(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@cybertale/form': require.resolve('@cybertale/form')
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
