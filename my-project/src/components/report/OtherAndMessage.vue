<script setup>
import {ref,onUpdated} from 'vue'
const props = defineProps({
    service_it:{
        type:Boolean,
        required:true
    },
    isOther:{
        type:Boolean,
        defualt:false
    },
    isTypeP_other:{
        type:Boolean,
        required:true,
        defualt:false
    }
})
const emit=defineEmits(["getMessage"])

onUpdated(()=>{
    emit('getMessage',{name:'msg',msg:msg.value,other_msg:other_msg.value})
})
// variable
const msg=ref('')
const other_msg=ref('')

</script>
<template>
    <div v-if="props.isTypeP_other==false"  class="w-full flex flex-col flex-nowrap mt-10 mx-auto
  
    ">
        <!-- subject not other only -->
        <div v-show="props.isOther==true" class="w-full mx-auto px-3 md:px-0 md:w-fit">
            <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b md:text-[20px]">
                กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
            </label>
            <br class="md:hidden">
            <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
            <textarea v-model="other_msg" name="other" id="other_1" maxlength="150"   class="block w-full h-[100px] resize-none pt-[10px]  rounded-xl bg-gray-300 p-2  focus:outline-0
                md:w-[600px] md:h-[100px]
            " ></textarea>
        </div>

        <div  class="w-full mt-3 px-3 mx-auto mt-3 md:px-0 md:mt-6 md:w-fit">
            <label for="other_2" class="ml-3 text-[17px] font-semibold">
                <span v-if="props.service_it==true">ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)</span>
                <span v-if="props.service_it==false">ระบุรายละเอียดเพิ่มเติม (ถ้ามี)</span> 
            </label>
            <textarea v-model="msg" name="other" id="other_2" maxlength="150"  class="block w-full h-[100px] resize-none pt-[10px]  rounded-xl bg-gray-300 p-2 mx-auto focus:outline-0
                md:w-[600px] md:h-[100px]
            "></textarea>
        </div>
        
    </div>

    <div v-else-if="props.isTypeP_other==true" class="w-full flex flex-col flex-nowrap mt-10 mx-auto
        
    ">
        <!-- suject is other -->
        <div class="w-[350px] mx-auto px-3 md:px-0 md:w-fit">
            <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                ระบุ รายละเอียด หรือ ความต้องการของคุณ
            </label>
            <br class="">
            <span v-show="props.isTypeP_other!=true" class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
            <textarea v-model="other_msg" name="other" id="other_1" maxlength="150"   class="block w-full h-[100px] resize-none pt-[10px]  rounded-xl bg-gray-300 p-2  focus:outline-0
                md:w-[600px] md:h-[100px]
            " ></textarea>
        </div>

        <div  class="w-[350px] mx-auto mt-3 px-3 md:px-0 md:mt-6 md:w-fit">
            <label for="other_2" class="ml-3 text-[17px] font-semibold">
                หมายเหตุเพิ่มเติม (ถ้ามี)
            </label>
            <textarea v-model="msg" name="other" id="other_2" maxlength="150"   class="block w-full h-[100px] resize-none pt-[10px]  rounded-xl bg-gray-300 p-2 mx-auto focus:outline-0
                md:w-[600px] md:h-[100px]
            "></textarea>
        </div>
    </div>
</template>
<style scoped>
</style>