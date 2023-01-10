<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import User from '../icon/User.svg'
defineProps({
    useW:{
        type:String,
        require:true,
        default:"home"
    }
})
const isSetting =ref(false)
const isLanguage = ref(false)

const myRouter = useRouter()
const goSignIn=()=>myRouter.push({name:'signIn'})
const goSignOut=()=>myRouter.push({name:'signUp'})
const goHome =()=>myRouter.push({name:'home'})
const goAdmin =()=>myRouter.push({name:'showAllEvent'})



</script>
<template>
   <!-- <h1>{{ useW }}</h1>  -->

    <!-- for home public page -->
<div v-if="useW.toString()=='home'" class="flex bg-gray-500 w-full p-3">
    <div class="inline-flex h-[100%] pt-1 w-fit">
        <img src="../assets/vue.svg" alt=" logo" class="ml-4 w-[45px]">
        <h1 class="my-auto w-fit text-[30px]">แจ้งซ่อม</h1>
    </div>

    <div class="mx-auto x justify-end w-fit">
        <ul class="flex w-fit ">
            <li class="p">
               <button @click="goHome" class="p-1 hover:text-white">home</button> 
            </li>
            <li>
               <button @click="goSignIn" class="p-1 hover:text-white">sign-in</button> 
            </li>
            <li>
               <button @click="goSignOut" class="p-1 hover:text-white">sign-up</button> 
            </li>
            <li>
               <button @click="goAdmin" class="p-1 hover:text-white">admin</button> 
            </li>
        </ul>
    </div>

</div>

    <!-- for admin private page -->
<div v-else-if="useW.toString()=='admin' " class=" bg-gray-500 h-[80%]">
    <div class="flex h-[45%] pt-1 w-fit">
        <img src="../assets/vue.svg" alt=" logo" class="ml-4 w-[45px]">
        <h1 class="my-auto w-fit text-[30px]">แจ้งซ่อม</h1>
        <!-- <div class="flex w-fit text-[20px] ml-[20%]">
            <img src="../assets/vue.svg" alt="">
            <h1 class="m-auto">username: </h1>

        </div> -->
        
    </div>
    <div class="h-[25%]  w-full relative">
        <div class="w-fit ml-3 flex text-[20px] float-right mr-10 absolute right-0">
            <h1 class="">username:</h1>
            <h1 class="ml-3">hello world</h1>
        </div>
       
    </div>
    <div class="flex h-[30%]  mx-auto bg-gray-400 pt-1">
        <h1 class="px-2 ">
           <button class="hover:text-white "> หน้าหลัก</button> 
        </h1>

        <!-- drop down -->
        <div class="px-2">
            <button @click="isSetting= !isSetting ,isLanguage= false">ตั้งค่า</button>
            <div v-show="isSetting==true" class="text-white absolute z-20 w-30 rounded bg-gray-700 divide-y divide-gray-800" id="dropdown" >
            <ul  class="p-2">
                <li>
                    <button>change theme</button> 
                </li>
                <li>
                   <button @click="isLanguage= !isLanguage">change language &nbsp;></button> 
                   <div v-show="isLanguage==true" class="mt-[-18%] z-20 absolute ml-[100%] w-10 bg-gray-800 text-white divide-y divide-gray-800 rounded">
                        <ul class="px-2 py-1">
                            <li>
                                <button>thai</button>
                            </li>
                            <li>
                                <button>eng</button>
                            </li>
                        </ul>
                   </div>
                </li>
                
            </ul>
            <!-- <select name="" id="">
                <option value="" disabled selected>ตั้งค่า</option>
                <option value="thai">ไทย</option>
                <option value="eng">eng</option>

            </select> -->
           <!-- <button class="hover:text-white "> ตั้งค่า</button>  -->
        </div>
        </div>
        
        <!-- <h1 class="px-2">หมวดหมู่</h1> -->
        <h1 class="px-2">
            <button @click="goHome" class="hover:text-white hover:bg-rose-400 px-2 rounded"> ออกจากระบบ</button>
        </h1>

    </div>
    

</div>
</template>
<style scoped>

</style>