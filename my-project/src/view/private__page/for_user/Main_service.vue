<script setup>
import {useRoute,useRouter} from'vue-router'
import BaseStatus from '../../../components/BaseStatus.vue'
const myRouter =useRouter()
const goMainMenu =(v)=>myRouter.push({name:'booking',params:{service:v}})

</script>
<template>
<!-- <div class="overflow-auto">
    <div>
        <div> -->
            <!-- navigation bar -->
            <!-- <BaseStatus /> -->

            <!-- body -->
            <!-- <div class=""> -->
                <div class="w-fit mx-auto mt-2 text-[2.5rem] text-gray-600 font-bold sm:mt-4 sm:text-[3.75rem]">
                    เลือกบริการ
                </div>
                <div class="w-fit mx-auto mt-10">
                    <div  class="flex flex-col 
                        md:flex-row
                    ">
                        <!-- เดี๋ยวกลับมาแก้ -->
                        <button @click="goMainMenu('pr')" class="mx-10 p-5 rounded-xl drop-shadow-md lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400">
                            <img src="../../../assets/PR_service.png" alt="icon" class="w-[6.25rem] mx-auto sm:w-[120px]">
                            <h4 class="w-full text-center font-semibold text-[15px] sm:text-[30px]">
                                Service PR
                            </h4>
                            <h3 class="text-[10px]">
                                สื่อและรณรงค์ทางสังคม
                            </h3>
                        </button>
                        <button @click="goMainMenu('it')" class="mx-10 p-5 rounded-xl drop-shadow-md lg:hover:bg-gray-200 lg:hover:text-black focus:ring-3 focus:ring-gray-400">
                            <img src="../../../assets/IT_service.png" alt="icon" class="w-[6.25rem] h-[6.25rem] mx-auto sm:w-[7.5rem] sm:h-[7.5rem]">
                            <h4 class="w-full text-center font-semibold text-[15px]  sm:text-[30px]">
                                Service IT
                            </h4>
                            <h3 class="text-[10px]">
                                ศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ
                            </h3>
                        </button>                        
                    </div>

                </div>                 
            <!-- </div> -->
           
        <!-- </div>
    </div>    
</div> -->

</template>
<style scoped>
</style>