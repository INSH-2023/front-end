<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import toBackEnd from '../../JS/fetchToBack'
import BaseAlert from '../../components/BaseAlert.vue'
import BaseLoading from '../../components/BaseLoading.vue'
import Cookies from '../../JS/cookies'
// src\components\BaseLoading.vue
const myRouter = useRouter()
const goMain = () => myRouter.push({ name: 'home' })
const goResetPassword = () => myRouter.push({ name: 'resetPassword' })

const alert_message = ref('')
const alert_title = ref('')
const alert_status = ref(undefined)

const button_status = ref(false)

const verifyLink = `${import.meta.env.VITE_BACK_END_HOST}/authentication/verify`
const email = ref('')
const data_ch = computed(() => {
    return {
        email: email.value
    }
})
const verifyEmail = async () => {
    button_status.value = true
    if (email.value.length == 0) {
        console.log('please in put ur email')
        alert_status.value = false
        alert_title.value = 'Missing data !!'
        alert_message.value = 'กรุณาใส่ข้อมูล E-mail ของคุณ!!'
        button_status.value = false
    } else {
        // console.log(data_ch.value)
        let [status, data] = await toBackEnd.postData('verify', verifyLink, data_ch.value)
        if (status == 200) {
            console.log('verify successfully')
            Cookies.set("verify", JSON.stringify({"uuid":data.uuId_token,"email":data_ch.value.email}))
            button_status.value = false
            goResetPassword()
        } else if (status == 403) {
            alert_status.value = false
            alert_title.value = 'Inactive !!'
            alert_message.value = 'อีเมลของผู้ใช้คนนี้ ใช้งานครบ 3 ครั้งแล้ว'
            button_status.value = false
        } else if (status == 404) {
            alert_status.value = false
            alert_title.value = 'Inactive !!'
            alert_message.value = 'อีเมลนี้หาไม่เจอ'
            button_status.value = false
        } else {
            alert_status.value = true
            alert_title.value = 'Error !!'
            alert_message.value = data
            console.log(data)
            button_status.value = false
        }
    }
}


</script>
<template>
    <div class="w-full pt-3 relative ">
        <div class="mt-6 w-fit mx-auto text-[27px] font-semibold text-gray-600
            sm:text-gray-300 md:text-rose-300 lg:text-sky-300 sm:text-[40px] h-[5rem]
       ">
            กรุณากรอกอีเมล เพื่อยืนยัน
        </div>
        <div class="mt-2 w-[20rem] h-[6rem]  mx-auto relative 
            sm:w-[25rem]
            md:mt-3
       ">
            <h4 class="ml-3 font-light text-[10px] text-gray-400
                md:text-[1rem]
            ">
                ใส่ Email ของคุณที่นี่ !!
            </h4>
            <!-- input zone -->
            <div class=" w-full h-fit border-2 border-gray-400 rounded-[10px]">
                <div class="flex px-2 py-1.5">
                    <input v-model="email" type="text" placeholder="E-mail" class="w-[90%] focus:outline-0 my-auto">
                    <!-- <button v-show="isEmailTesting==false && email.length!=0" @click="isEmailTesting=true"  class=" ml-[2px] mx-auto rounded-full border-2 border-gray-500 text-gray-500 w-[25px] h-[25px] hover:bg-gray-700 hover:text-gray-200">
                       <h2  class="p-[1px] mx-auto text-[13px] " >
                         > 
                       </h2> 
                    </button> -->
                </div>

            </div>
        </div>

        <!-- button submit -->
        <!-- v-show="isEmailTesting==true" -->
        <div class="w-fit h-fit mx-auto mt-3 md:mt-2 h-[5rem]">
            <button @click="verifyEmail" class="bg-sky-500 w-[8rem] h-[3rem] rounded-2xl text-white md:w-[12rem] mr-4 mb-4 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300">
                <div class="flex w-fit h-fit mx-auto">
                    <h4 class="w-fit h-fit p-2 mx-auto">
                        ยืนยัน
                    </h4>
                    <BaseLoading v-show="button_status" type="circle" w="20" h="20" r="2" />
                </div>
            </button>
            <button @click="goMain" class="bg-red-500 w-[8rem] h-[3rem] rounded-2xl text-white md:w-[12rem] mr-4 mb-4 hover:bg-red-800 focus:ring-4 focus:ring-blue-300">
                <div class="flex w-fit h-fit mx-auto">
                    <h4 class="w-fit h-fit p-2 mx-auto">
                        ยกเลิก
                    </h4>
                    <BaseLoading v-show="button_status" type="circle" w="20" h="20" r="2" />
                </div>
            </button>
        </div>
    </div>

    <BaseAlert :status="alert_status" :title="alert_title" :message="alert_message" />

    <!--     
    <div class="h-fit w-fit mx-auto font-mono">
        <div class="mt-20 p-2 bg-[#1565C0] w-[400px] ">

            <h1 class="w-fit text-[#BBDEFB] mx-auto m-3 font-bold"> เข้าสู่ระบบ </h1>
            input mail
            <div class="w-[70%] mx-auto m-3 ">
                <h2 class="text-[#BBDEFB] font-medium">E-mail</h2>
                <input type="text" class="w-full focus:outline-0 bg-transparent border-b-[1px] " />
            </div>
            input password
            <div class=" w-[70%] mx-auto m-3">
                <h2 class="text-[#BBDEFB] font-medium">Password</h2>
                <input type="text" class="w-full focus:outline-0 bg-transparent border-b-[1px] "/> 
            </div>
            ปุ่ม ย้อนกลับ
            <div class="flex font-semibold w-fit mx-auto my-3">
                <button class="p-3 text-gray-200 hover:bg-rose-400 hover:text-gray-800">ย้อนกลับ</button>
                <button class="p-3 text-gray-200 hover:bg-green-400 hover:text-gray-800">เข้าสู่ระบบ</button>
            </div>    
        </div>
    </div>     -->

    <!-- <div class=" w-fit mx-auto mt-5 font-semibold text-gray-500">
        <router-link :to="{ name: 'verify' }">
            <h5 class="text-[15px] m-auto underline underline-offset-1">
                จำนวนการตั้งรหัสผ่านใหมในวันนี้ : {{ getCount() }} ครั้ง
            </h5>
        </router-link>
    </div> -->
</template>
<style scoped></style>