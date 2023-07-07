<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import toBackEnd from '../../../JS/fetchToBack';
import jsCookie from './../../../JS/cookies';
import getRefreshToken from './../../../JS/refresh';
import Cookies from './../../../JS/cookies';
import BaseShowProblem from '../../../components/problem-list/BaseShowProblem.vue';
import BaseLoading from '../../../components/BaseLoading.vue';

// const problemsLink='http://localhost:3000/problems'
const problemsLink = `${import.meta.env.VITE_BACK_END_HOST}/problems`
const iconLink = `${import.meta.env.VITE_BACK_END_HOST}/images/files/problems`

const problemList = ref([])
const name = ref('')
const subjectCr = ref('all')
const isUpload = ref(false)
const token = ref('')
const role = ref(JSON.parse(Cookies.get("data")).user_role)
const file = ref("")
const base64Img = ref("")



// length of problem name
const problemL = 20
// mode use for show template
const problemMode = ref("show")

const typeProblemsIT = ["hardware", "software", "internet", "printer", "website", "meeting", "application"]
const typeProblemsPR = ["media", "news"]

const get_status = ref(undefined)

const data_ch = computed(() => {
    return {
        problem_problem: problemName.value,
        problem_type: subjectCrInput.value
    }
})
const subjectCr = ref('all')
const subjectCrInput=ref('')
// get  problem
const getP = async (v) => {
    let status = undefined

    if (v != 'all') {
        token.value = JSON.parse(jsCookie.get("data")).token
        const [ss, data_problem] = await toBackEnd.getData('problem', `${problemsLink}/type/${v}`, token.value)
        console.log(ss)
        console.log(data_problem)

        if (ss == 200) {
            status = true
            problemList.value = data_problem.reverse()
            get_status.value=true
            splitProblems(currentPage.value)
            console.log(problemList.value)
        } else {
            status = false
            get_status.value=false
            console.log(data_problem)
        }
    } else {
        token.value = JSON.parse(jsCookie.get("data")).token
        const [ss, data] = await toBackEnd.getData('problem', problemsLink, token.value)
        if (ss == 200) {
            problemList.value = data.reverse()
            if (role.value == 'admin_it') {
                problemList.value = problemList.value.filter(p => typeProblemsIT.includes(p.problem_type))
            } else if (role.value == 'admin_pr') {
                problemList.value = problemList.value.filter(p => typeProblemsPR.includes(p.problem_type))
            }
            status = true
            get_status.value=true
            splitProblems(currentPage.value)
            console.log(data)
        } else {
            //status something
            status = false
            get_status.value=false
            console.log(data)
        }
    }

    return status
}

// split data
const maxOfPage = ref(8)
const maxOfL = ref(0)
const minOfL = ref(0)
const sumP = ref(0)
const problemSplit = ref([])
// const pageN=ref(1)
// for count N of page
const pageN = () => {
    let length = problemList.value.length / maxOfPage.value
    let number = Math.ceil(length)
    // sumP.value=number
    return number
}

// for click and first value
const currentPage = ref(1)
const splitProblems = (N) => {
    currentPage.value = N
    let max = (N * maxOfPage.value) - 1
    let min = (max - maxOfPage.value) + 1
    let arr = []
    for (let i = min; i <= max; i++) {
        if (problemList.value[i]) {
            arr.push(problemList.value[i])
        }
    }
    problemSplit.value = arr
    console.log(problemSplit.value)
    console.log('A max : ', max)
    console.log('A min : ', min)


    // if(data.length>8){
    //     for(let i=0;i>0;i++){
    //         problemSplit.value.push(data[i])
    //     }
    // }else{}
}

