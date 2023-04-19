<script setup>
import {useRouter} from 'vue-router'
const myRouter = useRouter()
const goBack =()=>myRouter.push({name:'services'})
</script>
<template>
    <div class="w-full h-fit pt-20">
        <h4 class="w-fit mx-auto text-[18px] font-semibold sm:text-[20px] md:text-[25px]">
        Error from server!!    
        </h4>
        <h5 class="w-fit mx-auto text-[14px]  mt-2 font-light sm:text-[15px] md:text-[20px]">
            An internal error occurred, please try again later.
        </h5>
        <h5 class="w-fit mx-auto text-[14px]  mt-2 font-light sm:text-[15px] md:text-[20px]">
            เกิดข้อผิดพลาดกรุณาติดต่อฝ่าย IT
        </h5>
        <div class="w-fit mx-auto mt-4">
            <button @click="goBack" 
                class="w-[180px] p-3 mx-auto bg-gray-300 text-[18px] rounded-lg font-light "
            >
                ย้อนกลับ
            </button> 
        </div>
       
    </div>


</template>
<style scoped>
</style>