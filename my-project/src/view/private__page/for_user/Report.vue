<script setup>
import{ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'
const {params} = useRoute()
const name =params.name

// testing button
const tButton =()=>{
    console.log(name)
}
</script>
<template>
<div class="overflow-auto">
    <div class="pt-3">
        
        <!-- this is  hardware -->
        <div v-if="name=='hardware'" class="w-fit mx-auto">
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
                        <input type="radio" class="m-auto mr-3"> 
                        <h4 class="m-auto">
                            NoteBook / PC :ของสำนักงาน
                        </h4>                       
                    </div>
                    <div class="flex m-2">
                        <input type="radio" class="m-auto mr-3">
                        <h4 class="m-auto">
                            NoteBook / PC :ของส่วนตัวโปรดระบุ ยี้ห้อ / รุ่น
                        </h4>
                    </div>


                </div>                
            </div>

            this is report par {{ name }}
        </div>
    </div>
</div>   
</template>
<style scoped>
</style>