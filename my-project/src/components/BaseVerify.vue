<script setup>
import{useRouter}from 'vue-router'
const myRouter = useRouter()
defineProps({
    nRequest:{
        type:Number,
        default: 0
    },
    nProgress:{
        type:Number,
        default: 0
    },
    nFinish:{
        type:Number,
        default: 0
    },
    isRequest:{
        type:Boolean,
        default:false
    }
})



const closeP =(id)=>{
    let button =document.getElementById(id)
    button.setAttribute("href","#")
    button.click()
}
</script>
<template>
    <!-- verify -->
    <div id="veri" class="overlay">
        <div class=" verify_s h-96 ">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะแก้ไขข้อมูลใช่หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <a id="submit_edit" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    <button @click="submitt(event.id,'submit_edit')" >
                        ทำการแก้ไข
                    </button>                    
                </a>

            </div>
        </div>
    </div>

    <!-- delete -->
    <div id="dele" class="overlay">
        <div class=" verify_d h-96 ">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะลบข้อมูลนี้หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <a id="submit_delete" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    <button @click="deleteItem(event.id,'submit_delete')" >
                        ลบเลย !!
                    </button>                    
                </a>

            </div>
        </div>
    </div>
</template>
<style scoped>
</style>