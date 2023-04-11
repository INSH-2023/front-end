<script setup>
import{ref,computed}from'vue'
import { useRouter } from 'vue-router';
import toBackEnd from '../../JS/fetchToBack'
import BaseAlert from '../../components/BaseAlert.vue'
const myRouter = useRouter()
const goMain=()=>myRouter.push({name:'services'})

const alert_message=ref('')
const alert_title=ref('')
const alert_status=ref(undefined)

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
    // console.log(data_ch.value)
    let [status,data]=await toBackEnd.postData('login',loginLink,data_ch.value)
    if(status==200){
        console.log('login',data)
        localStorage.setItem('user_info',setLocal(data.data))
        goMain()
    }else 
    if(status==404){
        alert_status.value=false
        alert_title.value='User Not Found !!'
        alert_message.value='ไม่เจอผู้ใช้ชื่อนี้ 😁'
    }else
    {
        alert_status.value=true
        alert_title.value='Error from server !!'
        alert_message.value='เกิดข้อผิดพลาดทางด้าน Server'
        console.log(data)
    }
}

const setLocal=(data)=>{
    return JSON.stringify(data)
}

// testing button
const isEmailTesting=ref(false)
</script>
<template>

    <div class=" pt-3 relative ">
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
                <div class="flex px-2 py-1.5">
                    <input v-model="email" type="text" placeholder="E-mail" class="w-[90%] focus:outline-0 my-auto">
                    <!-- <button v-show="isEmailTesting==false && email.length!=0" @click="isEmailTesting=true"  class=" ml-[2px] mx-auto rounded-full border-2 border-gray-500 text-gray-500 w-[25px] h-[25px] hover:bg-gray-700 hover:text-gray-200">
                       <h2  class="p-[1px] mx-auto text-[13px] " >
                         > 
                       </h2> 
                    </button> -->
                    
                </div>
                <!-- ค่อยมาทำต่อ -->
                <!-- v-show="isEmailTesting==true" -->
                <hr  class="w-[100%] h-[3px]   bg-gray-400 ">
                <div  class="flex px-2 py-1.5  ">
                    <input v-model="pw" @keyup.enter="logIn" type="password" placeholder="Password" class="w-[90%]  focus:outline-0 my-auto">
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


       <!-- button submit -->
       <!-- v-show="isEmailTesting==true" -->
       <div class="w-fit h-fit mx-auto mt-3 md:mt-6">
            <button @click="logIn"  class="bg-sky-500 w-[13rem] h-[2.4rem] rounded-2xl text-white md:w-[16rem]">
                login
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

            <BaseAlert :status="alert_status" :title="alert_title" :message="alert_message" />
   
       
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