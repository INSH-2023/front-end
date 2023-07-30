<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import getRefreshToken from './../../../JS/refresh';
import toBackEnd from '../../../JS/fetchToBack';
import BaseLoading from '../../../components/BaseLoading.vue'
const myRouter = useRouter()
const isFilter = ref(false)
const keyword = ref("")
const tagF = ref("")
const solutionList = ref([])
const filterList = ref([])
const showList = ref([])
// const solutionLink ='http://localhost:3000/solutions'
const solutionLink = `${import.meta.env.VITE_BACK_END_HOST}/solutions`
const iconLink = `${import.meta.env.VITE_BACK_END_HOST}/images/solutions`
const solution = ref('')
const token = ref('')
const get_status = ref(undefined)
// const isEdit = ref(false)

// get solution
const getSolu = async (id = undefined) => {
    let status = false
    // token.value =validate.getUserDataFromLocal('token') 
    if (id == undefined) {
        let [s, data] = await toBackEnd.getData('solution', solutionLink, token.value)
        if (s == 200) {
            solutionList.value = data.reverse()
            showList.value = solutionList.value
            get_status.value = true
            status = true
            splitSolutions(currentPage.value)
            console.log('get Solution success')
        } else {
            get_status.value = false
            console.log('error something cannot get solution')
        }
    } else {
        let [s, data] = await toBackEnd.getDataBy('user', solutionLink, id, token.value)
        if (s == 200) {
            solution.value = data
            get_status.value = true
            status = true
            console.log('get Solution success')
        } else {
            console.log('error something cannot get solution')
            get_status.value = false
        }
    }
    return status
}

// delete
const deleteItem = async (v) => {
    changePath("#dele")
    // token.value = validate.getUserDataFromLocal('token')
    let [status] = await toBackEnd.delete('solution', solutionLink, v, token.value)
    if (status == 200) {
        console.log('delete success')
        getSolu()
        changePath()
    } else {
        console.log('can not delete data error something')
    }
}

// check obj empty
const isEmptyOBJ = computed(() => {
    let boolean = Object.keys(solution.value).length === 0 && solution.value.constructor === Object
    console.log(boolean)
    return boolean
})

// showInfo
const showInfoByID = async (v) => {
    solution.value = {}

    let status = false
    console.log('value : ', v)

    status = await getSolu(v)

    if (status && !isEmptyOBJ.value) {
        changePath('#showInfo')
    } else {
        console.log('error to show detail of user')
    }
}

const changePath = (path = '#') => {
    window.location.href = path
}

const resetF = () => {
    keyword.value = ''
    tagF.value = []
    showList.value = solutionList.value
}

const searchByKeyW = () => {
    soluSplit.value = []
    filterList.value = solutionList.value
    // console.log(f_status.value)
    currentPageList.value = 1
    currentPage.value = 1

    // email
    // if(f_email.value.length != 0){
    //     filterList.value = requestList.value.filter(e=>e.request_email.toLowerCase().includes(f_email.value.toLowerCase()))
    //     console.log('this  email filter : '+f_email.value)
    // }

    // solution title or description and tag
    filterList.value = solutionList.value.filter(e =>
            ( keyword.value.length == 0 ? true :
            e.solution_title.toLowerCase().includes(keyword.value.toLowerCase()) || e.solution_text.toLowerCase().includes(keyword.value.toLowerCase()) ) &&
            (tagF.value.length == 0 ? true : e.solution_tag.includes(tagF.value))
    )

    maxPage.value = Math.ceil(filterList.value.length / maxOfPage.value)
    console.log(maxPage.value)

    // solution tag
    showList.value = filterList.value
    splitSolutions(1)
    console.log(showList.value)
    console.log(filterList.value)
}

const tagList = computed(() => {
    let tags = []
    solutionList.value.forEach(sol => {
        sol.solution_tag.forEach(tag => {
            if (!tags.includes(tag)) {
                tags.push(tag)
            }
        })
    })
    return tags
})

// split data
// const maxOfL = ref(0)
// const minOfL = ref(0)
// const sumP = ref(0)
const maxOfPage = ref(8)
const soluSplit = ref([])
const pageN=ref(5)
const currentPageList=ref(1)
const maxPage = ref(Math.ceil(solutionList.value.length / maxOfPage.value))
// for count N of page
const pageLeft = () => {
    // let length = problemList.value.length / maxOfPage.value
    // let number = Math.ceil(length)
    currentPageList.value=currentPageList.value-1
    // sumP.value=number
    // return number
}

