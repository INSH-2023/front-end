<script setup>
import {onBeforeMount, ref,computed}from'vue'
import {useRouter,useRoute} from 'vue-router'
import BaseStatus from '../../../components/BaseStatus.vue'
const solutionLink='http://localhost:3000/solutions'

const {params}=useRoute()

const myRouter =useRouter()
// const goHowTo=(v)=>{
//     // console.log('this is solution of',text)
//     // console.log('this is id of solution',number)
//     myRouter.push({name:'solution',params:{id:v}})
// }
const goReport=(v)=>{
    myRouter.push({name:'report',params:{id:v,service:params.service}})
    console.log('this is report of :',v)
}

// // searching 
// const searching=ref('')
// const findingKeyW=computed(()=>{
//     let arr=[]
//     let keyWord=searching.value.toLowerCase()

//     let matchStep=(a,kw)=>{
//         let check = false
//         for(let data of a){
//             if(data.solution.includes(kw)){
//                 check=true
//                 console.log('this from searching nested fn match step')
//             }
            
//         }
//         return check
//     }

//     for(let solu of solutionList.value){
//        if(solu.title.toLowerCase()==keyWord){
//             arr.push(solu)
//             console.log('This from searching title',solu.title)
//        }
//        if(solu.tag.includes(keyWord)){
//             arr.push(solu)
//             console.log('this from searching tag :', solu.tag.includes(keyWord))
//        }else
//        if(solu.text.toLowerCase().includes(keyWord)){
//             arr.push(solu)
//             console.log('this from searching text: ', solu.text.includes(keyWord))
//        }else
//        if(matchStep(solu.solutions,keyWord)){
//             arr.push(solu)
//             console.log('this from searching step: ',matchStep(solu.solutions,keyWord))
//        }

       
//     }
//     return arr
// })

// // get article
// const solutionList=ref([])
// const getArticle = async()=>{
// let res =await fetch(solutionLink,{
//     method:'GET'
// })
// if(res.status==200){
//    solutionList.value = await res.json()
//    await randomAricle(4,solutionList.value.length,solutionList.value)
//     console.log(solutionList.value)
// }
// }

// // random article
// const ranArticle=ref([])
// const randomAricle =async(n,max,data)=>{
//     let ranN=undefined
//     let i=0
//     for(i=0;i<n;i++){
//         if(ranN==Math.floor(Math.random()*max)){
//             i--
//             ranN=Math.floor(Math.random()*max)
//         }else{
//             ranN=Math.floor(Math.random()*max)
//             console.log( Math.floor(Math.random()*max) ) 
//             ranArticle.value.push(data[ranN]) 
//         }
//     }
//     // return Math.floor(Math.random()*max) 
// }

// onBeforeMount(()=>{
//     getArticle()
// })
</script>
<template>
<div class="overflow-auto">
<div class="pt-2 ">
    <!-- ส่วน navigation bar -->
    <!-- <BaseStatus/> -->

    <!-- ส่วนล่าง -->
    <div class="w-fit mx-auto mt-4 text-[40px] text-gray-600 font-bold ">
        <span v-if="params.service=='it'">ปัญหา IT ของคุณคืออะไร</span>

    </div>

    <!-- IT -->
    <div class="w-[600px] h-[ถจ0px] p-4 mx-auto mt-3 bg-[#E3F2FD] text-[20px] rounded-xl">
        
        <!-- name -->
        <div class="flex w-full h-[80px] p-1 mx-auto ">
            <!-- first name -->
            <div class=" w-full pr-1">
                <label for="fname" class="title block ml-3 pt-1 text-[15px] font-light">ชื่อ</label>
                <input id="fname" type="text" placeholder="ใส่ชื่อของคุณที่นี่" class=" w-full h-[45px] p-2 bg-white rounded-lg focus:outline-0">                
            </div>

            <!-- last name -->
            <div class=" w-full pl-1">
                <label for="lname" class="title block ml-3 pt-1 text-[15px] font-light">นามสกุล</label>
                <input id="lname" type="text " placeholder="ใส่นามสกุลของคุณที่นี่" class=" w-full h-[45px] p-2 bg-white rounded-lg focus:outline-0">
            </div>
        </div>

        <!-- email -->
        <div class=" w-full h-fit  p-1 rounded-xl">
            <label for="email" class="title block text-[15px] ml-3">
                E-mail
            </label>
            <div class="flex w-full h-fit p-2 bg-white rounded-lg">
                <input type="email" placeholder="ใส่อีเมลของคุณที่นี่" class="w-full h-fit bg-transparent focus:outline-0">
                <h3 class="my-auto px-2 text-[15px] font-light">
                    @moralcenter.com
                </h3>                
            </div>

        </div>

        <!-- service it -->

        <!-- group -->
        <div class=" p-1 mt-2">
            <label for="group" class="title block text-[15px] ml-3">
                 กลุ่มงาน ของคุณ 
                </label>
            <select  id="group" class="w-full h-[40px] pl-2 rounded-lg focus:outline-0">
                <option value="" selected hidden>เลือก กลุ่มงาน ของคุณ</option>
                <option value="testing1" >testing1</option>
                <option value="testing2" >testing2</option>
                <option value="testing3" >testing3</option>

            </select>
        </div>

        <!-- subject -->
        <div class="p-1 mt-2">
            <label for="subject" class="title block text-[15px] ml-3">
                หมวดหมู่ ปัญหา
            </label>
            <select  id="subject" class="w-full h-[40px] pl-2 rounded-lg focus:outline-0">
                <option value="" selected hidden>เลือก หมวดหมู ของคุณ</option>
                <option value="testing1" >testing1</option>
                <option value="testing2" >testing2</option>
                <option value="testing3" >testing3</option>
            </select>
        </div>

        <div class="p-1 mt-2">
            <label for="massage" class="title block text-[15px] ml-3">
                ฝากข้อความเพิ่มเติม
            </label>
            <textarea id="massage" class="resize-none w-full h-[80px] p-2 text-sm rounded-lg focus:outline-0 "></textarea>
        </div>

        <!--submit -->
        <div class="w-full h-fit mt-4">
            <button class="w-full h-[35px] mx-auto  bg-[#64B5F6] text-[#E3F2FD] rounded-2xl hover:bg-[#1E88E5] hover:text-[#text-[#E3F2FD]]">
                รายงานปัญหาของคุณ
            </button>
        </div>

    </div>
    
</div>
</div>
</template>
<style scoped>
.title{
    color:rgb(64, 64, 64);
}
</style>