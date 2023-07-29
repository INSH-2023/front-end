<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import toBackEnd from '../../../JS/fetchToBack'
import BaseProgress from '../../../components/report/BaseProgress.vue';
import TypeOfUse from '../../../components/report/TypeOfUse.vue';
import TypeOfMachine from '../../../components/report/TypeOfMachine.vue';
import Problem from '../../../components/report/Problem.vue';
import OtherAndMessage from '../../../components/report/OtherAndMessage.vue';
import validate from '../../../JS/validate';
import SummaryReport from '../../../components/report/SummaryReport.vue';
import BaseAlert from '../../../components/BaseAlert.vue';
import BaseLoading from '../../../components/BaseLoading.vue';
import getRefreshToken from './../../../JS/refresh';

const myRouter = useRouter()
const goBack = () => myRouter.go(-1)
const goMain = () => myRouter.push({ name: 'services' })
const errorServer = () => myRouter.push({ name: 'errorServer' })
// const requestLink ="http://localhost:3000/events"
// const problemsLink = "http://localhost:3000/problems"
const requestLink = `${import.meta.env.VITE_BACK_END_HOST}/requests`
const problemsLink = `${import.meta.env.VITE_BACK_END_HOST}/problems`
const itemLink = `${import.meta.env.VITE_BACK_END_HOST}/items`
const userLink = `${import.meta.env.VITE_BACK_END_HOST}/users`
const { params } = useRoute()
const typeP = params.id
const service = params.service

const progress_status = undefined

const alert_message = ref('')
const alert_title = ref('')
const alert_status = ref(undefined)

const button_status = ref(false)
// get date time
const Timestamp = () => {
    let dateTime = new Date()
    const is_lessthen_ten = (v) => v < 10 ? '0' + v : v
    let date = `${dateTime.getFullYear()}-${is_lessthen_ten(dateTime.getMonth())}-${is_lessthen_ten(dateTime.getDate())}`
    let time = `${is_lessthen_ten(dateTime.getHours())}:${is_lessthen_ten(dateTime.getMinutes())}:${is_lessthen_ten(dateTime.getSeconds())}`
    return `${date} ${time}`
}

const data_ch = computed(() => {

    if (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application' || typeP == 'media' || typeP == 'news') {
        typeOfUse.value.type = 'or'
    } else
        if (typeP == 'other') {
            typeOfUse.value.type = 'or'
            problems.value = ['other']
            is_other.value = true
        }

    return {
        request_first_name: user.value.first_name,
        request_last_name: user.value.last_name,
        request_email: user.value.email,
        request_group: user.value.group,
        request_service_type: `${service.toUpperCase()}_Service`,
        request_subject: typeP,
        request_status: "request",
        // request_req_date:Timestamp(),
        request_assign: 'Not_assign',
        request_use_type: typeOfUse.value.type,
        request_sn: typeOfMachine.value.sn,
        request_brand: typeOfUse.value.type == 'or' ? typeOfMachine.value.brand_or : typeOfUse.value.brand_sf,
        request_type_matchine: typeOfMachine.value.typeM,
        request_other: otherAndMsg.value.msg_other,
        request_problems: problem_to_text.value,
        request_message: otherAndMsg.value.msg,
    }

})

// first section
const typeOfUse = ref({
    type: '',
    brand_sf: ''
})

// second section
const typeOfMachine = ref({
    typeM: '',
    brand_or: '',
    sn: ''
})

// third section
const problems = ref([])

// fourth section
const otherAndMsg = ref({
    msg: '',
    msg_other: ''
})


// check status
const is_other = ref(false)

const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    group: '',
    emp_code: ''
})

// problem list
const problemList = ref([])

const token = ref('')

