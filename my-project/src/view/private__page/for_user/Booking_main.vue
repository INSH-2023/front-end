<script setup>
import {onBeforeMount, ref}from'vue'
import {useRouter,useRoute} from 'vue-router'
import BaseStatus from '../../../components/BaseStatus.vue'
const articleLink='http://localhost:3000/solutions'

const {params}=useRoute()

const myRouter =useRouter()
const goHowTo=(v)=>{
    // console.log('this is solution of',text)
    // console.log('this is id of solution',number)
    myRouter.push({name:'solution',params:{id:v}})
}
const goReport=(v)=>{
    myRouter.push({name:'report',params:{id:v,service:params.service}})
    console.log('this is report of :',v)
}

const searching=ref('')
// get article
const arrArticle=ref([])
const getArticle = async()=>{
let res =await fetch(articleLink,{
    method:'GET'
})
if(res.status==200){
   arrArticle.value = await res.json()
   await randomAricle(4,arrArticle.value.length,arrArticle.value)
    console.log(arrArticle.value)
}
}

// random article
const ranArticle=ref([])
const randomAricle =async(n,max,data)=>{
    let ranN=undefined
    let i=0
    for(i=0;i<n;i++){
        if(ranN==Math.floor(Math.random()*max)){
            i--
            ranN=Math.floor(Math.random()*max)
        }else{
            ranN=Math.floor(Math.random()*max)
            console.log( Math.floor(Math.random()*max) ) 
            ranArticle.value.push(data[ranN]) 
        }
    }
    // return Math.floor(Math.random()*max) 
}