// display fn 
const display = ref(undefined)
const hoverFn = (b, n) => {
    display.value = b
    let eInfo = document.getElementById(`info_${n}`)
    let eEdit = document.getElementById(`edit_${n}`)
    let card = document.getElementById(`card_${n}`)

    // var element = document.getElementById("myDIV");
    //   element.classList.remove("mystyle");
    if (display.value == true) {
        // eInfo.style.visibility="hidden"
        // eEdit.style.visibility="visible"
        eInfo.style.display = "none"
        eEdit.style.display = "block"
        card.style.background = "#C2E1FD"

        // console.log('hover',n)
    } else {
        // eInfo.style.visibility="visible"
        // eEdit.style.visibility="hidden"
        eEdit.style.display = "none"
        eInfo.style.display = "block"
        card.style.background = "#EAE0D5"
    }

}

// add new problem
const addProblem = async () => {
    let {problem_problem,problem_type} = data_ch.value
    
    if(problem_problem.length!=0&&problem_type.length!=0){
        token.value = JSON.parse(jsCookie.get("data")).token
        let [status, data] = await toBackEnd.postData('problem', problemsLink, data_ch.value, token.value)

        if (status == 200) {
            console.log('add problem success 😏')
            console.log(data)
            getP(subjectCr.value)
        } else {
            console.log(data)
        } 
    }else{
        console.log('pls input data before submit!!')
    }
    
}

// delete problems
const removeProblem = async (id) => {
    console.log(id)
    token.value = JSON.parse(jsCookie.get("data")).token
    let [status, data] = await toBackEnd.delete("problem", problemsLink, id, token.value)
    if (status == 200) {
        console.log(data)
        getP(subjectCr.value)
        if (problemList.value.length <= maxOfPage.value) {
            splitProblems(1)
        }
    } else {
        console.log(data)
    }
}

// edit
const editProblem = () => {
    console.log('this is edit')
}

onBeforeMount(() => {
    getP(subjectCr.value)
    getRefreshToken(JSON.parse(jsCookie.get("data")).refreshToken)
})

// auto change subject 
const subjectCh = (event) => {
    let type = event.target.value.trim()
    if (type != subjectCr.value) {
        subjectCr.value = type
        console.log('change from subject', subjectCr.value)
        getP(type)
    } else
        if (type == subjectCr.value) {
            console.log('subject not change :', subjectCr.value)
        }
}

const getDataFromComponent = (value) => {
    console.log(value)
    if (value.status == true) removeProblem(value.id)
}

const changeMode = (mode) => {
    if (mode == "add") {
        problemMode.value = "add"
    } else {
        problemMode.value = "show"
        getP(subjectCr.value)
    }
}

function onFileChanged($event) {
    const target = $event.target;
    if (target && target.files) {
        file.value = target.files[0];
        encodeImage(file.value)
    }
}

function encodeImage(input) {
    if (input) {
        const reader = new FileReader()
        reader.onload = (e) => {
            base64Img.value = e.target.result
        }
        reader.readAsDataURL(input)
    }
}


