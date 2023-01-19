<script setup>
import{ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'

const {params} = useRoute()
const name =params.name

// for validate hardware
const hf = ref(undefined)


// testing button
const tButton =()=>{
    console.log(name)
}
</script>
<template>
<div class="overflow-auto">
    <div class="pt-3">
        
        <!-- this is  hardware -->
        <div v-if="name=='hardware'" class="w-[1000px] mx-auto">
            
            <!-- first -->
            <div>
                <h3>
                    1. เลือก
                    <span>
                        ประเภท
                    </span>
                    อุปกรณ์ ของคุณ
                </h3>
                <div class="flex">
                    <div class="flex m-2" >
                        <input v-model="hf" id="Organization" type="radio" name="hardware_of" value="or" class="m-auto mr-3"> 
                        <label for="Organization" class="m-auto">
                            NoteBook / PC :ของสำนักงาน
                        </label>                       
                    </div>
                    <div class="flex m-2">
                        <input v-model="hf" id="Self" type="radio" name="hardware_of" value="sf" class="m-auto mr-3">
                        <label for="Self" class="m-auto">
                            NoteBook / PC :ของส่วนตัวโปรดระบุ ยี้ห้อ / รุ่น
                        </label>
                        
                    </div>


                </div>                
            </div>

            <!-- second -->
            <div >
                <h3>
                    2. เลือก
                    <span>
                        ชนิด
                    </span>
                    อุปกรณ์ของคุณ
                </h3>
                <div class="grid grid-cols-6 gap-y-2 gap-x-2">
                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>                 
                </div>
               

            </div>

            <!-- third -->
            <div >
                <h3>
                    3. เลือก
                    <span>
                        ปัญหา
                    </span>
                    Hardware ที่ต้องการให้ความช่วยเหลือ
                </h3>
                <div class="grid grid-cols-6 gap-y-2 gap-x-2 ">
                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300"> 
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button>                    

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button> 

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button> 

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button> 

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button> 

                    <!-- notebook -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            NoteBook
                        </h3>
                    </button> 

                    <!-- other -->
                    <button class="w-[100px] mx-auto p-2 hover:bg-gray-300">
                        <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[100px] mx-auto">
                        <h3 class="w-fit mx-auto">
                            อื่นๆโปรดระบุ
                        </h3>
                    </button> 
                </div>
            </div>

            <!-- Fourth -->
            <div class="">
                <div>
                    <label>
                        กรณีเลือก<span>อื่นๆโปรดระบุ</span>
                    </label>
                    <textarea name="" id="" cols="30" rows="10" class="resize-none"></textarea>
                </div>
                <div>

                </div>
            </div>

            this is report par {{ name }}
        </div>
    </div>
</div>   
</template>
<style scoped>
</style>