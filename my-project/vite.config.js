import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolveComponent } from 'vue';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base:`/kw1/`,
  server: {
    proxy: {
      // Focus here
      '/api':{
        target: `http://localhost:5000`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log(path);
          return path.replace('/^\/api/','') }
        }
      }
    }
})