const validateReport = (stage) => {

    // console.log(service)
    // console.log(stage)
    if (typeP == 'hardware' || typeP == 'software' || typeP == 'internet') {
        if (stage == 0) {
            // status something
            if (validate.vSection_I(typeOfUse.value)) {
                alert_status.value = undefined
                computeStageReport(true)
            } else {
                // alert error something
                alert_status.value = false
                alert_title.value = 'Missing data !!'
                alert_message.value = 'กรุณากรอกข้อมูล ประเภท อุปกรณ์ของคุณ'
            }

        } else
            if (stage == 1) {
                // status something
                if (validate.vSection_II(typeOfMachine.value, typeOfUse.value, user.value)) {
                    alert_status.value = undefined
                    computeStageReport(true)
                } else {
                    // alert error something
                    alert_status.value = false
                    alert_title.value = 'Missing data !!'
                    alert_message.value = 'กรุณากรอกข้อมูล ชนิด อุปกรณ์ของคุณ'
                }


            } else
                if (stage == 2) {
                    // status something
                    if (problem_to_text.value.length > 150) {
                        alert_status.value = false
                        alert_title.value = 'Warning !!'
                        alert_message.value = 'ปัญหาที่คุณเลือก มีมากเกินไป!!'

                    } else if (validate.vSection_III(problems.value, is_other.value)) {
                        alert_status.value = undefined
                        computeStageReport(true)
                    } else {
                        // alert error something
                        alert_status.value = false
                        alert_title.value = 'Missing data !!'
                        alert_message.value = 'กรุณากรอกข้อมูล ปัญหา ของคุณที่พบเจอ'
                    }

                } else
                    if (stage == 3) {
                        // status something
                        if (validate.vSection_IIII(otherAndMsg.value, is_other.value)) {
                            alert_status.value = undefined
                            computeStageReport(true)
                            console.log(data_ch.value)
                        } else {
                            // alert error something
                            alert_status.value = false
                            alert_title.value = 'Missing data !!'
                            alert_message.value = 'กรุณากรอกข้อมูล ปัญหาเพิ่มเติม ของคุณ'
                        }
                    } else
                        if (stage == 4) {
                            console.log(data_ch.value)
                            submitt()
                            // console.log(`
                            // request_first_name:${user.value.first_name},
                            // request_last_name:${user.value.last_name},
                            // request_email:${user.value.email},
                            // request_group:${user.value.group},
                            // request_service_type:${service.toUpperCase()}_Service,
                            // request_subject:${typeP},
                            // request_status:"request",
                            // request_req_date:${Timestamp()},
                            // request_assign:${'Not_assign'},
                            // request_use_type:${typeOfUse.value.type},
                            // request_sn:${typeOfMachine.value.sn},
                            // request_brand:${typeOfUse.value.type=='or'?typeOfMachine.value.brand_or:typeOfUse.value.brand_sf},
                            // request_type_matchine:${typeOfMachine.value.typeM},
                            // request_other:${otherAndMsg.value.msg_other},
                            // request_problems:${problem_to_text.value},
                            // request_message:${otherAndMsg.value.msg},
                            // `)
                        }


    } else
        if (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application'
            || typeP == 'media' || typeP == 'news') {
            if (stage == 0) {
                if (validate.vSection_III(problems.value, is_other.value)) {
                    alert_status.value = undefined
                    computeStageReport(true)
                } else {
                    // alert error something
                    alert_status.value = false
                    alert_title.value = 'Missing data !!'
                    alert_message.value = 'กรุณากรอกข้อมูล ปัญหา ของคุณที่พบเจอ'
                }
            } else
                if (stage == 1) {

                    if (validate.vSection_IIII(otherAndMsg.value, is_other.value)) {
                        alert_status.value = undefined
                        computeStageReport(true)
                        // console.log(data_ch.value)
                    } else {
                        // alert error something
                        alert_status.value = false
                        alert_title.value = 'Missing data !!'
                        alert_message.value = 'กรุณากรอกข้อมูล ปัญหาเพิ่มเติม ของคุณ'
                    }
                } else
                    if (stage == 2) {
                        console.log(data_ch.value)
                        submitt()
                    }

        } else
            if (typeP == 'other') {
                if (stage == 0) {
                    if (validate.vSection_IIII(otherAndMsg.value, is_other.value)) {
                        alert_status.value = undefined
                        computeStageReport(true)
                        // console.log(data_ch.value)
                    } else {
                        // alert error something
                        alert_status.value = false
                        alert_title.value = 'Missing data !!'
                        alert_message.value = 'กรุณากรอกข้อมูล ปัญหาเพิ่มเติม ของคุณ'
                    }
                }
                else
                    if (stage == 1) {
                        console.log(data_ch.value)
                        submitt()
                    }
            }
}

