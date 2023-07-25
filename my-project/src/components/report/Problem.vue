<script setup>
import{ref,computed,onBeforeMount,onUpdated} from 'vue'
import toBackEnd from '../../JS/fetchToBack'
import getRefreshToken from '../../JS/refresh';
import jsCookie from '../../JS/cookies';

const path = `${import.meta.env.VITE_BACK_END_HOST}/images/problems`
const APPLICATION = `${path}/application`
const INTERNET =`${path}/internet`
const MEDIA = `${path}/media`
const MEETING =  `${path}/meeting`
const NEWS =  `${path}/news`
const PRINTER =  `${path}/printer`
const HARDWARE =  `${path}/hardware`
const SOFTWARE =  `${path}/software`
const WEBSITE = `${path}/website`

const problemIcon = [APPLICATION, INTERNET, MEDIA, MEETING, NEWS, PRINTER, HARDWARE, SOFTWARE, WEBSITE]

const problemsLink = `${import.meta.env.VITE_BACK_END_HOST}/problems`
const emit =defineEmits(["getProblemSelected"])
const props = defineProps({
    typeP:{
        type:String,
        required:true
    }
})

const token = ref('')

onBeforeMount(()=>{
    getProblems()
    getRefreshToken()
})

onUpdated(()=>{
    emit('getProblemSelected',{name:'problems',problems:problems.value,other_status:is_other.value})
})

// get from db
const problemList =ref([])
// selection
const problems =ref([])
//check other
const is_other=ref(false)
const otherSelection=()=>{
    let status =is_other.value
    is_other.value = !is_other.value
    addP('other')
    console.log('isother ? ',is_other.value)
    return status
}

// get problems
const getProblems=async()=>{
    let cuurentIcon = []
    token.value = JSON.parse(jsCookie.get("data")).token
    let[status,data]=await toBackEnd.getData('component_problem',`${problemsLink}/type/${props.typeP}`,token.value = JSON.parse(jsCookie.get("data")).token)
    if(status==200){
        problemList.value=data
        console.log(data)
        addProperty(problemList.value)
    }else{
        console.log(data)
    }
}

// add property
const addProperty =(v)=>{
    for(let data of v){
        data['selection']=false
    }
    // console.log(v)
}

// add problem
const addP =(v)=>{
    let check=false
    for(let value of problems.value){
        if(value==v)check=true;
    } 
    if(check==true){
        // console.log(problems.value.indexOf(v))
        problems.value.splice(problems.value.indexOf(v),1)
        // console.log(problems.value)

        // animation
        for(let value2 of problemList.value){
            if(value2.problemId==v){
                value2.selection= !value2.selection
            }  
        }
        check=false
        console.log(problems.value)
    }
    else if(check==false){
        problems.value.push(v)

        // animation
        for(let value2 of problemList.value){
            if(value2.problemId==v){
                value2.selection= !value2.selection
            }
            
        }
        // console.log(problemList.value)
        console.log(problems.value)
    }
}

const getImg = (problemId) => {
    let currentList = []
    let data = `${import.meta.env.VITE_BACK_END_HOST}/images/problems/${problemId}`
    currentList.push(data)
    return currentList
}
const getIcon = (problem_type) => {
    let currentList = []
    let path = `${import.meta.env.VITE_BACK_END_HOST}/images/problems/${problem_type}`
    problemIcon.forEach(i => {
        if (path == i) {
            currentList.push(path)
        }
    })
    return currentList
}

</script>
<template>
    <div class="w-full text-[17px] font-normal md:text-[25px] sm:w-fit">
        <h3 v-if="props.typeP=='hardware'">
            3. เลือก ปัญหา<span class="text-rose-500">Hardware</span> ที่ต้องการให้ช่วยเหลือ
        </h3>
        <h3 v-if="props.typeP=='software'">
            3. เลือก ปัญหา<span class="text-rose-500">Software</span> ที่ต้องการให้ช่วยเหลือ
        </h3>
        <h3 v-if="props.typeP=='internet'">
            3. เลือก ปัญหา<span class="text-rose-500">Internet</span> ที่ต้องการให้ช่วยเหลือ
        </h3>
        <h3 v-if="props.typeP=='printer'">
            1. เลือก ปัญหา<span class="text-rose-500">Printer</span> ที่ต้องการให้ช่วยเหลือ
        </h3>
        <h3 v-if="props.typeP=='website'">
            1. เลือก หัวข้อ <span class="text-rose-500">Website</span> ที่ต้องการให้ช่วยเหลือ
        </h3>
        <h3 v-if="props.typeP=='meeting'">
            1. เลือก หัวข้อ <span class="text-rose-500">Meeting</span> ที่ต้องการให้ช่วยเหลือ
        </h3>
        <h3 v-if="props.typeP=='application'">
            1. เลือก หัวข้อ <span class="text-rose-500">Application</span> ที่ต้องการให้ช่วยเหลือ
        </h3> 
        <h3 v-if="props.typeP=='media'">
            1. เลือก หัวข้อ <span class="text-rose-500">Media</span> ที่ต้องการให้ช่วยเหลือ
        </h3>
        <h3 v-if="props.typeP=='news'">
            1. เลือก หัวข้อ <span class="text-rose-500">News</span> ที่ต้องการให้ช่วยเหลือ
        </h3>                    
    </div>

    <div class="w-[300px] grid grid-cols-3 gap-y-2 gap-x-2 mt-4 mx-auto text-[15px] font-medium 
            sm:w-[400px] sm:grid-cols-4 sm:gap-y-2 sm:gap-x-1
            md:w-full 
            lg:sm:gap-y-4
    ">
    <!-- problems -->
        <button  v-for="(value,index) in problemList" :key="index" @click="addP(value.problemId)"  :style="[value.selection?'background-color:#1E88E5;color:#E3F2FD':'']" class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit ">
            <img :src="getImg(value.problemId)" alt="NoteBook" draggable="false" class="w-[30px] h-[60px] mx-auto md:w-[60px]" v-if="value.problem_upload">
            <img :src="getIcon(value.problem_type)" alt="NoteBook" draggable="false" class="w-[30px] h-[60px] mx-auto md:w-[60px]" v-else>
            <h3 class="truncate w-fit mx-auto mt-2 text-[0.625rem] md:text-[1.125rem]">
                <!-- {{value.problem_problem}} -->
                {{value.problem_problem}}
            </h3>
        </button>


        <!-- other -->
        <button  @click="otherSelection" :style="[is_other==true?'background-color:#1E88E5;color:#E3F2FD':'']"  class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit ">
            <img src="../../assets/report_icon/other.png" draggable="false" alt="other" class="w-[30px] mx-auto md:w-[60px]">
            <h3 class="truncate w-fit mx-auto mt-2 text-[0.625rem] md:text-[1.125rem]">
                อื่นๆโปรดระบุ
            </h3>
        </button> 
    </div>
</template>
<style scoped>
</style>