import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueFacingDecoratorHmr from "./vite-plugin-vue-facing-decorator-hmr";
//for use in dev mode
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    vueFacingDecoratorHmr()
  ],
  server: {
    hmr: {
      overlay: true,
    },
  },
});