// third
// const problems =ref([])
const problem_to_text = computed(() => {
    let problemT = problems.value.reduce((value, c) => value + ',' + c, "")
    console.log(problemT)
    problemT = problemT.substring(1)
    return problemT
})

const getUser = async (emp_code) => {
    token.value = validate.getUserDataFromLocal('token') 
    const [status, data_user] = await toBackEnd.getData('report_user', `${userLink}/emp-code/${emp_code}`, token.value)
    if (status == 200) {
        let [{ user_first_name, user_last_name, user_group, user_email }] = data_user
        user.value.first_name = user_first_name
        user.value.last_name = user_last_name
        user.value.group = user_group
        user.value.email = user_email
        console.log(data_user)
    } else {
        errorServer()
        console.log(data_user)
    }
}

onBeforeMount(() => {
    // let refreshToken = validate.getUserDataFromLocal('refreshToken')
    getUser(validate.getUserDataFromLocal('user_emp_code'))
        getRefreshToken()
})

// compute stage report
const countNumber = ref(0)
//return value that is the number of all subject stages
const full_stage = computed(() => {
    let all_stage = 0
    if (service == 'it') {
        if (typeP == 'hardware' || typeP == 'software' || typeP == 'internet') {
            all_stage = 5
        } else
            if (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application') {
                all_stage = 3
            } else if (typeP == 'other') {
                all_stage = 2
            }
        return all_stage
    } else
        if (service == 'pr') {
            if (typeP == 'media' || typeP == 'news' || typeP == 'other') {
                all_stage = 3
            }
            return all_stage
        }
})

// คำนวณ stage สำหรับกดปุ่มถัดไป
const computeStageReport = (status) => {

    if (countNumber.value > full_stage.value - 1) {
        countNumber.value = full_stage.value - 1
    } else
        if (countNumber.value < 0) {
            countNumber.value = 0
        }

    if (status == true && countNumber.value != full_stage.value - 1) {
        //next
        countNumber.value++
    } else
        if (status == false && countNumber.value != 0) {
            //back
            countNumber.value--
        }
}

// notification
function notify(data) {
    console.log(data)
    let message = `ชื่อ: ${data.request_first_name.length == 0 || data.request_last_name.length == 0 ? '-' : data.request_first_name + ' ' + data.request_last_name} \nอีเมล: ${data.request_email.length == 0 ? '-' : data.request_email}) \nปัญหาที่พบ: ${data.request_message.length == 0 ? '-' : data.request_message}`
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification("🔧 คำร้องขอบริการของ 🔧", {
                    body: message
                })
                // …
            }
        });
    }
}

// send form
const isSubmitt = ref(false)
const submitt = async () => {
        // // share on admin page
        // myNotify.addList(data_ch.value)
    button_status.value = true
    console.log(data_ch.value)
    token.value = validate.getUserDataFromLocal('token')
    let [status, data] = await toBackEnd.postData('report', requestLink, data_ch.value, token.value)
    if (status == 201) {

        // isSummary.value=undefined
        isSubmitt.value = true
        // setTimeout(goMain,5000)
        console.log(data)
        button_status.value = false

        // play audio for notification
        const audio = new Audio();
        audio.src = 'https://drive.google.com/uc?id=1HFqk6XDY_5aF-OKtOXITlHEtM0Ek67CJ&export=download'
        audio.play();

        // send notify to user
        notify(data_ch.value)
    } else
        if (status == 400) {
            // console.log(data)
            button_status.value = false
            alert_status.value = true
            alert_title.value = 'Invalid data !!'
            alert_message.value = 'ข้อมูลไม่ถูกต้องไม่สามารถทำรายการได้'
        } else {
            console.log(data)
            button_status.value = false
            alert_status.value = true
            alert_title.value = 'Error from server !!'
            alert_message.value = 'An internal error occurred, please try again later.'
        }
}

