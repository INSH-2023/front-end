import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolveComponent } from 'vue';
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  // base:`/kw1/`,
  server: {

    proxy: {
      '/api': {
           target: 'http://10.1.1.167:5000',
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