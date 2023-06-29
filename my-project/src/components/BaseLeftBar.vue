<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Cookies from '../JS/cookies';
const myRouter = useRouter()
const goSignIn = () => myRouter.push({ name: 'signIn' })
const goRegister = () => myRouter.push({ name: 'signUp' })
const goHome = () => myRouter.push({ name: 'home' })
const goAdmin = () => myRouter.push({ name: 'showAllEvents' })
const goUser = () => myRouter.push({ name: 'booking' })
const goShowAllUser = () => myRouter.push({ name: 'showAllUser' })
const goShowAllEvent = () => myRouter.push({ name: 'showAllEvents' })
const goHistory = () => myRouter.push({ name: 'history' })
const goBooking = () => myRouter.push({ name: 'booking' })
const goWriteS = () => myRouter.push({ name: 'writeS' })
const goShowAllSolution = () => myRouter.push({ name: 'showAllSolution' })
const goProblemsList = () => myRouter.push({ name: 'problemsList' })

let role = ref(JSON.parse(Cookies.get("data")).user_role)

</script>
<template>
    <div class="flex flex-col h-full   border-r-2  border-gray-400 ">
        <!-- เดี๋ยวกลับมาทำต่อ -->
        <!-- <div class="flex m-auto w-full h-[40px] bg-white rounded-xl border-2 border-gray-400">
                <label for="searching" class="mx-2 my-auto">
                    <img src="../assets/loupe.png" alt="" class="w-[20px] h-[20px] ">
                </label>
                <input id="searching" type="text" class="w-[210px]  focus:outline-0 bg-transparent">
            </div> -->

        <div class=" w-full h-fit  bg-white p-3 ">
            <img src="../assets/Moralcenter2.png" alt="moralcenter" class="w-[80px] h-[80px] mx-auto">
            <!-- <label for="searching" class="mx-2 my-auto">
                    <img src="../assets/loupe.png" alt="" class="w-[20px] h-[20px] ">
                </label>
                <input id="searching" type="text" class="w-[210px]  focus:outline-0 bg-transparent"> -->
        </div>

        <!-- list navigation -->
        <div class="m-auto  w-[250px] h-full  text-[20px] mt-6 py-3">
            <ul>
                <li class="lg:hover:bg-gray-200 focus:ring-3 focus:ring-gray-400" @click="">
                    <button class="flex w-fit  font-semibold text-gray-800">
                        <img src="../assets/admin_page/request.png" alt="" class="w-[28px] h-[28] m-3">
                        <span class="m-3">All Request</span>
                    </button>
                    <hr class="full border-[1px] border-gray-400">
                </li>
                <li class="lg:hover:bg-gray-200 focus:ring-3 focus:ring-gray-400" @click="goShowAllUser">
                    <button class="flex w-fit  font-semibold text-gray-800">
                        <img src="../assets/admin_page/allUser.png" alt="" class="w-[28px] h-[28] m-3">
                        <span class="m-3">All User</span>
                    </button>
                    <hr class="full border-[1px] border-gray-400">
                </li>
                <li class="lg:hover:bg-gray-200 focus:ring-3 focus:ring-gray-400" v-if="role == 'super_admin'" @click="goRegister">
                    <button class="flex w-fit font-semibold text-gray-800">
                        <img src="../assets/admin_page/addUser.png" alt="" class="w-[28px] h-[28] m-3">
                        <span class="m-3">Add User</span>
                    </button>
                    <hr class="full border-[1px] border-gray-400">

                </li>
                <!-- <li class="mt-3">
                        <button @click="goWriteS" class="flex w-fit  font-semibold text-gray-800 ">
                            <img src="../assets/admin_page/new-document.png" alt="" class="w-[28px] h-[28] my-auto">
                            <span class="ml-3">Write solutions</span> 
                        </button>
                        <hr class="full border-[1px] mt-2 border-gray-400">
                        
                    </li> -->
                <!-- <li class="mt-3">
                        <button @click="goShowAllSolution" class="flex w-fit  font-semibold text-gray-800 ">
                            <img src="../assets/admin_page/dashboard.png" alt="" class="w-[28px] h-[28] my-auto">
                            <span class="ml-3">All Solution</span> 
                        </button>
                        <hr class="full border-[1px] mt-2 border-gray-400">
                        
                    </li> -->
                <li class="lg:hover:bg-gray-200 focus:ring-3 focus:ring-gray-400" @click="goProblemsList">
                    <button class="flex w-fit font-semibold text-gray-800">
                        <img src="../assets/admin_page/problem.png" alt="" class="w-[28px] h-[28] m-3">
                        <span class="m-3">Problems List</span>
                    </button>
                    <!-- <hr class="full border-[1px] mt-2 border-gray-400"> -->

                </li>
                <!-- <li class="mt-3">
                        <button @click="goWriteS" class="flex w-fit  font-semibold text-gray-800 ">
                            <img src="../assets/admin_page/dashboard.png" alt="" class="w-[28px] h-[28] my-auto">
                            <span class="ml-3">Dashboard</span> 
                        </button>
                        <hr class="full border-[1px] mt-2 border-gray-400">
                        
                    </li> -->

            </ul>
        </div>
    </div>
</template>
<style scoped></style>