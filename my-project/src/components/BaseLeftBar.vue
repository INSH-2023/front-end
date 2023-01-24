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
<div class="bg-[#134074] w-full h-full">
    <div class="w-[300px] m-auto mt-4">
        <div>
            
        </div>

    </div>
    
</div>
   
</template>
<style scoped>
</style>