onBeforeMount(()=>{
    getArticle()
})
</script>
<template>
<div class="overflow-auto">
<div class="pt-2 ">
    <!-- ส่วน navigation bar -->
    <BaseStatus/>

    <!-- ส่วนล่าง -->
    <div class="w-fit mx-auto mt-4 text-[60px] text-gray-600 font-bold ">
        <span v-if="params.service=='it'">เลือกบริการช่วยเหลือของ IT</span>
        <span v-else-if="params.service=='pr'">เลือกบริการช่วยเหลือของ PR</span> 

    </div>

    <!-- IT -->
    <div v-if="params.service=='it'" class="flex w-fit mx-auto p-2">
        <!-- hard ware -->
        <button @click="goReport('hardware')" class="px-4 w-[130px] my-auto  ">
            <img src="../../../assets/report_icon/hardware.png" alt="Hardware"  class="  w-[80px] h-[80px] w-fit mx-auto">
            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Hardware
            </h3>
            <h3 class="w-fit m-auto text-[14px]">  
                (อุปกรณ์)
            </h3>                
        </button>

        <!-- solfware -->
        <button  @click="goReport('software')" class="px-4 w-[130px] my-auto">
            <img src="../../../assets/report_icon/software.png" alt="Software" class="w-[80px] h-[80px] w-fit mx-auto">
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Solfware
            </h3>
            <h3 class="w-fit m-auto text-[14px]">
                (โปรเกรม)
            </h3>
        </button>

        <!-- internet -->
        <button @click="goReport('internet')" class=" px-4 w-[130px] my-auto">
            <img src="../../../assets/report_icon/internet.png" alt="Internet" class="w-[80px] h-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Internet
            </h3>
            <h3 class="w-fit m-auto text-[14px]">
                (อินเตอร์เน็ต)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                อินเตอร์เน็ต
            </h3> -->
        </button>

        <!-- printer -->
        <button @click="goReport('printer')" class=" px-4 w-[130px] my-auto"> 
            <img src="../../../assets/report_icon/printer.png" alt="Printer" class="w-[80px] h-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Printer
            </h3>
            <h3 class="w-fit m-auto text-[13px]">
                (เครื่องพิมพ์เอกสาร)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Printer
            </h3> -->
        </button>

        <!-- website -->
        <button @click="goReport('website')" class="px-4 w-[130px] my-auto"> 
            <img src="../../../assets/report_icon/website.png" alt="Website" class="w-[80px] h-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Website
            </h3>
            <h3 class="w-fit m-auto text-[14px]">
                (เว็บไซต์)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Website
            </h3> -->
        </button>

        
        <button @click="goReport('meeting')" class="px-4 w-[130px] my-auto"> 
            <img src="../../../assets/report_icon/meeting.png" alt="Meeting" class="w-[80px] h-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Meeting
            </h3>
            <h3 class="w-fit mx-auto">
                (ห้องประชุม)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Meating room
            </h3> -->
        </button>

        <button @click="goReport('application')" class="px-4 w-[130px] my-auto"> 
            <img src="../../../assets/report_icon/application.png" alt="Meeting" class="w-[80px] h-[80px] w-fit mx-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                application
            </h3>
            <h3 class="w-fit mx-auto">
                (แอปพลิเคชัน)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Meating room
            </h3> -->
        </button>

        <!-- other -->
        <button @click="goReport('other')" class="px-4 w-[130px] my-auto"> 
            <img src="../../../assets/report_icon/other.png" alt="Other" class="w-[80px] h-[80px] w-fit m-auto">            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Other
            </h3>
            <h3 class="w-fit mx-auto">
                (อื่นๆ)
            </h3>
            <!-- <h3 class="mt-2 w-fit mx-auto">
                Meating room
            </h3> -->
        </button>
    </div>

    <!-- PR -->
    <div v-if="params.service=='pr'" class="flex w-fit mx-auto p-2">
        <!-- hard ware -->
        <button @click="goReport('media')" class="px-4 w-[130px] my-auto  ">
            <img src="../../../assets/vue.svg" alt="Hardware"  class="  w-[80px] h-[80px] w-fit mx-auto">
            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Media
            </h3>
            <h3 class="w-fit m-auto text-[14px]">  
                (สื่อต่างๆ)
            </h3>                
        </button>
        
        <button @click="goReport('news')" class="px-4 w-[130px] my-auto  ">
            <img src="../../../assets/vue.svg" alt="Hardware"  class="  w-[80px] h-[80px] w-fit mx-auto">
            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                NEWS
            </h3>
            <h3 class="w-fit m-auto text-[14px]">  
                (ข่าว)
            </h3>                
        </button>

        <button @click="goReport('other')" class="px-4 w-[130px] my-auto  ">
            <img src="../../../assets/vue.svg" alt="Hardware"  class="  w-[80px] h-[80px] w-fit mx-auto">
            
            <h3 class="mt-2 w-fit mx-auto font-semibold">
                Other
            </h3>
            <h3 class="w-fit m-auto text-[14px]">  
                (อื่นๆ)
            </h3>                
        </button>
    </div>

    <!-- line -->
    <hr class="mt-[30px] w-[1100px] h-[1px] border-0 mx-auto bg-gray-700">

    <!-- searching -->
    <div v-if="params.service=='it'" class="relative w-[600px] h-[150px] mx-auto">
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
        <div  class="absolute w-[440px] bg-gray-200 mx-[95px] mt-[-20px]">
            <div v-show="searching.length!=0" v-for="(data,index) in arrArticle" :key="index"  class="px-2 py-1.5 ">
                {{data.title}}
            </div>
        </div>
    </div>

    <!-- list problems -->
    <div v-if="params.service=='it'" class="grid grid-cols-2 grid-rows-2 gap-4 w-[1000px] mx-auto mt-3">
        <div v-for="(dataa,index) in ranArticle" :key="index"  class="bg-gray-100 p-2 rounded-2xl hover:bg-gray-200">
            <img :src="dataa.img" alt="logo" class=" w-[45px] mx-3 mt-2">
            <h5 class="ml-[10px] mb-1.5 mt-2 text-[20px] font-semibold">
                {{dataa.title}}
            </h5>
            <p  class="resize-none w-full h-[100px] px-2 text-[15px] text-ellipsis whitespace-normal break-words">
                {{ dataa.text }}
            </p>
            <button @click="goHowTo(dataa.id)" class="w-fit text-left p-2 text-sky-500 hover:text-sky-700 block">
                ดูรายละเอียดเพิ่มเติม &#62;&nbsp;
            </button>
        </div>

        
    </div>
</div>
</div>
</template>
<style scoped>
</style>