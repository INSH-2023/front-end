<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseStatus from '../../../components/BaseStatus.vue'
import getRefreshToken from './../../../JS/refresh';
import jsCookie from './../../../JS/cookies';
import toBackEnd from '../../../JS/fetchToBack';
// const solutionLink='http://localhost:3000/solutions'
const solutionLink = `${import.meta.env.VITE_BACK_END_HOST}/solutions`
const iconLink = `${import.meta.env.VITE_BACK_END_HOST}/images/solutions`


const { params } = useRoute()

const myRouter = useRouter()

const token = ref('')

const subjectObj_it = [
    { type: 'hardware', desc: 'อุปกรณ์' }
]

const goHowTo = (v) => {
    // console.log('this is solution of',text)
    // console.log('this is id of solution',number)
    myRouter.push({ name: 'solution', params: { id: v } })
}
const goReport = (v) => {
    myRouter.push({ name: 'report', params: { id: v, service: params.service } })
    console.log('this is report of :', v)
}
const goService = () => {
    myRouter.push({ name: 'services' })
}

// searching 
const searching = ref('')
const findingKeyW = async (keyWord) => {

    let arr = []

    // let matchStep = (a, kw) => {
    //     let check = false
    //     for (let data of a) {
    //         if (data.step_name.includes(kw)) {
    //             check = true
    //             console.log('this from searching nested fn match step')
    //         }
    //     }
    //     return check
    // }
    for (let solu of solutionList.value) {
        if (solu.solution_title.toLowerCase() == keyWord) {
            arr.push(solu)
            console.log('This from searching title', solu.solution_title)
        } else
            if (solu.solution_tag.includes(keyWord)) {
                arr.push(solu)
                console.log('this from searching tag :', solu.solution_tag.includes(keyWord))
            } else
                if (solu.solution_text.toLowerCase().includes(keyWord)) {
                    arr.push(solu)
                    console.log('this from searching text: ', solu.solution_text.includes(keyWord))
                }
        // else
        //     if (matchStep(solu.solution_steps, keyWord)) {
        //         arr.push(solu)
        //         console.log('this from searching step: ', matchStep(solu.solution_steps, keyWord))
        //     }
    }
    if (arr.length != 0 && solutionList.length >= 4 ) {
        await randomArticle(4, arr.length, arr)
    }
}

// get article
const solutionList = ref([])
const getArticle = async (service) => {
    if (service == "it") {
        token.value = JSON.parse(jsCookie.get("data")).token
        let [status, data] = await toBackEnd.getData('solution', solutionLink, token.value)
        if (status == 200) {
            solutionList.value = data
            findingKeyW(searching.value.toLowerCase())
        }
    }
}

// random article
const ranArticle = ref([])
const randomArticle = async (n, max, data) => {
    ranArticle.value = []
    let ranN = undefined
    let i = 0
    for (i = 0; i < n; i++) {
        if (ranN == Math.floor(Math.random() * max)) {
            i--
            ranN = Math.floor(Math.random() * max)
        } else {
            ranN = Math.floor(Math.random() * max)
            // console.log( Math.floor(Math.random()*max) ) 
            ranArticle.value.push(data[ranN])
        }
    }
    // return Math.floor(Math.random()*max) 
}

onBeforeMount(() => {
    getArticle(params.service),
        getRefreshToken(JSON.parse(jsCookie.get("data")).refreshToken)
})
</script>
<template>
    <!-- <div class="overflow-auto">
