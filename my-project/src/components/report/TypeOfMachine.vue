<script setup>
import {ref,computed,onUpdated} from 'vue'
const props = defineProps({
    // typeOfUse:{
    //     type:String,
    //     required:true 
    // },
    item:{
        type:Array,
        required:false
    }
})

const emit=defineEmits(["getTypeOfM"])

onUpdated(()=>{
    emit('getTypeOfM',typeM.value)
})

const typeM=ref('')



</script>
<template>
        <div class="text-[20px] font-semibold">
            <h3 >
                2. เลือก <span class="text-rose-500">ชนิด</span> อุปกรณ์ของคุณ
            </h3>                    
        </div>

                
        <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
            <!-- notebook -->
            <button @click="typeM='NoteBook'" name="problem" :style="[typeM=='NoteBook'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                <img src="../../assets/machine/laptop.png" alt="NoteBook" class="w-[80px] mx-auto">
                <h3 class="w-fit mx-auto">
                    NoteBook
                </h3>
            </button>

            <!-- PC -->
            <button @click="typeM='PC'" name="problem" :style="[typeM=='PC'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                <img src="../../assets/machine/pc.png" alt="NoteBook" class="w-[80px] mx-auto">
                <h3 class="w-fit mx-auto ">
                    PC
                </h3>
            </button>
                    
            <!-- Smart Phone -->
            <button @click="typeM='Smart_Phone'" name="problem" :style="[typeM=='Smart_Phone'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                <img src="../../assets/machine/phone.png" alt="NoteBook" class="w-[80px] mx-auto">
                <h3 class="w-fit mx-auto text-[14px]">
                    Smart Phone
                </h3>
            </button>

            <!-- Tablet -->
            <button @click="typeM='Tablet'" name="problem" :style="[typeM=='Tablet'?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
                <img src="../../assets/machine/tablet.png" alt="NoteBook" class="w-[80px] mx-auto">
                <h3 class="w-fit mx-auto">
                    Tablet
                </h3>
            </button>
        </div>
</template>
<style scoped>
</style>