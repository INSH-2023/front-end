<script setup>
import{ref,computed}from'vue'
import { useRouter } from 'vue-router';
import toBackEnd from '../../JS/fetchToBack'
const myRouter = useRouter()
const goMain=()=>myRouter.push({name:'services'})

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
        console.log(data)
        localStorage.setItem('user_info',setLocal(data.data))
        goMain()
    }else{
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
<div>
    <div class=" pt-3 relative ">
       <div class="mt-6 w-fit mx-auto text-[60px] font-semibold text-gray-600">
         ลงชื่อเข้าใช้
       </div>
       <div class="mt-6 w-[400px] h-[100px] mx-auto relative">
            <!-- input zone -->
            <div class=" w-full h-fit border-2 border-gray-400 rounded-[10px]">
                <div class="flex px-2 py-1.5">
                    <input v-model="email" type="text" placeholder="E-mail" class="w-[90%] focus:outline-0 my-auto">
                    <button @click="isEmailTesting=true" class="w-[10%] ml-[2px] mx-auto">
                       <h2 v-show="isEmailTesting==false" class="p-[1px] mx-auto rounded-full border-2 border-gray-500 text-gray-500 w-[30px]" >
                         > 
                       </h2> 
                    </button>
                    
                </div>
                <hr v-show="isEmailTesting==true" class="w-[100%] h-[3px]   bg-gray-400 ">
                <div v-show="isEmailTesting==true" class="flex px-2 py-1.5  ">
                    <input v-model="pw" type="text" placeholder="Password" class="w-[90%]  focus:outline-0 my-auto">
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
       <div v-show="isEmailTesting==true" class="w-fit mx-auto mt-3">
            <button @click="logIn" class="bg-sky-500 px-[100px] py-[10px] rounded-2xl text-white">
                login
            </button>
       </div>

       <!-- หรือ -->
       <div class="w-fit mx-auto mt-10">
            <div class="flex ">
                <hr class="m-auto w-[350px] h-[2px] bg-gray-400  border-gray-400">
                <h5 class="px-2">
                    หรือ
                </h5>
                <hr class="m-auto w-[350px] h-[2px] bg-gray-400  border-gray-400">
            </div>
       </div>

       <!-- login by ms 365 -->
       <div class=" w-fit mx-auto mt-5 border-2 rounded-2xl border-gray-400 font-semibold text-gray-500">
            <button class="flex px-5 py-1.5">
                <img src="../../assets/Microsoft_365_logo.png" alt="" class="mr-3 w-[30px]">
                <h5 class="text-[15px] m-auto">
                    เข้าสู่ระบบด้วย Microsoft 365
                </h5>
            </button>
       </div>

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