// Enter edit mode
const serviceName=ref('')
const isEdit=ref(false)
const editMode =(service=undefined)=>{
    if(service==undefined){
        isEdit.value=false
        serviceName.value=''
        getP('all')
        console.log('edit mode false')
    }else{
        isEdit.value=true
        serviceName.value=service
        
        console.log('edit mode true')
    }
}
</script>
<template>
    <!-- wait -->
    <div v-if="get_status == undefined">
        <div class=" bg-white w-full mx-auto  h-fit ">
            <div class="w-full text-center font-semibold text-[40px]">
                <div class="my-auto w-fit mx-auto mt-[250px]">
                    <!-- <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4"> -->
                    <BaseLoading />
                    <!-- <button @click="getEvents()" class="mt-6 bg-rose-300 focus:bg-rose-400 text-gray-700 focus:text-whte px-2 mx-auto rounded-lg">
                            Refresh
                        </button>   -->
                </div>
            </div>
        </div>
    </div>
    <!-- no data -->
    <div v-else-if="get_status == false">
        <div class=" bg-white w-full mx-auto  h-fit ">
            <div class="w-full text-center font-semibold text-[40px]">
                <div class="my-auto w-fit mx-auto mt-[250px]">
                    <!-- <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4"> -->
                    <h4>
                        No data try again later .😏
                    </h4>
                    <!-- <button @click="getEvents()" class="mt-6 bg-rose-300 focus:bg-rose-400 text-gray-700 focus:text-whte px-2 mx-auto rounded-lg">
                            Refresh
                        </button>   -->
                </div>
            </div>

        </div>
    </div>

    <!-- can get data but no data (clean) -->
    <div v-else-if="get_status == false || problemList.length == 0" class="show_up">
        <div class=" bg-white w-full mx-auto  h-fit ">
            <div class="w-full text-center font-semibold text-[40px]">
                <div class="my-auto w-fit mx-auto mt-[250px]">
                    <!-- <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4"> -->
                    <h4>
                        Can get data but no data.😏
                    </h4>
                    <h4 class="text-[25px]">
                        Wait for user send request.👌
                    </h4>
                    <!-- <button @click="getEvents()" class="mt-6 bg-rose-300 focus:bg-rose-400 text-gray-700 focus:text-whte px-2 mx-auto rounded-lg">
                            Refresh
                        </button>   -->
                </div>
            </div>
        </div>
    </div>
    <div class="overflow-y-auto relative show_up">
        <div class=" bg-white w-full mx-auto  h-fit ">
            <div class="w-full text-center font-semibold text-[40px] mt-2">
                <div class="flex w-fit mx-auto tracking-wide">
                    <img src="./../../../assets/admin_page/problem.png" alt="users_icon"
                        class="w-[40px] h-[40px] my-auto mr-4">
                    <h4>
                        Problems List
                    </h4>
                </div>
            </div>
            <!-- button
                        <div class="   right-[80px] top-[115px]  absolute">
                            <button @click="isFilter= !isFilter" class="flex w-fit">
                                <span class="font-semibold my-auto">
                                    ตัวกรอง
                                </span> 
                                <img src="../../../assets/admin_page/filter.png" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
                            </button>
                        </div> -->

            <!-- filter
                        <div v-show="isFilter==true" class="w-fit mx-auto absolute">
                            <div class="flex ">
                                <div class="p-3">
                                    testing filter
                                </div>
                                <div class="p-3">
                                    testing filter
                                </div>
                                <div class="p-3">
                                    testing filter
                                </div>
                                <div class="p-3">
                                    testing filter
                                </div>
                            </div>
                        </div> -->
                        
            </div>

            <!-- for select type service -->
            <div v-if="isEdit==false" class="relative flex flex-col w-full mx-auto  h-full  mt-[7%]">
                <button @click="editMode('IT')" class="flex flex-row w-[550px] h-[150px] p-2 bg-[#8FC9F7] m-auto rounded-xl hover:bg-[#3CA9FF]">
                    <img src="../../../assets/IT_service.png" alt="it_service_image" class="w-[110px] h-[110px] m-auto">
                    <div class=" w-[250px] h-fit p-3 m-auto ">
                        <h4 class="text-[35px] font-semibold text-[#353535]">
                            IT Service
                        </h4>
                        <h5 class="text-[15px]">
                            ศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ
                        </h5>
                    </div>
                </button >
                <button @click="editMode('PR')"  class="flex flex-row w-[550px] h-[150px] p-2 bg-[#8FC9F7] m-auto mt-[3%] rounded-xl hover:bg-[#3CA9FF]">
                    <img src="../../../assets/PR_service.png" alt="it_service_image" class="w-[110px] h-[110px] m-auto">
                    <div class=" w-[250px] h-fit p-3 m-auto ">
                        <h4 class="text-[35px] font-semibold text-[#353535]">
                            PR Service
                        </h4>
                        <h5 class="text-[15px]">
                            สื่อสารและรณรงค์ทางสังคม
                        </h5>
                    </div>
                </button >
            </div>

            <!-- infomation of service -->
            <div v-else-if="isEdit==true" class="relative w-full mx-auto  h-full ">
                <h5 class="m-3 text-[30px] font-semibold">
                    {{ serviceName }} Service
                    <!-- {{ serviceName }} -->
                </h5>
                <div class="flex justify-around mb-4">
                    <button @click="editMode()" class="ml-4 p-3">
                        &lt; ย้อนกลับ
                    </button>
                    <!-- menu -->
                    <div class="flex w-fit h-fit m-auto">
                        <button @click="problemMode='add'" class="p-3 mx-6 bg-gray-300 rounded-xl">
                            เพิ่มหัวข้อปัญหา
                        </button>
                        <button @click="problemMode='show'" class="p-3 mx-6 bg-gray-300 rounded-xl">
                            หัวข้อปัญหาทั้งหมด
                        </button>    
                    </div>
                </div>
                
                <hr class="w-[600px] h-fit mx-auto mb-4 border-1 border-gray-400">

                <!-- form for input problem -->
                <div v-if="problemMode=='add'" class="flex flex-col w-fit h-fit m-auto">
                    <h5 class="mb-3 font-medium text-[20px] text-center font-medium">
                        {{ serviceName }} Service
                    </h5>
                    <div class="flex font-light">
                        <h5 class=" shrink w-[150px] m-auto text-right">
                            หัวข้อปัญหา
                        </h5>
                        <input v-model="problemName" type="text" :maxlength="problemL" class="grow ml-3 p-2 border-2 border-gray-300 rounded-xl">
                    </div>
                    <div class="flex mt-2 font-light">
                        <h5 class="shrink w-[150px]  m-auto text-right">
                            หมวดหมู่ของปัญหา
                        </h5>
                            <select v-model="subjectCrInput"  name="type_problem" id="type_problem" class="grow ml-3 p-2 border-2 border-gray-300 rounded-xl">
                                <option value="" selected disabled>เลือกหมวดหมู่</option>
                            <option v-if="serviceName=='IT'" v-for="(type,index) in typeProblemsIT" :key="index" :value="type">{{type}}</option>
                            <option v-if="serviceName=='PR'" v-for="(type,index) in typeProblemsPR" :key="index" :value="type">{{type}}</option>

                </div>
                <button @click="addProblem" class="mt-4 p-2 bg-gray-300 hover:bg-gray-500 focus:bg-gray-300 rounded-xl">
                    สร้างหัวข้อปัญหา
                </button>
            </div>


            <!-- show all problem -->
            <div v-else-if="problemMode == 'show'" class="w-fit h-fit m-auto">
                <!-- <hr class="mt-3 bg-gray-700  w-full h-[3px]"/> -->
                <!-- select type -->
                <div class=" flex w-fit h-[53px] mt-[20px] ml-[20px]   ">
                    <!-- select type -->
                    <div class="relative w-[250px] h-full">
                        <h4 v-show="subjectCr != 'none'" class="text ml-2 text-sm font-semiboldd text-[#6FA1CE]">
                            Type of subject
                        </h4>
                        <select @change="subjectCh" name="subject" id="subject"
                            class="absolute bottom-0 w-[200px] bg-[#6FA1CE] text-[#0A0908] text-[0.875rem] font-light rounded-lg p-[1px]  px-[10px]">
                            <!-- <option value="none" selected hidden>Type of subject</option> -->
                            <option value="all" selected>All Problem</option>
                            <option v-if="['admin_it', 'super_admin'].includes(role)" value="hardware">Hardware</option>
                            <option v-if="['admin_it', 'super_admin'].includes(role)" value="software">Software</option>
                            <option v-if="['admin_it', 'super_admin'].includes(role)" value="internet">Internet</option>
                            <option v-if="['admin_it', 'super_admin'].includes(role)" value="printer">Printer</option>
                            <option v-if="['admin_it', 'super_admin'].includes(role)" value="website">Website</option>
                            <option v-if="['admin_it', 'super_admin'].includes(role)" value="meeting">Meeting</option>
                            <option v-if="['admin_it', 'super_admin'].includes(role)" value="application">Application
                            </option>
                            <option v-if="['admin_pr', 'super_admin'].includes(role)" value="media">Media</option>
                            <option v-if="['admin_pr', 'super_admin'].includes(role)" value="news">News</option>
                        </select>
                    </div>
                    <button @click="addProblem" class="mt-4 p-2 bg-gray-300">
                        สร้างหัวข้อปัญหา
                    </button>
                </div>


                <!-- show all problem -->
                <div v-else-if="problemMode=='show'" class="w-fit h-fit m-auto">
                    <!-- <hr class="mt-3 bg-gray-700  w-full h-[3px]"/> -->
                    <!-- select type -->
                    <div class=" flex w-fit h-[53px] mt-[20px] ml-[20px]   ">
                        <!-- select type -->
                        <div class="relative w-[250px] h-full">
                            <h4 v-show="subjectCr != 'none'" class="text ml-2 text-sm font-semiboldd text-[#C6AC8F]">
                                Type of subject
                            </h4>
                            <select @change="subjectCh" name="subject" id="subject"
                                class="absolute bottom-0 w-[200px] bg-[#C6AC8F] text-[#0A0908] text-[0.875rem] font-light rounded-lg p-[1px]  px-[10px]">
                                <!-- <option value="none" selected hidden>Type of subject</option> -->
                                <option value="all" selected>All Problem</option>
                                <option v-if="serviceName=='IT'" v-for="(type,index) in typeProblemsIT" :key="index" :value="type">{{type}}</option>
                                <option v-if="serviceName=='PR'" v-for="(type,index) in typeProblemsPR" :key="index" :value="type">{{type}}</option>

                            </select>
                        </div>

                        <!-- add new problem -->
                        <!-- <div class="relative overflow-visible flex w-[300px] h-[50px] my-auto    ">
                                    <div class="relative w-[20px] z-10">
                                        <button class=" inset-0 top-[-20px] w-[50px] h-[50px] my-auto bg-gray-300 p-2 text-[40px] font-light rounded-[50%]">
                                            <hr class="w-full h-[4px] bg-gray-800 ">
                                            <hr class="w-[4px] h-full bg-gray-800 ">
                                        </button>                            
                                    </div>

                                    <div class="relative w-[150px] h-[40px] bg-sky-800 z-0">
                                        <input type="text" class="absolute bottom-0 w-[] my-auto ml-10 bg-rose-300 ">
                                    </div>
                                </div> -->

                    <!-- add new problem ใช้ไปก่อน-->
                    <!-- <div class="flex bg-gray-500 my-auto px-2 py-1.5 rounded-3xl">
                    
                            <input v-model="name" type="text" class=" bg-gray-300 pl-2 p-1 rounded-l-xl focus:outline-0" />
                
                            <button @click="addProblem" class="bg-gray-500 px-2 rounded-r-3xl text-white ">
                                Create Problem
                            </button>
                        </div> -->
                </div>

                <div>
                    <BaseShowProblem @get-data-status="getDataFromComponent" :problems="problemSplit" />
                    <!-- page -->
                    <div class=" inset-x-0 bottom-0 flex w-fit mx-auto mt-4">
                        <button @click="splitProblems(N)" v-for="N in pageN()"
                            class=" w-full px-4 py-1 mx-2 text-[15px] bg-[#6FA1CE] text-[#C2E1FD] font-bold rounded-full focus:bg-[#C2E1FD] focus:text-[#6FA1CE] ">
                            {{ N }}
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </div>
    <!-- </div> -->
</template>
<style scoped>
.text {
    animation: tada 2s
}



@keyframes tada {
    0% {
        opacity: 0%;
    }

    100% {
        opacity: 100%;
    }
}
</style>