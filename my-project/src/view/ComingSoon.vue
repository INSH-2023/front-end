<script setup>
import {useRouter} from 'vue-router'
const myRouter = useRouter()
const goService =()=>myRouter.push({name:'services'})
</script>
<template>
    <div class="w-full h-fit pt-20">
        <h4 class="w-fit mx-auto text-[25px] font-semibold">
        Coming soon!!    
        </h4>
        <h5 class="w-fit mx-auto text-[20px]  mt-2 font-light">
            this feature not avaliable on mobile
        </h5>
        <div class="w-fit mx-auto mt-4">
            <button @click="goService()" 
                class="w-full p-3 mx-auto bg-gray-300 text-[18px] rounded-lg font-light"
            >
                Go Back
            </button> 
        </div>
       
    </div>


</template>
<style scoped>
</style>