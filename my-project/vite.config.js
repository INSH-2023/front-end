import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolveComponent } from 'vue';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base:`/kw1/`,
  server: {

    proxy: {
      '/api': {
           target: 'https://localhost:172.17.0.2',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
    }
    // proxy: {
    //   // Focus here
    //   '/api':{
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     rewrite: (path) => {
    //       console.log(path);
    //       return path.replace('/^\/api/','') }
    //     }
    //   }
    }
})