<script setup>
import{ref,onUpdated,computed} from 'vue'
const emit =defineEmits(["getTypeOfUse"])

const typeU=ref('')
const brand_sf =ref('')

onUpdated(()=>{
    emit("getTypeOfUse",{
        name:'use_type',
        typeU:typeU.value,
        brand_sf:brand_sf.value
    })
})

const data=computed(()=>{
    return{
        typeU:typeU.value,
        brand_sf:brand_sf.value
    }
})
</script>
<template>
        <!-- first -->
        <div class="text-[20px] font-normal sm:text-[25px]">
            <h3 >
                1. เลือก <span class="text-rose-500">ประเภท</span> อุปกรณ์ ของคุณ
            </h3>                    
        </div>

        
        <div class="w-fit h-[60px] mt-3 text-[15px] flex justify-between flex-col  font-medium sm:text-[20px] sm:h-[80px]">
            <div class="flex ml-14 " >
                <input v-model="typeU" id="Organization" type="radio" name="hardware_of" value="or" class="w-[25px] bg-gray-300"> 
                <label for="Organization" class="ml-4">
                    ของสำนักงาน
                </label>                       
            </div>
            <div class="flex ml-14 ">
                <input v-model="typeU" id="Self" type="radio" name="hardware_of" value="sf" class="w-[25px]">
                <label for="Self" class="ml-4">
                    ของส่วนตัว (โปรดระบุ ยี้ห้อ / รุ่น)
                </label>
                
            </div>
            
        </div>  
        
        <div v-if="typeU=='sf'" class="w-[250px] h-[70px] m-auto mt-3 lg:w-full lg:h-[100px]">
                <textarea v-model="brand_sf" id="Self" type="text" placeholder="ระบุยี้ห้อของคุณที่นี้." name="input_type" maxlength="50"  class="resize-none w-full h-full   p-2  bg-gray-200 text-[15px] font-light  rounded-lg focus:outline-0 lg:text-[18px]"></textarea>
        </div>
</template>
<style scoped>
</style>