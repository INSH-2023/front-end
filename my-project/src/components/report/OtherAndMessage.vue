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
    <div v-if="props.isTypeP_other==false"  class="w-fit flex flex-nowrap mt-10 mx-auto">
        <!-- subject not other only -->
        <div v-show="props.isOther==true" class="mx-4">
            <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
            </label>
            <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
            <textarea v-model="other_msg" name="other" id="other_1" cols="50" rows="10" class="resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
        </div>

        <div  class="mx-4">
            <label for="other_2" class="ml-3 text-[17px] font-semibold">
                <span v-if="props.service_it==true">ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)</span>
                <span v-if="props.service_it==false">ระบุรายละเอียดเพิ่มเติม (ถ้ามี)</span> 
            </label>
            <textarea v-model="msg" name="other" id="other_2" cols="50" rows="10" class="resize-none block bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
        </div>
    </div>

    <div v-else-if="props.isTypeP_other==true" class="mt-10 mx-auto w-fit mx-auto">
        <!-- suject is other -->
        <div class="mx-4">
            <label for="other_1" class="ml-3 text-[17px] font-semibold inline-b">
                ระบุ รายละเอียด หรือ ความต้องการของคุณ
            </label>
            <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
            <textarea v-model="other_msg" name="other" id="other_1"  class="resize-none pt-[10px] block w-[700px] h-[150px] rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
        </div>

        <div  class="mx-4 mt-4">
            <label for="other_2" class="ml-3 text-[17px] font-semibold">
                หมายเหตุเพิ่มเติม (ถ้ามี)
            </label>
            <textarea v-model="msg" name="other" id="other_2"  class="resize-none block w-[700px] h-[150px] bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
        </div>
    </div>
</template>
<style scoped>
</style>