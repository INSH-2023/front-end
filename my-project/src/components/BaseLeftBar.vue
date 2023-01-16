<script setup>
import {useRouter} from 'vue-router'
const myRouter=useRouter()
const goSignIn=()=>myRouter.push({name:'signIn'})
const goRegister=()=>myRouter.push({name:'signUp'})
const goHome =()=>myRouter.push({name:'home'})
const goAdmin =()=>myRouter.push({name:'showAllEvents'})
const goUser =()=>myRouter.push({name:'booking'})
const goShowAllUser =()=>myRouter.push({name:'showAllUser'}) 
const goShowAllEvent =()=>myRouter.push({name:'showAllEvents'}) 
const goHistory =()=>myRouter.push({name:'history'})
const goBooking =()=>myRouter.push({name:'booking'})
</script>
<template>
<div class="bg-[#134074] w-full h-full">
    <div>
        <img src="../assets/Moralcenter.PNG" alt="moral_logo" class="w-[95px] w-fit py-5 mx-auto">
    </div>
    <ul class="w-full mx-auto ">

        <li class="w-full  py-3 divide-y">
            <button @click="goShowAllEvent" class="w-full items-center hover:text-white font-semibold text-[#8DA9C4]">
                การแจ้งซ่อมทั้งหมด
            </button>        
        </li>
        <li class="w-full py-3 ">
            <button @click="goShowAllUser" class="w-full items-center hover:text-white font-semibold text-[#8DA9C4]">
                 ผู้ใช้ทั้งหมด
            </button>
        </li>
        <li class="w-full py-3 ">
            <button @click="goRegister" class="w-full items-center hover:text-white font-semibold text-[#8DA9C4]">
                เพิ่มผู้ใช้
            </button>
        </li>
        <li class="py-auto pb-3">
            <button>
                เกี่ยวกับเรา
            </button>
        </li>
        <li class="py-auto pb-3">
            <button @click="goHome">
                ออกจากระบบ
            </button>
        </li>
       
    </ul>
</div>
   
</template>
<style scoped>
</style>