<div class="pt-2 "> -->
    <!-- ส่วน navigation bar -->
    <!-- <BaseStatus/> -->

    <!-- ส่วนล่าง -->
    <div class="w-fit mx-auto mt-4 text-[27px] text-gray-600 font-bold 
        md:text-[50px]
        lg:text-[60px]
    ">
        <span v-if="params.service == 'it'">เลือกบริการช่วยเหลือของ IT</span>
        <span v-else-if="params.service == 'pr'">เลือกบริการช่วยเหลือของ PR</span>

    </div>

    <!-- IT -->
    <div v-if="params.service == 'it'" class="flex flex-col w-full mx-auto p-2 lg:w-fit
        lg:flex-row
    ">
        <!-- hard ware -->
        <button @click="goReport('hardware')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC]  rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/hardware.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Hardware
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (อุปกรณ์)
                </h3>
            </div>
        </button>

        <!-- solfware -->


        <button @click="goReport('software')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/software.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Solfware
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (โปรเกรม)
                </h3>
            </div>
        </button>

        <!-- internet -->
        <button @click="goReport('internet')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/internet.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Internet
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (อินเตอร์เน็ต)
                </h3>
            </div>
        </button>

        <!-- printer -->
        <button @click="goReport('printer')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/printer.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Printer
                </h3>
                <h3 class="w-fit mx-auto text-[16px] lg:text-[11px]">
                    (เครื่องพิมพ์เอกสาร)
                </h3>
            </div>
        </button>

        <!-- website -->
        <button @click="goReport('website')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/website.png" alt="website" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Website
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (เว็บไซต์)
                </h3>
            </div>
        </button>

        <!-- meeting -->
        <button @click="goReport('meeting')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/meeting.png" alt="meeting" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Meeting
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (ห้องประชุม)
                </h3>
            </div>
        </button>

        <!-- application -->
        <button @click="goReport('application')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/application.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    application
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (แอปพลิเคชัน)
                </h3>
            </div>
        </button>

        <!-- other -->
        <button @click="goReport('other')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/other.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Other
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (อื่นๆ)
                </h3>
            </div>
        </button>
    </div>

    <!-- PR -->
    <div v-if="params.service == 'pr'" class="flex flex-col w-full mx-auto p-2 lg:w-fit
        lg:flex-row
    ">


        <button @click="goReport('media')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/media.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Media
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (สื่อต่างๆ)
                </h3>
            </div>
        </button>

        <button @click="goReport('news')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/news.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    NEWS
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (ข่าว)
                </h3>
            </div>
        </button>

        <button @click="goReport('other')" class="flex  px-4 w-[300px] my-auto mx-auto my-3 p-3 text-gray-700 bg-[#B9E9FC] rounded-xl drop-shadow-md
            md:w-[500px] 
            lg:w-[130px] lg:my-auto lg:block lg:bg-inherit 
            lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400
        ">

            <img src="../../../assets/report_icon/other.png" alt="Hardware" class="  w-[60px] h-[60px] p-2 ml-3 mr-4 
                    md:w-[80px] md:h-[80px]
                    lg:h-[80px] lg:w-[80px] lg:p-0 lg:mx-auto
                ">

            <div class="block w-full m-auto border-l-2 border-gray-700
                lg:border-0 
            ">
                <h3 class="mt-auto w-fit mx-auto font-semibold text-[16px]  
                    md:text-[35px]
                    lg:mt-2 lg:text-[18px]
                ">
                    Other
                </h3>
                <h3 class="w-fit mx-auto text-[16px]">
                    (อื่นๆ)
                </h3>
            </div>
        </button>
    </div>

    <!-- line -->
    <hr class="hidden mt-[30px] w-[1100px] h-[1px] border-0 mx-auto bg-gray-700 lg:block">

    <!-- searching -->
    <div v-if="params.service == 'it' && solutionList.length >= 4" class="relative w-[600px] h-[150px] mx-auto">
        <h3 class="mx-auto w-fit mt-4 text-[30px]">
            หรือค้นหาหัวข้อปัญหาที่คุณเจอ
        </h3>
        <div class="flex overflow-hidden w-[500px] h-[30px] mt-3 mx-auto border rounded-[20px] border-gray-400">
            <label for="searching" @click="findingKeyW(searching)">
                <img src="../../../assets/loupe.png" alt="" class="w-[20px] mx-3 inline-block">
            </label>
            <input id="searching" type="text" v-model="searching" placeholder="ลองพิมพ์ปัญหาของคุณมาสิ."
                class="w-[453px] focus:outline-0 my-auto">
        </div>
        <div class="ml-[70px] text-gray-500 text-[13px] mt-[2px]">
            เช่น อินเตอร์เน็ตใช้ไม่ได้ แป้นพิมพ์ใช้ไม่ได้ ปริ้นไม่ออก
        </div>
        <div class="absolute w-[440px] h-fit bg-gray-200 mx-[95px] mt-[-20px]">
            <div v-show="searching.length != 0" v-for="(data, index) in findingKeyW" :key="index" class="px-2 py-1.5 ">
                {{ data.solution_title }}
            </div>
        </div>
    </div>

    <!-- list article -->
    <!-- <div v-if="params.service == 'it'" class="grid grid-cols-2 grid-rows-2 gap-4 w-[1000px] mx-auto mt-3">
        <div v-for="(data, index) in ranArticle" :key="index" class="bg-gray-100 p-2 rounded-2xl hover:bg-gray-200">
            <img :src="data.img" alt="logo" class=" w-[45px] mx-3 mt-2">
            <h5 class="ml-[10px] mb-1.5 mt-2 text-[20px] font-semibold">
                {{ data.solution_title }}
            </h5>
            <p class="resize-none w-full h-[100px] px-2 text-[15px] text-ellipsis whitespace-normal break-words">
                {{ data.solution_text }}
            </p>
            {{ params.service }}
            <button @click="goHowTo(data.id)" class="w-fit text-left p-2 text-sky-500 hover:text-sky-700 block">
                ดูรายละเอียดเพิ่มเติม &#62;&nbsp;
            </button>
        </div>
    </div> -->


    <!-- list problems searching -->
    <div v-if="params.service == 'it'" class="grid grid-cols-2 grid-rows-2 gap-4 w-auto mx-3 mt-3">
        <div v-for="(data, index) in ranArticle" :key="index" class="bg-gray-100 p-2 rounded-2xl hover:bg-gray-200">
            <img :src="`${iconLink}/${data.solutionId}`" alt="logo" class=" w-[45px] mx-3 mt-2">
            <h5 class="ml-[10px] mb-1.5 mt-2 text-[20px] font-semibold">
                {{ data.solution_title }}
            </h5>
            <p class="resize-none w-full h-[100px] px-2 text-[15px] text-ellipsis whitespace-normal break-words">
                <span v-html="data.solution_text"></span>
            </p>
            <button @click="goHowTo(data.solutionId)" class="w-fit text-left p-2 text-sky-500 hover:text-sky-700 block">
                ดูรายละเอียดเพิ่มเติม &#62;&nbsp;
            </button>
        </div>
    </div>

    <!-- line -->
    <hr class="hidden mt-[30px] w-[1100px] h-[1px] border-0 mx-auto bg-gray-700
        lg:block
    ">
    <div class="w-[200px] h-fit mx-auto my-5 lg:mt-10 lg:my-0">
        <button @click="goService"
            class="w-full h-full mx-auto p-2 text-[20px] font-light text-gray-400 rounded-xl hover:bg-gray-400 hover:text-white">
            ย้อนกลับ
        </button>
    </div>
    <!-- </div>
</div> -->
</template>
<style scoped></style>