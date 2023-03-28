<script setup>
import {useRouter} from 'vue-router'
import {ref,onBeforeMount} from 'vue'
const props = defineProps({
    role:{
        type:String,
        default:null
    },
    userName:{
        type:String,
        default:'unknown'
    }
})
const isSetting =ref(false)
const isLanguage = ref(false)
const userName =ref("Hello wolrd")
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
const goService =()=>myRouter.push({name:'services'})


// get role from local
 const role =ref(undefined)
const getRole=()=>{

     isAdmin.value = localStorage.getItem('isAdmin')==='false'||localStorage.getItem('isAdmin')==null?false:true
     userName.value = props.userName
     role.value=props.role

    
    // console.log(role.value)
    // userName.value = data.user_email
}

// // set role
// const setRoleAdmin=()=>{
//     localStorage.setItem('role','admin')
//     goAdmin()
// }

// const setRoleUser=()=>{
//     localStorage.setItem('role','user')
//     goUser()
// }

// switch for admin
const isAdmin=ref(false)
const toAdmin =()=>{
    isAdmin.value= !isAdmin.value
    // console.log("before change:",isAdmin.value)
    // isAdmin.value==true?isAdmin.value=false:isAdmin.value=true
    console.log("after change",isAdmin.value)
    if(isAdmin.value==true){
        localStorage.setItem('isAdmin',isAdmin.value)
         goShowAllEvent()
    }else
    if(isAdmin.value==false){
        localStorage.setItem('isAdmin',isAdmin.value)
        goService()
    }

}



onBeforeMount(()=>{
    // let user_info =JSON.parse(localStorage.getItem('user_info')) 
    getRole()
    

})
</script>
<template>
    <!-- new apdate -->
<div class="bg-[#2196F3]">
    <div >
        <!-- default home -->
        <div v-if="role==null||role==undefined" class=" p-2">
            <div class="flex ml-[20px] w-fit">
                <img src="../assets/Moral_Fainal.png" alt="" class="w-[40px] h-[40px]">
                <div class="text-[20px] font-bold text-white my-auto m-3 ">
                    Zeed web
                </div>
                <!-- <button @click="setRoleAdmin" class="text-[20px] font-bold text-gray-700 my-auto m-3 ">
                    admin
                </button >
                <button @click="setRoleUser" class="text-[20px] font-bold text-gray-700 my-auto m-3 ">
                    user
                </button > -->
            </div>

            <div>

            </div>
        </div>

        <!-- user page -->
        <div v-else-if="role=='user'" class="flex justify-between p-2 relative">
            <div class=" ml-[20px] w-fit ">
                <div class="flex">
                    <img src="../assets/Moral_Fainal.png" alt="" class="w-[40px] h-[40px] inline-block">
                    <div class="text-[20px] font-bold text-white my-auto m-3 ">
                        Zeed web
                    </div>                    
                </div>
                
            </div>
            <!-- menu username -->
            <div class="flex mr-[20px]">
                <img src="../assets/alert.png" alt="alert" class="mx-3 w-[25px] m-auto">
                <h3 class="m-auto mb-2 mx-1 text-[14px] text-white font-medium">
                    สวัสดี!
                </h3>
                <button class=" truncate w-[100px] mb-1.5 ml-2 m-auto mx-2 mr-10 text-[17px] text-white font-semibold">
                    {{ userName }}
                </button>
                

                    <!-- ตั้งค่า drop down -->
                <div class=" ">
                    <button @click="isSetting= !isSetting ,isLanguage= false" class="font-semibold text-[#8DA9C4] p-1 active:bg-[#90CAF9] active:text-[#0D47A1] rounded hover:text-white">
                        <img src="../assets/burger_menu.png" alt="menu" class="w-[35px]">
                    </button>
                    <div v-show="isSetting==true" class="font-semibold text-[#8DA9C4] absolute mt-[10px] ml-[-120px] z-20 w-30 rounded bg-gray-700 divide-y divide-gray-800" id="dropdown" >
                    <ul  class="p-2 m-auto">
                        <li>
                            <button class="font-semibold text-[#8DA9C4] ml-">change theme</button> 
                        </li>
                        <li>
                            <button @click="isLanguage= !isLanguage" class="font-semibold text-[#8DA9C4]">
                                 <span v-show="isLanguage==true">&#60;&nbsp;</span>change language 
                            </button> 
                            <div v-show="isLanguage==true" class="mt-[-15px] ml-[-75px] z-20 absolute  w-fit bg-gray-800 text-white divide-y divide-gray-800 rounded">
                                <ul class="px-2 py-1">
                                    <li class="px-2">
                                        <button class="font-semibold text-[#8DA9C4]">thai</button>
                                    </li>
                                    <li class="px-2">
                                        <button class="font-semibold text-[#8DA9C4]">eng</button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- admin page -->
        <div v-else-if="role=='admin_it'||role=='admin_pr'" class="flex justify-between p-2 relative">
            <div class="flex ml-[20px] w-fit ">
                    <img src="../assets/Moral_Fainal.png" alt="" class="w-[40px] h-[40px] my-auto">
                    <div class="text-[20px] font-bold text-white my-auto m-3 ">
                        Zeed web
                    </div>
                    <button @click="toAdmin" :style="[isAdmin===true?'background-color: rgb(244 63 94);color:white':'color: rgb(64 64 64);']" class="text-[15px] font-bold  rounded py-[5px] px-[10px] my-auto m-3 ">
                        Admin
                    </button >

            </div>
            <!-- menu username -->
            <div class="flex mr-[20px]">
                <!-- <audio   autoplay >
                    <source src="../assets/bp.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio> -->
                <img src="../assets/alert.png" alt="alert" class="mx-3 w-[25px] m-auto">
                <h3 class="m-auto mb-2 mx-1 text-[14px] text-white font-medium">
                    สวัสดี!
                </h3>
                <button class=" truncate w-[100px] mb-1.5 ml-2 m-auto mx-2 mr-10 text-[17px] text-white font-semibold">
                    {{ userName }}
                </button>
                

                    <!-- ตั้งค่า drop down -->
                <div class=" ">
                    <button @click="isSetting= !isSetting ,isLanguage= false" class="font-semibold text-[#8DA9C4] p-1 active:bg-[#90CAF9] active:text-[#0D47A1] rounded hover:text-white">
                        <img src="../assets/burger_menu.png" alt="menu" class="w-[35px]">
                    </button>
                    <div v-show="isSetting==true" class="font-semibold text-[#8DA9C4] absolute mt-[10px] ml-[-120px] z-20 w-30 rounded bg-gray-700 divide-y divide-gray-800" id="dropdown" >
                    <ul  class="p-2 m-auto">
                        <li>
                            <button class="font-semibold text-[#8DA9C4] ml-">change theme</button> 
                        </li>
                        <li>
                            <button @click="isLanguage= !isLanguage" class="font-semibold text-[#8DA9C4]">
                                 <span v-show="isLanguage==true">&#60;&nbsp;</span>change language 
                            </button> 
                            <div v-show="isLanguage==true" class="mt-[-15px] ml-[-75px] z-20 absolute  w-fit bg-gray-800 text-white divide-y divide-gray-800 rounded">
                                <ul class="px-2 py-1">
                                    <li class="px-2">
                                        <button class="font-semibold text-[#8DA9C4]">thai</button>
                                    </li>
                                    <li class="px-2">
                                        <button class="font-semibold text-[#8DA9C4]">eng</button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<style scoped>

</style>