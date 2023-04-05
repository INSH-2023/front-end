<script setup>
import { useRouter } from 'vue-router';
const myRouter =useRouter()
const goSignIn=()=>myRouter.push({name:'signIn'})
</script>
<template>
<div class="flex flex-col  w-full h-fit font-mono sm:relative
   md:flex md:flex-row 
">
   <div class="block w-fit mx-auto mt-4  text-[2.5rem] text-center font-medium
       sm:text-gray-300 md:text-rose-300 lg:text-sky-300  
       md:text-[1.563rem] md:ml-[2.6rem] md:decoration-1 md:underline md:mt-auto md:hidden
       
      ">
         IT help desk
   </div>

   <div class="relative mx-auto h-fit w-fit mt-1  z-20 order-last
      md:p-10 md:order-first md:w-[40rem] md:m-auto md:mt-auto 
   ">
      <div class="hidden w-fit mx-auto mt-4  text-[2.5rem] text-center font-medium
         sm:text-gray-300 md:text-rose-300 lg:text-sky-300  
         md:text-[1.9rem] md:ml-[2.9rem] md:decoration-1 md:underline md:mt-auto md:block
         
         ">
            IT help desk
      </div>

      <div class="w-[19rem] h-fit m-auto text-[15px]  text-center  mx-auto font-bold 
          md:text-[40px] sm:text-[20px] 
          md:block md:ml-[2.6rem] md:w-full md:text-left md:text-[1.3rem] lg:text-[2.5rem]
      ">
         <!-- เว็บไซต์การให้บริการสำหรับแจ้งปัญหาด้าน IT ต่างๆ -->
        <span class="w-fit  text-[0.938rem]  sm:text-[1.25rem] md:text-[1.62rem] lg:text-[2.3rem]">คุณมีปัญหาที่เกี่ยวกับไอทีใช่หรือไม่?</span>  <br>ลองใช้เว็บไซต์นี้ดูสิ
      </div>
      <div class="w-[14.375rem] m-auto my-2 mt-auto text-[0.75rem] text-center font-normal w-full font-medium
         md:w-fit md:mt-2 md:my-auto md:w-full md:text-left md:ml-[2.6rem]
         
      ">
         เว็บไซต์การให้บริการสำหรับแจ้งปัญหาเกี่ยวกับด้านไอทีภายองค์กร
      </div>
      <div class="mt-3 w-[10rem] mx-auto bg-gray-300 rounded-lg  
         sm:max-sm:text-[0.625rem] sm:text-[1.25rem] sm:w-[16rem]
         md:mt-6
         lg:w-[15rem] lg:text-[1.3rem]
      ">
         <button @click="goSignIn()" class=" w-full h-fit p-2">
            เริ่มต้นใช้งาน
         </button>
      </div>
   </div>
   <!-- photo -->
   <div class=" w-full   mx-auto  z-0 w-[16rem] order-2
      sm:relative  sm:w-[16rem] sm:top-auto 
      md:w-[25rem] md:m-auto
   ">
      <img src="../../assets/contract_1.jpg" alt="photo" class="mx-auto">
   </div>
</div>
</template>
<style scoped>
</style>