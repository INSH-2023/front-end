<script setup>
import{ref}from'vue'
const email=ref('')
const pw=ref('')
</script>
<template>
<div>
    <div class=" pt-3">
       <div class="mt-3 w-fit mx-auto text-[60px] font-semibold">
         ลงชื่อเข้าใช้
       </div>
       <div class="mt-6 w-[400px] mx-auto">
            <!-- input zone -->
            <div class=" border-2 border-gray-400 rounded-[10px]">
                <div class="flex px-2 py-1.5">
                    <input type="text" placeholder="E-mail" class="w-[90%] focus:outline-0 my-auto">
                    <button class="w-[10%] ml-[2px mx-auto] ">
                       <h2 class="p-[1px] mx-auto rounded-full border-2 border-gray-500 text-gray-500 w-[30px]" >
                         >
                       </h2> 
                    </button>
                </div>
                <div>
                    
                </div>
                
            </div>
       </div>

    </div>
</div>

<!--     
    <div class="h-fit w-fit mx-auto font-mono">
        <div class="mt-20 p-2 bg-[#1565C0] w-[400px] ">

            <h1 class="w-fit text-[#BBDEFB] mx-auto m-3 font-bold"> เข้าสู่ระบบ </h1>
            input mail
            <div class="w-[70%] mx-auto m-3 ">
                <h2 class="text-[#BBDEFB] font-medium">E-mail</h2>
                <input type="text" class="w-full focus:outline-0 bg-transparent border-b-[1px] " />
            </div>
            input password
            <div class=" w-[70%] mx-auto m-3">
                <h2 class="text-[#BBDEFB] font-medium">Password</h2>
                <input type="text" class="w-full focus:outline-0 bg-transparent border-b-[1px] "/> 
            </div>
            ปุ่ม ย้อนกลับ
            <div class="flex font-semibold w-fit mx-auto my-3">
                <button class="p-3 text-gray-200 hover:bg-rose-400 hover:text-gray-800">ย้อนกลับ</button>
                <button class="p-3 text-gray-200 hover:bg-green-400 hover:text-gray-800">เข้าสู่ระบบ</button>

            </div>
            
        </div>
    </div>     -->
</template>
<style scoped>
</style>