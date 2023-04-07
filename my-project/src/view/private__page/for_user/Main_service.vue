<script setup>
import {useRoute,useRouter} from'vue-router'
import BaseStatus from '../../../components/BaseStatus.vue'
const myRouter =useRouter()
const goMainMenu =(v)=>myRouter.push({name:'booking',params:{service:v}})



</script>
<template>
<div class="overflow-auto">
    <div>
        <div>
            <!-- navigation bar -->
            <!-- <BaseStatus /> -->

            <!-- body -->
            <div>
                <div class="w-fit mx-auto mt-2 text-[2.5rem] text-gray-600 font-bold sm:mt-4 sm:text-[3.75rem]">
                    เลือกบริการ
                </div>
                <div class="w-fit mx-auto mt-10">
                    <div  class="flex 
                        
                    ">
                        <!-- เดี๋ยวกลับมาแก้ -->
                        <!-- <button @click="goMainMenu('pr')" class="mx-10 ">
                            <img src="../../../assets/PR_service.png" alt="icon" class="w-[6.25rem] mx-auto sm:w-[120px]">
                            <h4 class="w-full text-center font-semibold text-[15px] sm:text-[30px]">
                                Service PR
                            </h4>
                            <h3 class="text-[10px]">
                                สื่อและรณรงค์ทางสังคม
                            </h3>
                        </button> -->
                        <button @click="goMainMenu('it')" class="mx-10">
                            <img src="../../../assets/IT_service.png" alt="icon" class="w-[6.25rem] h-fit mx-auto sm:w-[120px]">
                            <h4 class="w-full text-center font-semibold text-[15px]  sm:text-[30px]">
                                Service IT
                            </h4>
                            <h3 class="text-[10px]">
                                ศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ
                            </h3>
                        </button>                        
                    </div>

                    <div>

                    </div>
                </div>                 
            </div>
           
        </div>
    </div>    
</div>

</template>
<style scoped>
</style>