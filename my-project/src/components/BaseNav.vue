<script setup>
import {useRouter} from 'vue-router'
import {ref,onBeforeMount} from 'vue'
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
const goRegister=()=>myRouter.push({name:'signUp'})
const goHome =()=>myRouter.push({name:'home'})
const goAdmin =()=>myRouter.push({name:'showAllEvents'})
const goUser =()=>myRouter.push({name:'booking'})
const goShowAllUser =()=>myRouter.push({name:'showAllUser'}) 
const goShowAllEvent =()=>myRouter.push({name:'showAllEvents'}) 
const goHistory =()=>myRouter.push({name:'history'})
const goBooking =()=>myRouter.push({name:'booking'})



// get role from local
const role =ref('')
const getRole=()=>{
    role.value=localStorage.getItem('role')
    console.log(role.value)
}

// set role
const setRoleAdmin=()=>{
    localStorage.setItem('role','admin')
    goAdmin()
}

const setRoleUser=()=>{
    localStorage.setItem('role','user')
    goUser()
}



onBeforeMount(()=>{
    getRole()
    })
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
                <button @click="setRoleAdmin" class="p-1 hover:text-white">
                    admin
                </button>
            </div>

            <!-- user booking -->
            <div class="px-2 my-auto mx-3 font-semibold text-[#8DA9C4]">
                <button @click="setRoleUser" class="p-1 hover:text-white">
                    user
                </button>
            </div>

    


        </div>
        </div>

</div>


</div>

    <!-- for  user private page -->
<div v-else-if=" role=='user' " class=" bg-[#13315C] h-fit">
    <div class="flex  h-[45%]  w-fit mx-auto text-[15px]">

        <div class="">
        <div class="flex h-[100%] grow mx-auto  py-4 w-full">
            
            <!-- logo -->
            <div class="  mx-3 my-auto grow-0 ml-4 ">
                <img src="../assets/Moralcenter2.png" alt=" logo" class="w-[33px]"/>
            </div>
            
            <!-- หน้าหลัก -->
            <div v-if="role=='user'" class="px-2 my-auto mx-3">
                <button @click="goBooking" class="hover:text-white font-semibold text-[#8DA9C4]"> 
                    แจ้งปัญหา
                </button> 
            </div>

            <!-- หน้าสำหรับทดสอบ -->
            <div v-if="role=='user'"  class=" px-2 my-auto mx-3 ">
                <button @click="goHistory" class="hover:text-white font-semibold text-[#8DA9C4]">
                 ประวัติ
                </button>
            </div>
            <!-- แจ้งซ่อม -->
            <div v-if="role=='admin'"  class=" px-2 my-auto mx-3 ">
                <button @click="goShowAllEvent" class="hover:text-white font-semibold text-[#8DA9C4]">
                    การแจ้งซ่อมทั้งหมด
                </button>
            </div>

            <!-- หน้าสำหรับแสดง users -->
            <div v-if="role=='admin'"  class=" px-2 my-auto mx-3 ">
               <button @click="goShowAllUser" class="hover:text-white font-semibold text-[#8DA9C4]">
                 ผู้ใช้ทั้งหมด
                </button>
            </div>

            <!-- เพิ่ม users -->
            <div v-if="role=='admin'"  class=" px-2 my-auto mx-3 ">
               <button @click="goRegister" class="hover:text-white font-semibold text-[#8DA9C4]">
                 เพิ่มผู้ใช้
                </button>
            </div>            

            <!-- ตั้งค่า drop down -->
            <div class="px-2 my-auto mx-3 ">
                <button @click="isSetting= !isSetting ,isLanguage= false" class="font-semibold text-[#8DA9C4] p-1 active:bg-[#90CAF9] active:text-[#0D47A1] rounded hover:text-white">
                    ตั้งค่า
                </button>
                <div v-show="isSetting==true" class="font-semibold text-[#8DA9C4] absolute mt-[1%] z-20 w-30 rounded bg-gray-700 divide-y divide-gray-800" id="dropdown" >
                <ul  class="p-2 m-auto">
                    <li>
                        <button class="font-semibold text-[#8DA9C4]">change theme</button> 
                    </li>
                    <li>
                    <button @click="isLanguage= !isLanguage" class="font-semibold text-[#8DA9C4]">change language &nbsp;></button> 
                    <div v-show="isLanguage==true" class="mt-[-18%] z-20 absolute ml-[100%] w-10 bg-gray-800 text-white divide-y divide-gray-800 rounded">
                            <ul class="px-2 py-1">
                                <li>
                                    <button class="font-semibold text-[#8DA9C4]">thai</button>
                                </li>
                                <li>
                                    <button class="font-semibold text-[#8DA9C4]">eng</button>
                                </li>
                            </ul>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        
        <!-- <h1 class="px-2">หมวดหมู่</h1> -->
            <!-- ออกจากระบบ -->
            <div class="px-2 my-auto mx-3">
            <button @click="goHome" class="hover:text-white hover:bg-rose-400 px-2 rounded font-semibold text-[#8DA9C4]"> ออกจากระบบ</button>
            </div>

            <div  class="w-fit ml-3 flex  float-right mr-10 grow-0 right-0">
                    <img src="../assets/user.png" alt="user" class="w-[15px] my-auto h-[15px]">
                    <!-- <h1 class="my-auto">username:</h1> -->
                    <h1 class="ml-2 my-auto font-normal text-[#90CAF9]">{{userName}}</h1>
            </div>

        </div>
        </div>
        </div>


</div>

    <!-- for  admin private page -->
<div v-else-if=" role=='admin'" class=" bg-transparent h-fit">

 
            <div  class="w-fit mx-auto  flex py-4  mr-10  ">
                    <img src="../assets/user.png" alt="user" class="w-[15px] my-auto h-[15px]">
                    <!-- <h1 class="my-auto">username:</h1> -->
                    <button class="ml-2 my-auto font-normal text-[#90CAF9]">{{userName}}</button>
            </div>


</div>
</template>
<style scoped>

</style>