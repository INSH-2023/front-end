<script setup>

</script>
<template>
<div class="w-[250px] h-fit  mx-auto md:w-[500px] lg:w-[1000px] md:h-fit">
    <div class="w-fit mx-auto">
        <img src="../../../assets/check.png" alt="check_icon" class="w-[80px] h-[80px] mt-[20px] lg:w-[130px] lg:h-[130px] lg:mt-[60px]">
    </div>
    <div class="w-fit mx-auto mt-4 font-semibold ">
        <h3 class="text-[16px] text-center md:text-[30px] lg:text-[50px]">
            เราได้รับข้อมูลของคุณเรียบร้อยแล้ว
        </h3>
        <h3 class="text-[14px] text-center md:text-[20px] lg:text-[25px]">
            เจ้าหน้าที่จะติดต่อเร็วๆนี้
        </h3>
        
    </div>
    <div class="w-fit h-fit mx-auto mt-3 lg:mt-6">
        <button @click="goMain" class="w-fit h-fit p-2 mx-auto text-[15px] md:text-[20] lg:text-[23px] bg-gray-200 rounded-xl hover:bg-sky-800 focus:ring-4 focus:ring-blue-300">
            กลับไปหน้าหลัก
        </button>
    </div>
</div>
</template>
<style scoped>
</style>