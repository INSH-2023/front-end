<script setup>
import{ref,computed}from'vue'
import { useRouter } from 'vue-router';
import toBackEnd from '../../JS/fetchToBack'
import BaseAlert from '../../components/BaseAlert.vue'
import BaseLoading from '../../components/BaseLoading.vue'
import Cookies from '../../JS/cookies'
// src\components\BaseLoading.vue
const myRouter = useRouter()
const goMain=()=>myRouter.push({name:'services'})

const alert_message=ref('')
const alert_title=ref('')
const alert_status=ref(undefined)

const button_status=ref(false)

const loginLink =`${import.meta.env.VITE_BACK_END_HOST}/authentication`
const email=ref('')
const pw=ref('')
const data_ch =computed(()=>{
    return{
        email:email.value,
        password:pw.value
    }
})
const logIn=async()=>{
    button_status.value=true
    if(email.value.length==0||pw.value.length==0){
        console.log('please in put ur email and password!!')
        alert_status.value=false
        alert_title.value='Missing data !!'
        alert_message.value='กรุณาใส่ข้อมูล E-mail และ Password ของคุณ!!'
        button_status.value=false
    }else{
        // console.log(data_ch.value)
        let [status,data]=await toBackEnd.postData('login',loginLink,data_ch.value)
        if(status==200){
            console.log('login successfully')
            console.log(data)
            Cookies.set("data",JSON.stringify(data))
            button_status.value=false
            goMain()
        }else 
        if(status==401){
            alert_status.value=false
            alert_title.value='Invalid !!'
            alert_message.value='กรุณาใส่ข้อมูล E-mail และ Password ของคุณให้ถูกต้อง!!'
            button_status.value=false
        }else
        if(status==403){
            alert_status.value=false
            alert_title.value='Inactive !!'
            alert_message.value='สถานะของ user ไม่พร้อมใช้งาน'
            button_status.value=false
        }else
        if(status==404){
            alert_status.value=false
            alert_title.value='Not Found !!'
            alert_message.value='อีเมลนี้ยังไม่ได้ลงทะเบียน'
            button_status.value=false
        }else
        {
            alert_status.value=true
            alert_title.value='Error !!'
            alert_message.value=data
            console.log(data)
            button_status.value=false
        }
    }
}

const pd =ref(false)
const showPd =()=>{
    let b = document.getElementById('pw')
    pd.value= !pd.value
    if(pd.value==false){
        b.setAttribute('type','password')
    }else
    if(pd.value==true){
        b.setAttribute('type','text')     
    }
    // console.log('hello world')
}

</script>
<template>

    <div class="w-full pt-3 relative ">
       <div class="mt-6 w-fit mx-auto text-[27px] font-semibold text-gray-600
            sm:text-gray-300 md:text-rose-300 lg:text-sky-300 sm:text-[40px]
       ">
       
        ลงชื่อเข้าใช้
       </div>
       <div class="mt-2 w-[20rem] h-[6.563rem]  mx-auto relative 
            sm:w-[25rem]
            md:mt-3
            
       ">
            <h4 class="ml-3 font-light text-[10px] text-gray-400
                md:text-[0.86rem]
            ">
                ใส่ Email ของคุณที่นี่ !!
            </h4>
            <!-- input zone -->
            <div class=" w-full h-fit border-2 border-gray-400 rounded-[10px]">
                <div class="flex pl-2 py-1.5">
                    <input v-model="email" type="text" placeholder="E-mail" class="w-[90%] px-2 focus:outline-0 my-auto">
                    <!-- <button v-show="isEmailTesting==false && email.length!=0" @click="isEmailTesting=true"  class=" ml-[2px] mx-auto rounded-full border-2 border-gray-500 text-gray-500 w-[25px] h-[25px] hover:bg-gray-700 hover:text-gray-200">
                       <h2  class="p-[1px] mx-auto text-[13px] " >
                         > 
                       </h2> 
                    </button> -->
                    
                </div>
                <!-- ค่อยมาทำต่อ -->
                <!-- v-show="isEmailTesting==true" -->
                <hr class="w-[100%] h-[3px] bg-gray-400 ">
                <div class="flex pl-2 py-1.5">
                    <input v-model="pw" @keyup.enter="logIn" type="password" id="pw" placeholder="Password" class="w-[90%] px-2 focus:outline-0 my-auto">
                    <img v-show="pw.length>0" v-if="pd" @click="showPd" src="../../assets/password/eye.png" alt="eye"  class="w-[25px] cursor-pointer ">
                    <img v-show="pw.length>0" v-else @click="showPd" src="../../assets/password/blind.png" alt="blind"  class="w-[25px] cursor-pointer ">
                    <!-- <button class="w-[10%] ml-[2px] mx-auto">
                        <h2 class="p-[1px] mx-auto rounded-full border-2 border-gray-500 text-gray-500 w-[30px]" >
                         > 
                        </h2> 
                    </button> -->
                </div>
                <div>
                    
                </div>
                
            </div>
       </div>

       <BaseAlert :status="alert_status" :title="alert_title" :message="alert_message" />


       <!-- button submit -->
       <!-- v-show="isEmailTesting==true" -->
       <div class="w-fit h-fit mx-auto mt-3  md:mt-6 ">
            <button @click="logIn"  class="bg-sky-500 w-[13rem] h-[3rem] rounded-2xl text-white md:w-[16rem] hover:bg-sky-800 focus:ring-4 focus:ring-blue-300">
                <div class="flex w-fit h-fit mx-auto">
                    <h4 class="w-fit h-fit p-2 mx-auto">
                        login
                    </h4>
                    <BaseLoading v-show="button_status" type="circle" w="20" h="20" r="2"/>                               
                </div>

            </button>
       </div>

       <!-- หรือ -->
       <!-- <div class="w-fit mx-auto mt-10">
            <div class="flex ">
                <hr class="m-auto w-[350px] h-[2px] bg-gray-400  border-gray-400">
                <h5 class="px-2">
                    หรือ
                </h5>
                <hr class="m-auto w-[350px] h-[2px] bg-gray-400  border-gray-400">
            </div>
       </div> -->

       <!-- login by ms 365 -->
       <!-- <div class=" w-fit mx-auto mt-5 border-2 rounded-2xl border-gray-400 font-semibold text-gray-500">
            <button class="flex px-5 py-1.5">
                <img src="../../assets/Microsoft_365_logo.png" alt="" class="mr-3 w-[30px]">
                <h5 class="text-[15px] m-auto">
                    เข้าสู่ระบบด้วย Microsoft 365
                </h5>
            </button>
       </div> -->
    
       <div class=" w-fit mx-auto mt-5 font-semibold text-gray-500">
            <router-link :to="{name:'verify'}">
                <h5 class="text-[15px] m-auto underline underline-offset-1">
                    ลืมรหัสผ่าน
                </h5>
            </router-link>
       </div>
       
    </div>

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
</template>
<style scoped>
</style>