import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueFacingDecoratorHmr from "./vite-plugin-vue-facing-decorator-hmr";
import checker from 'vite-plugin-checker';
//for use in dev mode
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    vueFacingDecoratorHmr(),
    checker({
      vueTsc: false,//Check compatibility once this gets fixed
    })
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
