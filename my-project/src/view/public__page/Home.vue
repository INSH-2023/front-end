<script setup>
import { useRouter } from 'vue-router';
const myRouter =useRouter()

const goSignIn=()=>myRouter.push({name:'signIn'})
</script>
<template>
<div class="flex w-full h-[90%] font-mono ">
   <div class=" m-auto  w-[60%] p-10 pr-1">
      <div class="w-fit ml-10 decoration-1 underline text-[25px] font-font-medium">
         IT help desk
      </div>
      <div class="w-fit m-auto text-[40px] mt-[-10px] w-[90%] font-bold">
         <!-- เว็บไซต์การให้บริการสำหรับแจ้งปัญหาด้าน IT ต่างๆ -->
        <span class="text-[30px]">คุณมีปัญหาที่เกี่ยวกับไอทีใช่หรือไม่?</span>  <br>ลองใช้เว็บไซต์นี้ดูสิ
      </div>
      <div class="w-fit m-auto text-[15px] font-normal mt-2 w-[90%] font-bold">
         เว็บไซต์การให้บริการสำหรับแจ้งปัญหาเกี่ยวกับด้านไอทีภายองค์กร
      </div>
      <div class="mt-6 w-fit m-auto ml-[170px]">
         <button @click="goSignIn" class=" bg-gray-300 p-3">
            เริ่มต้นใช้งาน
         </button>
      </div>
   </div>
   <!-- photo -->
   <div class="m-auto ">
      <img src="../../assets/simple_photo.png" alt="">
   </div>
</div>
</template>
<style scoped>
</style>