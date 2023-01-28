<script setup>

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
</script>
<template>
    <div class="flex mx-auto w-fit text-[40px] px-4 py-2 mt-4 bg-gray-300 rounded-3xl">

<!-- การแจ้งซ่อม -->
<button class=" flex mx-2  px-7 bg-amber-500 text-gray-100  rounded-2xl ">
    <h5>
    การแจ้งซ่อม                
    </h5>
    <h5 class="ml-4">
        {{nRequest}}
    </h5>
</button >

<!-- กำลังดำเนินการ -->
<button class=" flex mx-2  px-7 bg-sky-500 text-gray-100  rounded-2xl ">
    <h5>
    กำลังดำเนินการ                
    </h5>
    <h5 class="ml-2">
        {{nProgress}}
    </h5>
</button>

<button class=" flex mx-2  px-7 bg-teal-400 text-gray-100  rounded-2xl ">
    <h5>
    เสร็จสิ้น               
    </h5>
    <h5 class="ml-2">
        {{ nFinish }}
    </h5>
</button>

<hr v-if="isRequest==true" class="bg-gray-700 h-[35px] w-[2px] m-auto mx-2">

<!-- แจ้งซ่อม -->
<button v-if="isRequest==true" class=" flex mx-2  px-7 bg-rose-500 text-gray-100  rounded-2xl ">
    <h5>
    แจ้งซ่อม              
    </h5>
</button>
</div>

</template>
<style scoped>
</style>