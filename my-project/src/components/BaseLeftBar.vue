<script setup>
import {useRouter} from 'vue-router'
const myRouter=useRouter()
const goSignIn=()=>myRouter.push({name:'signIn'})
const goRegister=()=>myRouter.push({name:'signUp'})
const goHome =()=>myRouter.push({name:'home'})
const goAdmin =()=>myRouter.push({name:'showAllEvents'})
const goUser =()=>myRouter.push({name:'booking'})
const goShowAllUser =()=>myRouter.push({name:'showAllUser'}) 
const goShowAllEvent =()=>myRouter.push({name:'showAllEvents'}) 
const goHistory =()=>myRouter.push({name:'history'})
const goBooking =()=>myRouter.push({name:'booking'})
</script>
<template>
<div class="bg-white border-r-2 border-gray-400 w-full h-full">
    <div class="w-[250px] m-auto mt-8">
        <div class="m-auto">
            <div class="flex m-auto w-full h-[40px] bg-white rounded-xl border-2 border-gray-400">
                <label for="searching" class="mx-2 my-auto">
                    <img src="../assets/loupe.png" alt="" class="w-[20px] h-[20px] ">
                </label>
                <input id="searching" type="text" class="w-[210px]  focus:outline-0 bg-transparent">
            </div>

            <!-- list navigation -->
            <div class="m-auto w-full mt-[50px] text-[20px]">
                <ul>
                    <li class="">
                        <button @click="goShowAllEvent" class="flex w-fit  font-semibold text-gray-800 ">
                            <img src="../assets/vue.svg" alt="" class="w-[28px] h-[28] my-auto">
                            <span class="ml-3">Request</span> 
                        </button>
                        <hr class="full border-[1px] mt-2  border-gray-400">
                    </li>
                    <li @click="goShowAllUser" class="mt-3">
                        <button class="flex w-fit  font-semibold text-gray-800 ">
                            <img src="../assets/vue.svg" alt="" class="w-[28px] h-[28] my-auto">
                            <span class="ml-3">All User</span> 
                        </button>
                        <hr class="full border-[1px] mt-2 border-gray-400">
                    </li>
                    <li class="mt-3">
                        <button @click="goRegister" class="flex w-fit  font-semibold text-gray-800 ">
                            <img src="../assets/vue.svg" alt="" class="w-[28px] h-[28] my-auto">
                            <span class="ml-3">Add User</span> 
                        </button>
                        <hr class="full border-[1px] mt-2 border-gray-400">
                        
                    </li>
                    <li class="mt-3">
                        <button  class="flex w-fit  font-semibold text-gray-800 ">
                            <img src="../assets/vue.svg" alt="" class="w-[28px] h-[28] my-auto">
                            <span class="ml-3">Dashboard</span> 
                        </button>
                        <!-- <hr class="full border-[1px] mt-2"> -->
                        
                    </li>
                </ul>
            </div>
        </div>

    </div>
    
</div>
   
</template>
<style scoped>
</style>