// get data from component
const getDataFromComponent = (value) => {
    let data = value
    console.log(data)
    console.log(`${data.name} => ${data}`)

    if (data.name == 'use_type') {
        typeOfUse.value.type = data.typeU
        typeOfUse.value.brand_sf = data.brand_sf

        console.log('type of use : ', typeOfUse.value)
    } else
        if (data.name == 'type_of_machine') {

            typeOfMachine.value.typeM = data.item.type
            typeOfMachine.value.brand_or = data.item.brand_or
            typeOfMachine.value.sn = data.item.sn

            console.log('type of machine : ', typeOfMachine.value)
        } else
            if (data.name == 'problems') {
                problems.value = data.problems
                is_other.value = data.other_status

                console.log('problems : ', data.problems)
                console.log('other status : ', is_other.value)
            } else
                if (data.name == 'msg') {
                    otherAndMsg.value.msg = data.msg
                    otherAndMsg.value.msg_other = data.other_msg

                    console.log('msg and other : ', otherAndMsg.value)
                }
}


</script>
<template>
    <!-- <div class="overflow-auto">
    <div class="pt-3"> -->

    <!-- for write report -->
    <div v-if="isSubmitt == false" class=" w-full h-fit py-3 mx-auto lg:w-[800px] lg:h-fit">


        <!-- header -->
        <div class="w-fit h-fit mx-auto  text-[23px] sm:text-[36px]">
            <h3 class="font-semibold px-4">
                รายงานปัญหาเกี่ยวกับ <span class="font-light capitalize">{{ typeP }}</span>
            </h3>
        </div>

        <div class="w-[300px] h-fit mx-auto my-3 sm:w-[400px]">
            <BaseProgress :stage="countNumber" :full_stage="full_stage" />
        </div>


        <!-- first -->
        <!-- <div v-show="(countNumber==0 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))"  -->
        <div v-show="(countNumber == 0)" v-if="typeP == 'hardware' || typeP == 'software' || typeP == 'internet'"
            class="w-fit h-fit mt-4 mx-auto mx-auto sm:w-[400px]">
            <TypeOfUse @get-type-of-use="getDataFromComponent" />
        </div>

        <!-- second type of matchine -->
        <!-- <div v-show="(countNumber==1 && (typeP=='hardware'||typeP=='software'||typeP=='internet'))"  -->
        <div v-show="(countNumber == 1)" v-if="typeP == 'hardware' || typeP == 'software' || typeP == 'internet'" class="w-fit h-fit mx-auto mt-10
                    lg:w-[700px]
                ">
            <TypeOfMachine @get-type-of-m="getDataFromComponent" :type-of-use-o-r="typeOfUse.type == 'or' ? true : false" />
        </div>

        <!-- third problem -->
        <div v-show="((countNumber == 2 && (typeP == 'hardware' || typeP == 'software' || typeP == 'internet'))
            || (countNumber == 0 && (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application' || typeP == 'media' || typeP == 'news')))
            " v-if="typeP != 'other'" class="w-fit h-fit mx-auto mt-10 
                    lg:w-[700px]
                ">

            <Problem @get-problem-selected="getDataFromComponent" :typeP="typeP" />

        </div>

        <!-- fourth -->
        <!-- <div v-if="typeP !='other'"  class="flex flex-nowrap mt-10 mx-auto"> -->
        <OtherAndMessage v-show="(countNumber == 3 && (typeP == 'hardware' || typeP == 'software' || typeP == 'internet'))
            || (countNumber == 1 && (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application' || typeP == 'media' || typeP == 'news'))
            || (countNumber == 0 && (typeP == 'other'))" @get-message="getDataFromComponent"
            :is-type-p_other="typeP == 'other' ? true : false" :service_it="service == 'it' ? true : false"
            :is-other="is_other" />


        <!-- for summary -->

        <SummaryReport v-show="(countNumber == 4 && (typeP == 'hardware' || typeP == 'software' || typeP == 'internet'))
            || (countNumber == 2 && (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application' || typeP == 'media' || typeP == 'news'))
            || (countNumber == 1 && (typeP == 'other'))" :data="data_ch" />


        <div class="my-2 lg:my-auto">
            <BaseAlert :title="alert_title" :message="alert_message" :status="alert_status" type='report' />
        </div>


        <!-- button -->
        <div class="w-fit mx-auto my-6">
            <button @click="countNumber == 0 ? myRouter.go(-1) : computeStageReport(false), alert_status = undefined"
                class="w-[130px] mx-3 p-2 font-semibold bg-[#EDEDE9] text-gray-500 rounded-xl hover:bg-gray-500 hover:text-[#EDEDE9]">
                <h4>
                    ย้อนกลับ
                </h4>
            </button>
            <button @click="validateReport(countNumber)"
                class="w-[130px] mx-3 p-2 font-semibold bg-emerald-300  text-white rounded-xl hover:bg-[#b7e4c7] hover:text-gray-500">
                <div v-show="(countNumber < 4 && (typeP == 'hardware' || typeP == 'software' || typeP == 'internet'))
                    || (countNumber < 2 && (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application' || typeP == 'media' || typeP == 'news'))
                    || (countNumber < 1 && (typeP == 'other'))" class="">
                    ถัดไป
                </div>

                <div v-show="(countNumber == 4 && (typeP == 'hardware' || typeP == 'software' || typeP == 'internet'))
                    || (countNumber == 2 && (typeP == 'printer' || typeP == 'website' || typeP == 'meeting' || typeP == 'application' || typeP == 'media' || typeP == 'news'))
                    || (countNumber == 1 && (typeP == 'other'))" class="flex w-fit h-fit mx-auto">
                    <h4 class="px-2">
                        ส่งคำร้อง
                    </h4>
                    <BaseLoading v-show="button_status" type="circle" w="20" h="20" />
                </div>
            </button>
        </div>

    </div>

    <!-- submitt report -->
    <div v-else-if="isSubmitt == true" class="w-[250px] h-fit mx-auto md:w-[500px] lg:w-[1000px] md:h-fit ">
        <div class="w-fit mx-auto">
            <img src="../../../assets/check.png" alt="check_icon"
                class="w-[80px] h-[80px] mt-[20px] lg:w-[130px] lg:h-[130px] lg:mt-[60px]">
        </div>
        <div class="w-fit mx-auto mt-4 font-semibold ">
            <h3 class="text-[16px] text-center md:text-[30px] lg:text-[50px]">
                เราได้รับข้อมูลของคุณเรียบร้อยแล้ว
            </h3>
            <h3 class="text-[14px] text-center md:text-[20px] lg:text-[25px]">
                เจ้าหน้าที่จะติดต่อไปเร็วๆนี้
            </h3>

        </div>
        <div class="w-fit h-fit mx-auto mt-3 lg:mt-6">
            <button @click="goMain"
                class="w-fit h-fit p-2 px-6 mx-auto text-[15px] md:text-[20] lg:text-[23px] bg-gray-200 rounded-xl hover:bg-gray-500 hover:text-[#EDEDE9] focus:ring-4 focus:ring-blue-300">
                กลับไปหน้าหลัก
            </button>
        </div>

    </div>




    <!-- </div>
</div>    -->
</template>
<style scoped></style>