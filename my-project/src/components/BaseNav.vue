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
const userName =ref("hello wolrd")
const myRouter = useRouter()
const goSignIn=()=>myRouter.push({name:'signIn'})
const goSignup=()=>myRouter.push({name:'signUp'})
const goHome =()=>myRouter.push({name:'home'})
const goAdmin =()=>myRouter.push({name:'showAllEvents'})
const goUser =()=>myRouter.push({name:'booking'})

</script>
<template>

    <!-- for home public page -->
<div v-if="useW.toString()=='home'" class=" bg-[#13315C] h-fit">
    <div class="flex  h-[45%]  w-fit mx-auto text-[15px]">

        <div >
        <div class="flex h-[100%] grow mx-auto  py-4 w-full">
    
        <!-- logo -->
            <div class="   my-auto grow-0 ml-4 ">
                <img src="../assets/Moralcenter2.png" alt=" logo" class="w-[33px]"/>
                <!-- <img src="../assets/Moralcenter_IT.png" alt=" logo" > -->
            </div>

            <!-- หน้า Home -->
            <div class="px-2 my-auto mr-3 font-semibold  text-[#42A5F5]">
                <h1 @click="goHome" class=" active:text-gray-600 cursor-pointer"> 
                    IT help desk
                </h1> 
            </div>

            <!-- หน้า Home -->
            <!-- <div class="px-2 my-auto mx-3 font-semibold text-[#8DA9C4]">
                <button @click="goHome" class="hover:text-white "> 
                    Home
                </button> 
            </div> -->

            <!-- หน้า sign-in -->
            <!-- <div class="px-2 my-auto mx-3 font-semibold text-[#8DA9C4]">
                <button @click="goSignIn" class="p-1 hover:text-white">
                    sign-in
                </button>
            </div> -->
            
            <!-- หน้า sign-up -->
            <!-- <div class="px-2 my-auto mx-3 font-semibold text-[#8DA9C4]">
                <button @click="goSignup" class="p-1 hover:text-white">
                    sign-up
                </button>
            </div> -->

            <!-- หน้า sign-up -->
            <div class="px-2 my-auto mx-3 font-semibold text-[#8DA9C4]">
                <button @click="goAdmin" class="p-1 hover:text-white">
                    admin
                </button>
            </div>

            <!-- user booking -->
            <div class="px-2 my-auto mx-3 font-semibold text-[#8DA9C4]">
                <button @click="goUser" class="p-1 hover:text-white">
                    user
                </button>
            </div>

    


        </div>
        </div>

</div>


</div>

    <!-- for admin private page -->
<div v-else-if="useW.toString()=='admin' " class=" bg-[#1976D2] h-fit">
    <div class="flex  h-[45%]  w-fit mx-auto text-[15px]">

        <!-- logo -->
        <!-- <img src="../assets/vue.svg" alt=" logo" class="mx-3 grow-0 ml-4 w-[30px]"> -->
        <!-- <h1 class="my-auto w-fit text-[30px]">แจ้งซ่อม</h1> -->
        <!-- <div class="flex w-fit text-[20px] ml-[20%]">
            <img src="../assets/vue.svg" alt="">
            <h1 class="m-auto">username: </h1>
        </div> -->
        <div class="">
        <div class="flex h-[100%] grow mx-auto  py-4 w-full">
            
            <!-- logo -->
            <div class="  mx-3 my-auto grow-0 ml-4 ">
                <img src="../assets/Moralcenter2.png" alt=" logo" class="w-[33px]"/>
                <!-- <img src="../assets/Moralcenter_IT.png" alt=" logo" > -->
            </div>
            
            <!-- หน้าหลัก -->
            <div class="px-2 my-auto mx-3">
                <button class="hover:text-white "> 
                หน้าหลัก
                </button> 
            </div>

            <!-- หน้าสำหรับทดสอบ -->
            <div class="px-2 my-auto mx-3">
                ทดสอบ
            </div>

            <!-- ตั้งค่า drop down -->
            <div class="px-2 my-auto mx-3">
                <button @click="isSetting= !isSetting ,isLanguage= false" class=" p-1 active:bg-[#90CAF9] active:text-[#0D47A1] rounded hover:text-white">ตั้งค่า</button>
                <div v-show="isSetting==true" class="text-white absolute mt-[1%] z-20 w-30 rounded bg-gray-700 divide-y divide-gray-800" id="dropdown" >
                <ul  class="p-2 m-auto">
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
            <!-- ออกจากระบบ -->
            <div class="px-2 my-auto mx-3">
            <button @click="goHome" class="hover:text-white hover:bg-rose-400 px-2 rounded"> ออกจากระบบ</button>
            </div>

            <div  class="w-fit ml-3 flex  float-right mr-10 grow-0 right-0">
                    <img src="../assets/user.png" alt="user" class="w-[15px] my-auto h-[15px]">
                    <!-- <h1 class="my-auto">username:</h1> -->
                    <h1 class="ml-2 my-auto">{{userName}}</h1>
                </div>

        </div>
        </div>

            <!-- <div class="w-fit ml-3 flex  float-right mr-10 grow-0 right-0">
            </div> -->
       
        </div>

    <!-- <div class="h-[25%]  w-full relative">
        <div class="w-fit ml-3 flex text-[20px] float-right mr-10 absolute right-0">
            <h1 class="">username:</h1>
            <h1 class="ml-3">hello world</h1>
        </div>
    </div> -->
    <!-- <div class="flex h-[30%]  mx-auto bg-gray-400 pt-1">
        <h1 class="px-2 ">
           <button class="hover:text-white "> หน้าหลัก</button> 
        </h1>
        <h1>
            หน้ารอง
        </h1> -->

        <!-- drop down -->
        <!-- <div class="px-2">
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
                
            </ul> -->
            <!-- <select name="" id="">
                <option value="" disabled selected>ตั้งค่า</option>
                <option value="thai">ไทย</option>
                <option value="eng">eng</option>

            </select> -->
           <!-- <button class="hover:text-white "> ตั้งค่า</button>  -->
        <!-- </div>
        </div> -->
        
        <!-- <h1 class="px-2">หมวดหมู่</h1> -->
        <!-- <h1 class="px-2">
            <button @click="goHome" class="hover:text-white hover:bg-rose-400 px-2 rounded"> ออกจากระบบ</button>
        </h1>

    </div> -->
    

</div>
</template>
<style scoped>

</style>