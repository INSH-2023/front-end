<script setup>
import {useRouter} from 'vue-router'



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


</script>
<template>
    <!-- new apdate -->
<div class="bg-[#2196F3]">
    <div >
        <!-- default home -->
        <div class=" p-2">
            <div @click="goHome" class="flex ml-[20px] w-fit cursor-pointer">
                
                <img src="../assets/Moral_Fainal.png" alt="" class="w-[40px] h-[40px]">
                <div class="text-[20px] font-bold text-white my-auto m-3 ">
                    Zeed web
                </div>
                
            </div>
        </div>
    </div>
</div>

</template>
<style scoped>

</style>