// for count N of page
const pageRight = () => {
    // let length = problemList.value.length / maxOfPage.value
    // let number = Math.ceil(length)
    currentPageList.value=currentPageList.value+1
    // sumP.value=number
    // return number
}

// for click and first value
const currentPage = ref(1)
const splitSolutions = (N) => {
    soluSplit.value = []
    currentPage.value = N
    let max = (N * maxOfPage.value) - 1
    let min = (max - maxOfPage.value) + 1
    for (let i = min; i <= max; i++) {
        if (showList.value[i]) {
            soluSplit.value.push(showList.value[i])
        }
    }
    console.log(soluSplit.value)
    console.log('A max : ', max)
    console.log('A min : ', min)
}


onBeforeMount(() => {
    // let refreshToken=validate.getUserDataFromLocal('refreshToken')
    getSolu(),
        changePath()
        getRefreshToken()
})
</script>
<template>
    <!-- wait -->
    <div v-if="get_status == undefined">
        <div class=" bg-white w-full mx-auto h-fit ">
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
    <!-- can get data but no data (clean) -->
    <div v-else-if="get_status == false || solutionList.length == 0" class="show_up">
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

    <div v-else-if="get_status == true" class="show_request show_up">
        <div class=" bg-white w-full mx-auto h-fit">
            <div class="w-full text-center font-semibold text-[40px] pt-6">
                <div class="flex w-fit mx-auto">
                    <img src="../../../assets/admin_page/document.png" alt="users_icon"
                        class="w-[40px] h-[40px] my-auto mr-4">
                    All Solution
                </div>
            </div>

            <!-- filter -->
            <div class="relative h-[40px] mx-auto right-0">
                <div v-show="isFilter == true" class="absolute w-fit h-fit bottom-0">
                    <div class="flex">
                        <div class="px-2">
                            <input type="text" placeholder="searching "
                                class="w-[200px] h-[30px] p-3 bg-gray-300 rounded-lg focus:outline-0" v-model="keyword">
                        </div>
                        <!-- <div class="px-2 my-auto">
                            <label for="title">
                                Title :
                            </label>
                            <select name="title" id="title" class="focus:outline-0 cursor-pointer">
                                <option value="">มากไปน้อย</option>
                                <option value="">น้อยไปมาก</option>
                            </select>
                        </div> -->
                        <div class="px-2">
                            <label for="title">
                                Tag :
                            </label>
                            <select name="title" id="title" class="focus:outline-0 cursor-pointer" v-model="tagF">
                                <option v-for="tag in tagList" :value="tag">{{ tag }}</option>
                            </select>
                        </div>
                        <div class="flex px-2 font-light">
                            <button @click="resetF"
                                class="px-3 mx-1 bg-gray-500 text-rose-300 rounded-xl hover:text-gray-500 hover:bg-rose-300">
                                รีเซต
                            </button>

                            <button @click="searchByKeyW" class="px-3 mx-1 bg-gray-300 rounded-xl">
                                ค้นหา
                            </button>
                        </div>
                        <!-- <div class="p-3">
                            testing filter
                        </div> -->
                    </div>
                </div>
                <!-- button -->
                <div class="right-[20px] buttom-0 absolute">
                    <button @click="isFilter = !isFilter" class="flex w-fit">
                        <span class="font-semibold my-auto">
                            ตัวกรอง
                        </span>
                        <img src="../../../assets/admin_page/filter.png" alt="icon" class="w-[20px] ml-[5px] my-auto">
                    </button>
                </div>
            </div>
        </div>

        <!-- table -->
        <div class="w-auto mx-auto h-[420px] mt-2">
            <hr class="mt-3 bg-gray-700 w-[100%] h-[3px]">
            <div class="overflow-y-auto mx-auto h-[100%] w-[100%] border-b-2 boder-gray-500">
                <table class="relative w-full table-fixed text-sm text-center text-gray-800">
                    <thead class="absolute bg-white text-lg sticky top-0 z-10 border-b-2 border-b-gray-500">
                        <tr class="text-[20px]">
                            <th scope="col" class="py-2 px-6 w-[250px]">
                                Title
                            </th>
                            <th scope="col" class="py-2 px-6 w-[100px]">
                                Icon
                            </th>
                            <th scope="col" class="py-2 px-6 w-[210px]">
                                Tag
                            </th>
                            <th scope="col" class="py-2 px-6 w-[400px]">
                                Description
                            </th>
                            <th scope="col" class="py-2 px-6">
                                Detail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in soluSplit" :key="index"
                            class="text-[15px]  bg-white border-b-2 border-gray-300 hover:border-gray-400 hover:bg-gray-400">
                            <td class="w-[140px] font-medium px-6 py-4 text-left">
                                <div class="w-[130px] font-semibold truncate mx-auto text-center">
                                    {{ data.solution_title }}
                                </div>
                            </td>
                            <td class="w-[90px] px-6 py-4 font-semibold ">
                                <img :src="`${iconLink}/${data.solutionId}`" alt="" class="w-[40px] mx-auto">
                            </td>
                            <td class="w-[140px] px-3 py-4 font-semibold ">
                                <div class="w-[200px] truncate mx-auto">
                                    <span v-for="(tag, index) in data.solution_tag" :key="index"
                                        class="bg-gray-200 p-2 mx-1 w-full text-gray-800">
                                        {{ tag }}
                                    </span>
                                </div>
                            </td>
                            <td class="w-[300px] px-3 py-4">
                                <div class="w-[300px] truncate mx-auto">
                                    <span v-html="data.solution_text"></span>
                                </div>
                            </td>
                            <td class="w-[90px] px-6 py-4 font-semibold">
                                <div class="flex w-fit mx-auto truncate ">
                                    <img @click="showInfoByID(data.solutionId)" src="../../../assets/admin_page/edit.png"
                                        alt="detail_icon" class="w-[28px] m-2 cursor-pointer">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- page -->
        <div class=" inset-x-0 bottom-0 flex w-fit mx-auto mt-4">
            <button @click="pageLeft()" v-if="currentPageList > 1"
                class=" w-full px-4 py-1 mx-2 text-[15px] bg-[#6FA1CE] text-[#C2E1FD] font-bold rounded-full hover:bg-[#C2E1FD] hover:text-[#6FA1CE]">
                &lt;
            </button>
            <button @click="splitSolutions(N + currentPageList - 1)" v-for="N in (showList.length < maxOfPage*pageN ? maxPage : pageN)"
                class="w-full px-4 py-1 mx-2 text-[15px] bg-[#6FA1CE] text-[#C2E1FD] font-bold rounded-full"
                :style="[currentPage == N + currentPageList - 1 ? { 'background-color': '#C2E1FD', 'color': '#6FA1CE' } : {}]">
                {{ N + currentPageList - 1 }}
            </button>
            <button @click="pageRight()" v-if="currentPageList < maxPage - pageN + 1"
                class=" w-full px-4 py-1 mx-2 text-[15px] bg-[#6FA1CE] text-[#C2E1FD] font-bold rounded-full hover:bg-[#C2E1FD] hover:text-[#6FA1CE]">
                &gt; 
            </button>
        </div>
    </div>
    <!-- show detail -->
    <div id="showInfo" class="overlay">
        <div class="popup2 h-auto">
            <div class="h-[100%] p-3 overflow-y-auto">
                <div class="w-full">
                    <h4 class="w-fit h-fit mx-auto font-semibold text-[30px] text-gray-500">
                        Article Detail
                    </h4>
                </div>

                <!-- solution detail -->
                <!-- <div v-if="isEdit == false"> -->
                <!-- table -->
                <div>
                    <table class="w-full table-fixed mx-auto mt-6 text-[20px]">
                        <!-- title -->
                        <tr>
                            <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                Title
                            </th>
                            <td class="pt-2 pl-2 indent-[5px] font-semibold text-gray-600 ">
                                {{ solution.solution_title }}
                            </td>
                        </tr>
                        <!-- description -->
                        <tr>
                            <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                Description
                                <!-- <span> 
                                            {{  }}
                                        </span> -->
                            </th>
                            <td class="pt-2 pl-2 indent-[5px]">
                                <span v-html="solution.solution_text"></span>
                            </td>
                        </tr>

                        <!-- tag -->
                        <tr>
                            <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                Tag
                            </th>
                            <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                <span v-for="(tag, index) in solution.solution_tag" :key="index"
                                    class="bg-gray-200 px-2 py-1 mx-1 w-full text-gray-800 rounded-xl">
                                    {{ tag }}
                                </span>
                            </td>
                        </tr>

                        <!-- icon -->
                        <tr>
                            <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                Icon
                            </th>
                            <td class="pt-2 pl-2 indent-[5px]">
                                <img :src="`${iconLink}/${solution.solutionId}`" class="w-[40px]">
                            </td>
                        </tr>
                    </table>

                    <!-- solutions -->
                    <div>
                        <div v-for="(step, index) in solution.solution_steps" :key="index">
                            <h2 class="table_header w-[120px] h-fit pt-2 text-right font-bold text-[24px]">
                                Steps {{ step.step_ }} &nbsp;
                            </h2>
                            <div class="mx-[60px]">
                                <b class="pt-2 pl-2 indent-[5px] text-left text-[20px]">
                                    {{ step.step_name }}
                                </b>
                                <p class="pt-2 pl-1 indent-[5px] text-[16px]">
                                    <span v-html="step.step_description"></span>
                                </p>
                                <img v-if="step.step_upload != 0"
                                    :src="`${iconLink}/${solution.solutionId}?step=${step.step_}`" class="w-[250px]">
                            </div>
                        </div>
                    </div>

                    <div class="w-full flex mt-6 mb-1.5">
                        <a href="#dele"
                            class="w-[200px] h-[50px] px-5 mx-auto text-[15px] font-light text-rose-400 bg-gray-300 rounded-2xl hover:bg-rose-400 hover:text-gray-200">
                            <button class="w-full h-full ">
                                ลบข้อมูล
                            </button>
                        </a>
                    </div>
                </div>
                <div class="absolute top-[15px] right-[15px] font-bold text-[30px]">
                    <a @click="changePath()" id="close_info" href="#" class="">
                        <img src="../../../assets/admin_page/close.png" alt="close_icon" class="w-[20px]">
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
    <!-- delete -->
    <div id="dele" class="overlay">
        <div class=" verify_d h-96 overflow-hidden rounded-2xl">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะลบข้อมูลนี้หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <button @click="deleteItem(solution.solutionId)"
                    class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    ลบเลย !!
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
::selection {
    background-color: black;
    color: white;
    text-transform: uppercase;
}

