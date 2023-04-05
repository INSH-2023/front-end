<script setup>
import { useRouter } from 'vue-router';
const myRouter =useRouter()
const goSignIn=()=>myRouter.push({name:'signIn'})
</script>
<template>
<div class="flex flex-col  w-full h-fit font-mono sm:relative
   md:flex md:flex-row 
">
   <div class="relative mx-auto h-fit w-fit p-3  z-20 order-last
      md:p-10 md:order-first md:w-[30rem] md:m-auto
   ">
      <div class="w-fit mx-auto   text-[2.5rem] text-center font-medium
       sm:text-gray-300 md:text-rose-300 lg:text-sky-300 
       md:text-[1.563rem] md:ml-[2.6rem] md:decoration-1 md:underline
       
      ">
         IT help desk
      </div>
      <div class="w-[14.375rem] h-fit m-auto text-[15px] mt-[1px] hidden  mx-auto font-bold 
         sm:w-[19rem] md:text-[40px] sm:text-[20px] md:block
      ">
         <!-- เว็บไซต์การให้บริการสำหรับแจ้งปัญหาด้าน IT ต่างๆ -->
        <span class="w-fit text-[15px] sm:text-[20px]  md:text-[30px] ">คุณมีปัญหาที่เกี่ยวกับไอทีใช่หรือไม่?</span>  <br>ลองใช้เว็บไซต์นี้ดูสิ
      </div>
      <div class="w-[14.375rem] m-auto text-[0.625rem] text-center font-normal w-full font-bold
         md:text-[15px] md:mt-2 
      ">
         เว็บไซต์การให้บริการสำหรับแจ้งปัญหาเกี่ยวกับด้านไอทีภายองค์กร
      </div>
      <div class="mt-3 w-[10rem] mx-auto bg-gray-300 rounded-lg  
         sm:max-sm:text-[0.625rem] sm:text-[1.25rem] sm:w-[16rem]
         md:mt-6
      ">
         <button @click="goSignIn()" class=" w-full h-fit p-2">
            เริ่มต้นใช้งาน
         </button>
      </div>
   </div>
   <!-- photo -->
   <div class=" w-full   mx-auto p-3 z-0 w-[16rem] order-first
        sm:relative  sm:w-[16rem] sm:top-auto 
      md:w-[25rem] md:m-auto
   ">
      <img src="../../assets/contract_1.jpg" alt="photo" class="mx-auto">
   </div>
</div>
</template>
<style scoped>
</style>