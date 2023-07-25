<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import toBackEnd from '../../JS/fetchToBack'
import BaseAlert from '../../components/BaseAlert.vue'
import BaseLoading from '../../components/BaseLoading.vue'
import Cookies from '../../JS/cookies'
import validate from '../../JS/validate';
// src\components\BaseLoading.vue
const myRouter = useRouter()
const goLogin = () => myRouter.push({ name: 'signIn' })

const alert_message = ref('')
const alert_title = ref('')
const alert_status = ref(undefined)

const button_status = ref(false)

const resetLink = `${import.meta.env.VITE_BACK_END_HOST}/authentication`
const pw = ref('')
const cpw = ref('')
const count = ref(0)
const data_ch = computed(() => {
    return {
        password: pw.value
    }
})
const resetPassword = async () => {
    button_status.value = true
    if (pw.value.length == 0 || cpw.value.length == 0) {
        console.log('please input ur new password')
        alert_status.value = false
        alert_title.value = 'Missing password !!'
        alert_message.value = 'กรุณาใส่รหัสผ่านใหม่ของคุณ !!'
        button_status.value = false
    } else if (pw.value !== cpw.value) {
        console.log('password is not match')
        alert_status.value = false
        alert_title.value = 'Password is not match !!'
        alert_message.value = 'รหัสผ่านใหม่ของคุณไม่ตรงกัน !!'
        button_status.value = false
    } else {
        // console.log(data_ch.value)
        let uuid = JSON.parse(Cookies.get("verify")).uuid
        let [status, data] = await toBackEnd.editData('reset-password', `${resetLink}/reset_password`, data_ch.value, uuid)
        if (status == 200) {
            console.log('reset password successfully')
            Cookies.remove("uuid")
            goLogin()
        } else if (status == 401) {
            alert_status.value = false
            alert_title.value = 'Invalid token !!'
            alert_message.value = 'กรุณาไปหน้ายืนยันใหม่'
            button_status.value = false
        } else if (status == 403) {
            alert_status.value = false
            alert_title.value = 'Token is already used !!'
            alert_message.value = 'การยืนยันครั้งนี้ใช้ไปแล้ว กรุณายืนยันใหม่'
            button_status.value = false
        } else if (status == 400) {
            alert_status.value = false
            alert_title.value = 'Invalid password !!'
            alert_message.value = "กรุณากรอกรหัสผ่านใหม่ ด้วยตัวอักษร 8-14 ตัวอักษร"
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

const getCount = async () => {
    let email = JSON.parse(Cookies.get("verify")).email
    let [status, data] = await toBackEnd.postData('count-verify', resetLink + '/verify/count', { email: email })
    if (status == 200) {
        count.value = data.count
    }
}

onBeforeMount(() => {
    getCount()
})

</script>
<template>
    <div class="w-full pt-3 relative ">
        <div class="mt-6 w-fit mx-auto text-[27px] font-semibold text-gray-600
            sm:text-gray-300 md:text-rose-300 lg:text-sky-300 sm:text-[40px] h-[5rem]
       ">
            กรุณากรอกรหัสใหม่
        </div>
        <div class="mt-2 w-[20rem] h-[6rem]  mx-auto relative 
            sm:w-[25rem]
            md:mt-1
       ">
            <h4 class="ml-3 font-light text-[16px] text-gray-400
                md:text-[1rem]
            ">
                ใส่ Password ใหม่ของคุณที่นี่ !!
            </h4>
            <!-- input password zone -->
            <div class=" w-full h-fit">
                <div class="flex px-2 py-1 border-2 border-gray-400 rounded-[10px] my-2">
                    <input v-model="pw" type="password" placeholder="Password" class="w-[90%] focus:outline-0 m-auto">
                    <!-- <button v-show="isEmailTesting==false && email.length!=0" @click="isEmailTesting=true"  class=" ml-[2px] mx-auto rounded-full border-2 border-gray-500 text-gray-500 w-[25px] h-[25px] hover:bg-gray-700 hover:text-gray-200">
                       <h2  class="p-[1px] mx-auto text-[13px] " >
                         > 
                       </h2> 
                    </button> -->
                </div>
                <div class="flex px-2 py-1 border-2 border-gray-400 rounded-[10px]">
                    <input v-model="cpw" type="password" placeholder="Confirmed Password" class="w-[90%] focus:outline-0 m-auto">
                </div>
            </div>
        </div>

        <!-- button submit -->
        <!-- v-show="isEmailTesting==true" -->
        <div class="w-fit h-fit mx-auto mt-5 md:mt-2 h-[5rem] py-8">
            <button @click="resetPassword"
                class="bg-sky-500 w-[8rem] h-[3rem] rounded-2xl text-white md:w-[12rem] mr-4 mb-4 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300">
                <div class="flex w-fit h-fit mx-auto">
                    <h4 class="w-fit h-fit p-2 mx-auto">
                        เปลี่ยนรหัสผ่าน
                    </h4>
                    <BaseLoading v-show="button_status" type="circle" w="20" h="20" r="2" />
                </div>
            </button>
        </div>
    </div>

    <div class=" w-fit mx-auto mt-5 font-semibold text-gray-500">
        <h5 class="text-[15px] m-auto underline underline-offset-1">
            จำนวนการตั้งรหัสผ่านใหมในวันนี้ : {{ count }} ครั้ง
        </h5>
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