/* info detail */
/* submit */
.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 500ms;
    visibility: hidden;
    opacity: 0;
    z-index: 50;
}

.overlay:target {
    visibility: visible;
    opacity: 1;
}

.popup2 {
    margin: auto;
    margin-top: 3%;
    /* overflow-y: auto; */
    padding: 35px;
    padding-top: 45px;
    padding-left: 30px;
    padding-right: 16px;
    background: #fff;
    width: 60%;
    height: 600px;
    border-radius: 20px;
    position: relative;
    transition: all 5s ease-in-out;
}

.popup2 h2 {
    margin-top: 0;
    color: #333;
}

.popup2 .option {
    bottom: 0;
}

@media screen and (max-width: 700px) {
    .popup2 {
        width: 70%;
    }

    .verify_s {
        width: 70%;
    }

    .option {
        width: 20%;
    }
}

.verify_s {
    margin: auto;
    margin-top: 20%;
    /* overflow-y: auto; */
    /* padding: 2px; */
    padding-top: 2px;
    /*padding-left: 30px;
  padding-right: 16px; */
    background: #fff;
    width: 20%;
    height: 150px;
    /* border-radius: 20px; */
    position: relative;
    transition: all 5s ease-in-out;
}

.verify_s h2 {
    margin-top: 30px;
    color: #333;
}

