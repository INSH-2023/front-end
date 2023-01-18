<script setup>
import {onBeforeMount, ref}from'vue'

const articleLink='http://localhost:3000/solutions'

const searching=ref('')
// get article
const arrArticle=ref([])
const getArticle = async()=>{
let res =await fetch(articleLink,{
    method:'GET'
})
if(res.status==200){
   arrArticle.value = await res.json()
    console.log(arrArticle.value)
}
}

onBeforeMount(()=>{
    getArticle()
})
</script>
<template>
<div class="overflow-auto">
<div class="pt-2 ">
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
        <button class=" flex mx-2  px-7 bg-sky-500 text-gray-100  rounded-2xl ">
            <h5>
            กำลังดำเนินการ                
            </h5>
            <h5 class="ml-2">
                0
            </h5>
        </button>

        <button class=" flex mx-2  px-7 bg-teal-400 text-gray-100  rounded-2xl ">
            <h5>
            เสร็จสิ้น               
            </h5>
            <h5 class="ml-2">
                1
            </h5>
        </button>

        <hr class="bg-gray-700 h-[35px] w-[2px] m-auto mx-2">

        <!-- แจ้งซ่อม -->
        <button class=" flex mx-2  px-7 bg-rose-500 text-gray-100  rounded-2xl ">
            <h5>
            แจ้งซ่อม              
            </h5>
        </button>
    </div>


    <!-- ส่วนล่าง -->
    <div class="w-fit mx-auto mt-4 text-[60px] text-gray-600 font-bold ">
        เลือกบริการช่วยเหลือของ IT
    </div>
    <div class="flex w-fit mx-auto p-2">
        <div class="px-4">
            <img src="../../../assets/vue.svg" alt=""  class="w-[80px] w-fit mx-auto">
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Hardware
            </h3>
            <h3 class="w-fit m-auto text-[14px]">
                (อุปกรณ์)
            </h3>
        </div>
        <div class="px-4">
            <img src="../../../assets/vue.svg" alt="" class="w-[80px] w-fit mx-auto">
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Solfware
            </h3>
            <h3 class="w-fit m-auto test-[14px]">
                (โปรเกรม)
            </h3>
        </div>
        <div class="px-4">
            <img src="../../../assets/vue.svg" alt="" class="w-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Internet
            </h3>
            <h3 class="w-fit m-auto tex-[14px]">
                (อินเตอร์เน็ต)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                อินเตอร์เน็ต
            </h3> -->
        </div>
        <div class="px-4"> 
            <img src="../../../assets/vue.svg" alt="" class="w-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                เครื่องพิมพ์
            </h3>
            <h3>
                (เครื่องพิมพ์เอกสาร)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Printer
            </h3> -->
        </div>
        <div class="px-4"> 
            <img src="../../../assets/vue.svg" alt="" class="w-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                เว็บไซต์
            </h3>
            <h3 class="w-fit m-auto text-[14px]">
                (เว็บไซต์)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Website
            </h3> -->
        </div>
        <div class="px-4"> 
            <img src="../../../assets/vue.svg" alt="" class="w-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                ห้องประชุม
            </h3>
            <h3 class="w-fit mx-auto">
                (ห้องประชุม)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Meating room
            </h3> -->
        </div>

        <div class="px-4"> 
            <img src="../../../assets/vue.svg" alt="" class="w-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Other
            </h3>
            <h3 class="w-fit mx-auto">
                (อื่นๆ)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Meating room
            </h3> -->
        </div>
    </div>

    <!-- line -->
    <hr class="mt-[30px] w-[900px] h-[1px] border-0 mx-auto bg-gray-700">

    <!-- searching -->
    <div class="relative w-[600px] h-[150px] mx-auto">
        <h3 class="mx-auto w-fit mt-4 text-[30px]">
            หรือค้นหาหัวข้อปัญหาที่คุณเจอ
        </h3>
        <div class="flex overflow-hidden w-[500px] h-[30px] mt-3 mx-auto border rounded-[20px] border-gray-400">
            <label for="searching">
                <img src="../../../assets/loupe.png" alt="" class="w-[20px] mx-3 inline-block">
            </label>
            <input id="searching" type="text" v-model="searching" placeholder="ลองพิมพ์ปัญหาของคุณมาสิ." class="w-[453px] focus:outline-0 my-auto">
            
        </div>
        <div class="ml-[70px] text-gray-500 text-[13px] mt-[2px]">
                เช่น อินเตอร์เน็ตใช้ไม่ได้ แป้นพิมพ์ใช้ไม่ได้ ปริ้นไม่ออก
        </div>
        <div  class="absolute w-[440px] bg-gray-200 mx-[95px] mt-[-5px]">
            <div v-show="searching.length!=0" v-for="(data,index) in arrArticle" :key="index"  class="px-2 py-1.5 ">
                {{data.title}}
            </div>
        </div>
    </div>

    <!-- list problems -->
    <div class="grid grid-cols-2 gap-4 w-[1000px] mx-auto mt-3">
        <div v-for="(dataa,index) in arrArticle" :key="index" >
            <img :src="dataa.img" alt="logo" class="ml-10 w-[100px]">
            <div class="ml-[10px] my-1.5 text-[20px] font-semibold">
                {{dataa.title}}
            </div>
            <p  class="resize-none w-full h-[180px] p-2 text-[15px] text-ellipsis whitespace-normal break-words">
                {{ dataa.solution }}
            </p>
        </div>

        
    </div>
</div>
</div>
</template>
<style scoped>
</style>