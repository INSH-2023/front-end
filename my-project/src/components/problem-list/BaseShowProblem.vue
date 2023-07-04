<script setup>
import { ref, onUpdated, onMounted } from 'vue'

import Application from './../../assets/problem/application.png'
import Internet from './../../assets/problem/internet.png'
import Media from './../../assets/problem/media.png'
import Meeting from './../../assets/problem/meeting.png'
import News from './../../assets/problem/news.png'
import Printer from './../../assets/problem/printer.png'
import Hardware from './../../assets/problem/hardware.png'
import Software from './../../assets/problem/software.png'
import Website from './../../assets/problem/website.png'
import jsCookie from './../../JS/cookies';

const problemIcon = [Application, Internet, Media, Meeting, News, Printer, Hardware, Software, Website]

const emit = defineEmits(["getDataStatus"])
const props = defineProps({
    problems: {
        type: Array,
        required: true
    }
})
const getStatus = ref(false)
onUpdated(() => {
    emit('getDataStatus', { status: getStatus })
    console.log(props.problems)
})
onMounted(() => {
    console.log("helloooooo")
    console.log(props.problems)
})

// const problemsLink='http://localhost:3000/problems'
// const problemsLink = `${import.meta.env.VITE_BACK_END_HOST}/problems`

const problemList = ref([])
// const name = ref('')
// const token = ref('')


// const subjectCr = ref('all')

// const isEdit = ref(false)


// split data
const maxOfPage = ref(8)
// const maxOfL = ref(0)
// const minOfL = ref(0)
// const sumP = ref(0)
const problemSplit = ref([])
// const pageN=ref(1)
// for count N of page
// const pageN = () => {
//     let length = problemList.value.length / maxOfPage.value
//     let number = Math.ceil(length)
//     // sumP.value=number
//     return number
// }

// for click and first value
const currentPage = ref(1)

const token = ref()

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
        card.style.background = "#6FA1CE"

        // console.log('hover',n)
    } else {
        // eInfo.style.visibility="visible"
        // eEdit.style.visibility="hidden"
        eEdit.style.display = "none"
        eInfo.style.display = "block"
        card.style.background = "#C2E1FD"
    }

}

// delete problems
const removeProblem = async (id) => {
    console.log(id)
    getStatus.value = true
    emit('getDataStatus', { status: getStatus.value, id: id })

    // token.value = JSON.parse(jsCookie.get("data")).token
    // let [status, data] = await toBackEnd.delete("problem", problemsLink, id, token.value)
    // if (status == 200) {
    //     console.log(data)

    //     if (problemList.value.length <= maxOfPage.value) {
    //         splitProblems(1)
    //     }
    // } else {
    //     console.log(data)
    // }

}

const getImg = (problemId) => {
    let currentList = []
    token.value = JSON.parse(jsCookie.get("data")).token
    let data = `${import.meta.env.VITE_BACK_END_HOST}/images/files/problems/${problemId}`
    currentList.push(data)
    return currentList
}
const getIcon = (problem_type) => {
    let currentList = []
    let path = `/src/assets/problem/${problem_type}.png`
    problemIcon.forEach(i => {
        if (path == i) {
            currentList.push(path)
        }
    })
    return currentList
}

</script>
<template>
    <!-- การ์ด problems -->
    <div class=" grid grid-cols-4 gap-4 w-[900px] h-fit mt-[15px]  text-center">
        <div :id="`card_${index}`" @mouseover="hoverFn(true, index)" @mouseleave="hoverFn(false, index)"
            v-for="(p, index) in props.problems" :key="index"
            class="card block w-full h-[8.438rem] mx-auto bg-[#C2E1FD] rounded-lg">
            <div :id="`info_${index}`" class="info ">
                <img :src="getImg(p.problemId)" alt="logo" class="w-[60px] h-[60px] mx-auto mt-4 " v-if="p.problem_upload">
                <img :src="getIcon(p.problem_type)" alt="logo" class="w-[60px] h-[60px] mx-auto mt-4 " v-else>
                <!-- ชื่อ -->
                <h4 class="text-[0.875rem] mt-4 font-light">
                    {{ p.problem_problem }}
                </h4>
            </div>
            <div :id="`edit_${index}`" style="display: none;" class="edit  mt-[20px]">
                <h4 class="w-full font-semibold text-[0.938rem] text-[#FFFFFF] cursor-default">
                    {{ p.problem_problem }}
                </h4>
                <!-- edit button -->
                <!-- <div class="w-full h-fit mt-3">
                            <button @click="editProblem" class="bg-[#0A0908] text-[#EAE0D5] text-[20px] px-4 py-2 font-light hover:bg-[#EAE0D5] hover:text-[#0A0908] rounded-lg">
                                แก้ไขข้อมูล
                            </button>
                        </div> -->

                <!-- delete card -->
                <div class="w-full h-fit mt-3">
                    <button @click="removeProblem(p.problemId)"
                        class=" bg-[#C1121F] text-[#FDF0D5] text-[20px] px-4 py-2 font-light hover:bg-rose-300 hover:text-gray-600 rounded-lg">
                        Delete
                    </button>
                </div>
            </div>
            <!-- <button @click="">splitProblems</button> -->
        </div>
    </div>
</template>
<style scoped></style>