/* .verify .option {
  bottom: 0;
} */


/* delete */
.verify_d {
    margin: auto;
    margin-top: 20%;
    /* overflow-y: auto; */
    /* padding: 2px; */
    padding-top: 2px;
    /*padding-left: 30px;
  padding-right: 16px; */
    background: #fff;
    width: 20%;
    height: 150px;
    /* border-radius: 20px; */
    position: relative;
    transition: all 5s ease-in-out;
}

.verify_d h2 {
    margin-top: 30px;
    color: #333;
}


.comment_new {
    position: relative;
    z-index: 5;

}

.comment_new_button {
    position: absolute;
    animation: tada 1.5s;
    /* transition: opacity 500ms; */
    transition: all 1s;
    z-index: 1;

}


@keyframes tada {
    0% {
        opacity: 0;
        /* transition-property: all 1s; */
        margin-top: -30px;
    }

    100% {
        opacity: 1;
        /* transition-property: all 1s; */
        margin-top: 0px;

    }
}

::-webkit-scrollbar {
    width: 10px;
    background-color: rgb(119, 173, 212);
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: rgb(104, 104, 104);
    border-radius: 20px;
}

/* scroll bar of comments */
.comment_old::-webkit-scrollbar {
    background-color: transparent;
    width: 10px
}

.comment_old::-webkit-scrollbar-thumb {
    background-color: rgb(119, 173, 212);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.table_header::after {
    content: ':';
}
</style>