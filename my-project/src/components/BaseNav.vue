<script setup>
import {useRouter} from 'vue-router'
import {ref,onBeforeMount} from 'vue'
import Cookies from '../JS/cookies';
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
const comingSoon =()=>myRouter.push({name:'notAvaliable'})

// get role from local
 const role =ref(undefined)
const getRole=()=>{

     isAdmin.value = Cookies.get('isAdmin')==='false'||Cookies.get('isAdmin')==null?false:true
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

// // const setRoleUser=()=>{
// //     localStorage.setItem('role','user')
// //     goUser()
// // }

// switch for admin
const isAdmin=ref(false)
const toAdmin =()=>{
    isAdmin.value= !isAdmin.value
    // console.log("before change:",isAdmin.value)
    // isAdmin.value==true?isAdmin.value=false:isAdmin.value=true

    // console.log("after change",isAdmin.value)
    console.log('width : ',window.innerWidth)
    if(window.innerWidth<1280){
        comingSoon()
    }else{
        if(isAdmin.value==true){
            Cookies.set('isAdmin',isAdmin.value)
            goShowAllEvent()
        }else
        if(isAdmin.value==false){
            Cookies.set('isAdmin',isAdmin.value)
            goService()
        }
    }
    

}

const logOut =()=>{
    Cookies.remove('data')
    goHome()
}

onBeforeMount(()=>{
    // let user_info =JSON.parse(localStorage.getItem('user_info')) 
    getRole()
})
</script>
<template>
    <!-- new apdate -->
<!-- <div class="h-full w-full bg-[#2196F3]"> -->
<!-- <div class="w-[100vw] h-[5vh]"> -->


        <!-- default home -->
        <div v-if="role==null||role==undefined" class="w-full h-full flex justify-between p-2 relative bg-[#0920aa] sticky top-0">
            <div class="flex ml-[20px] w-fit ">
                    <img src="../assets/Moral_Fainal.png" alt="" class="w-[40px] h-[40px] my-auto">
                    <div class="text-[20px] font-bold text-white my-auto m-3 
                        sm:text-gray-300 md:text-rose-300 lg:text-sky-300
                    ">
                        <h4 @click="goHome" class="text-center cursor-pointer">
                            IT HELP DESK
                        </h4> 
                    </div>
            </div>
            
        </div>


        <!-- admin page -->
        <div v-else class="flex  h-full w-full px-[20px] justify-between p-2 relative bg-[#0920aa]  sticky top-0">
            <div class="flex ml-[20px] w-fit ">
                    <img src="../assets/Moral_Fainal.png" alt="" class="w-[30px] h-[30px] my-auto">
                    <div class="text-[20px] font-bold text-white my-auto m-3 
                        sm:text-gray-300 md:text-rose-300 lg:text-sky-300
                    ">
                        <h4 @click="goService" class="text-center cursor-pointer">
                            IT HELP DESK
                        </h4> 
                    </div>
                    <button 
                        v-if="role=='admin_it'||role=='admin_pr'||role=='super_admin'" 
                        @click="toAdmin"
                        class=" h-fit w-[95px] text-[15px] font-bold  rounded py-[5px] px-[10px] my-auto  
                            hidden lg:flex text-white bg-[#e63946] lg:hover:bg-red-600 focus:ring-3 focus:ring-gray-400
                        ">
                        <h4 class="lg:grow">
                          Admin  
                        </h4>
                        <img src="../assets/admin_mode.png" alt="admin_mode" class="w-[20px] h-[20px] lg:grow-0">
                    </button >

                    <!-- <label  class="switch my-auto z-60">
                        <input @click="toAdmin" type="checkbox">
                        <span class="slider round  "></span>
                        <h3 v-show="isAdmin==false" class="absolute w-fit h-fit top-0 bottom-0 right-[10px] z-50 inset-y-0 text-[12px] m-auto  font-light">
                            user
                        </h3>
                        <h3 v-show="isAdmin==true" class="absolute w-fit h-fit top-0 bottom-0 left-[5px] z-50 inset-y-0 text-[12px] m-auto  font-light">
                            admin
                        </h3>
                    </label> -->

                    <!-- <div class="toggle-button-cover"> -->
                        <!-- <div class="button-cover"> -->
                            <!-- <div class="button r " id="button-1">
                                <input @click="toAdmin" type="checkbox" class="checkbox " />
                                <div class="knobs "></div>                               
                                <div class="layer "></div>
                            </div> -->
                        <!-- </div> -->
                    <!-- </div> -->

            </div>
            <!-- menu username -->
            <div class="flex flex-row w-fit h-full">
                <!-- <audio   autoplay >
                    <source src="../assets/bp.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio> -->
                <!-- <img src="../assets/alert.png" alt="alert" class="mx-3 w-[25px] m-auto"> -->
                <!-- <h3 class="hidden m-auto mb-2 mx-1 text-[14px] text-white font-medium
                    sm:block
                ">
                    สวัสดี!
                </h3> -->
                <div class="hidden  truncate w-full h-fit px-3 max-w-sm m-auto text-[17px]  text-white font-semibold text-justify
                    sm:block 
                    
                ">
                    {{ userName }}
                </div>
                

                    <!-- ตั้งค่า drop down -->
                <div class=" ">
                    <button @click="isSetting= !isSetting ,isLanguage= false" class="w-full h-full font-semibold text-[#8DA9C4]  rounded ">
                        <img src="../assets/burger_menu.png" alt="menu" class="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] mx-auto active:bg-[#90CAF9] active:text-[#0D47A1]  ">
                    </button>

                    <div v-show="isSetting==true" 
                        id="dropdown"
                        class="w-[100vw] h-fit font-semibold text-[#8DA9C4] absolute  right-0 top-[100%]  z-20 w-30 rounded-b bg-gray-700 divide-y divide-gray-800
                            sm:w-[11.5rem] sm:rounded-l
                        ">
                    <ul  class="flex flex-col p-2 m-auto">
                        <!-- <li>
                            <button class="font-semibold text-[#8DA9C4] ml-">change theme</button> 
                        </li> -->
                        <li class="block sm:hidden">
                            <div class="block truncate w-fit h-fit   m-auto   text-[0.9rem] text-white font-semibold
                                
                            ">
                            <h4>
                                {{ userName }}
                            </h4>
                            </div>
                        </li>
                        <li class="hidden sm:block">
                            <div class="flex">
                                <img src="../assets/settings.png" alt="logo_setting" draggable="false" class="w-[20px] h-[20px] ml-2">
                                <h4 class="ml-3">
                                    Option
                                </h4>                                
                            </div>
                        </li>
                        <li>
                            <hr class="w-full my-2 ">
                        </li>
                        <li>
                            <button @click="logOut" class="w-full font-semibold text-[#8DA9C4] px-2 py-1 hover:bg-rose-400 hover:text-white rounded-xl">Log out</button> 
                        </li>
                        <!-- <li>
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
                        </li> -->
                    </ul>
                    </div>
                </div>
            </div>
        </div>
<!-- </div> -->
<!-- </div> -->
</template>
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 28px;
  background-color: transparent;
 
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
  
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;

}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;

}

