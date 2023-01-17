<script setup>

</script>
<template>
<div class="">
    <div class="w-fit mx-auto pt-[40px] text-[60px] font-medium">
        บริการช่วยเหลือ
    </div>
    <div class="flex w-fit mx-auto p-2">
        <div class="px-4">
            <img src="../../../assets/vue.svg" alt=""  class="w-[80px]">
            <h3 class="mt-2 w-fit mx-auto">
                Hardware
            </h3>
        </div>
        <div class="px-4">
            <img src="../../../assets/vue.svg" alt="" class="w-[80px]">
            <h3 class="mt-2 w-fit mx-auto">
                Solfware
            </h3>
        </div>
        <div class="px-4">
            <img src="../../../assets/vue.svg" alt="" class="w-[80px]">            
            <h3 class="mt-2 w-fit mx-auto">
                Internet
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                อินเตอร์เน็ต
            </h3> -->
        </div>
        <div class="px-4"> 
            <img src="../../../assets/vue.svg" alt="" class="w-[80px]">            
            <h3 class="mt-2 w-fit mx-auto">
                เครื่องพิมพ์
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Printer
            </h3> -->
        </div>
        <div class="px-4"> 
            <img src="../../../assets/vue.svg" alt="" class="w-[80px]">            
            <h3 class="mt-2 w-fit mx-auto">
                เว็บไซต์
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Website
            </h3> -->
        </div>
        <div class="px-4"> 
            <img src="../../../assets/vue.svg" alt="" class="w-[80px]">            
            <h3 class="mt-2 w-fit mx-auto">
                ห้องประชุม
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Meating room
            </h3> -->
        </div>
    </div>

    <!-- line -->
    <hr class="mt-[30px] w-[900px] h-[1px] border-0 mx-auto bg-gray-700">

    <!-- searching -->
    <div class="">
        <h3 class="mx-auto w-fit mt-4 text-[30px]">
            ค้นหาหัวข้อของคุณ
        </h3>
        <div class="flex w-[500px] h-[30px] mt-3 mx-auto border rounded border-gray-400">
            <label for="searching">
                <img src="../../../assets/loupe.png" alt="" class="w-[20px] mx-3 inline-block">
            </label>
            <input id="searching" type="text" placeholder="ลองพิมพ์ปัญหาของคุณมาสิ" class="w-[453px] focus:outline-0 my-auto">
        </div>
    </div>
</div>
</template>
<style scoped>
</style>