<script setup>

</script>
<template>
<div>
<div class="pt-4 ">
    <!-- ส่วน navigation bar -->
    <div class="flex mx-auto w-fit text-[40px] px-4 py-2 mt-4 bg-gray-300 rounded-3xl">

        <!-- การแจ้งซ่อม -->
        <button class=" flex mx-2  px-7 bg-amber-500 text-gray-100  rounded-2xl ">
            <h5>
            การแจ้งซ่อม                
            </h5>
            <h5 class="ml-4">
                1
            </h5>
        </button >
        
        <!-- กำลังดำเนินการ -->
        <div class=" flex mx-2  px-7 bg-sky-500 text-gray-100  rounded-2xl ">
            <h5>
            กำลังดำเนินการ                
            </h5>
            <h5 class="ml-2">
                0
            </h5>
        </div>

        <div class=" flex mx-2  px-7 bg-teal-400 text-gray-100  rounded-2xl ">
            <h5>
            เสร็จสิ้น               
            </h5>
            <h5 class="ml-2">
                1
            </h5>
        </div>

        <hr class="bg-gray-700 h-[35px] w-[2px] m-auto mx-2">

        <!-- แจ้งซ่อม -->
        <div class=" flex mx-2  px-7 bg-rose-500 text-gray-100  rounded-2xl ">
            <h5>
            แจ้งซ่อม              
            </h5>
        </div>
    </div>


    <!-- ส่วนล่าง -->
    <div class="w-fit mx-auto mt-2  text-[60px] font-medium">
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
</div>
</template>
<style scoped>
</style>