input:checked + .slider {
  background-color: #b2f7cc;
}

input:focus + .slider {
  box-shadow: 0 0 1px #b2f7cc;
  
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(40px);


}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
  z-index: 40;
}

.slider.round:before {
  border-radius: 50%;
}

/* try new button */



.toggle-button-cover {
  display: table-cell;
  position: relative;
  width: 200px;
  height: 140px;
  box-sizing: border-box;
}

.button-cover {
  height: 100px;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 10px 20px -8px #c5d6d6;
  border-radius: 4px;
}

.button-cover:before {
  counter-increment: button-counter;
  content: counter(button-counter);
  position: absolute;
  right: 0;
  bottom: 0;
  color: #d7e3e3;
  font-size: 12px;
  line-height: 1;
  padding: 5px;
}

.button-cover,
.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.button {
  position: relative;
  top: 50%;
  width: 80px;
  height: 25px;
  margin: -14px auto 0 auto;
  overflow: hidden;
}

.button.r,
.button.r .layer {
  border-radius: 100px;
}

.button.b2 {
  border-radius: 2px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  background-color: #ebf7fc;
  transition: 0.3s ease all;
  z-index: 1;
}

/* Button 1 */
#button-1 .knobs:before {
  content: "user";
  position: absolute;
  top: -2px;
  left: -1px;
  width: 40px;
  height: 30px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 9px 4px;
  background-color: #03a9f4;
  border-radius: 50%;
  transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

#button-1 .checkbox:checked + .knobs:before {
  content: "admin";

  left: 40px;
  background-color: #f44336;
}

#button-1 .checkbox:checked ~ .layer {
    
  background-color: #fcebeb;
}

#button-1 .knobs,
#button-1 .knobs:before,
#button-1 .layer {
  transition: 0.3s ease all;
}

</style>