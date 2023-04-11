<script setup>
const props =defineProps({
    status:{
        type:undefined
        
    },
    title:{
        type:String,
        default:'',
        // required:true
    },
    message:{
        type:String,
        default:'',
        // required:true
    }
})

</script>
<template>
    <!-- waring -->
    <div v-if="props.status==false" class="absolute top-10 right-0 w-[300px] h-fit p-3 bg-[#fcbf49] border-l-2 border-gray-500">
        <!-- header -->
        <h4 class="font-semibold text-[16px]">
            {{props.title}}
        </h4>
        <!-- article -->
        <h5 class="font-light text-[14px]">
            {{ props.message }}
        </h5>
        <button class="absolute top-1 right-2">
            X
        </button>
    </div>
    <!-- error -->
    <div v-else-if="props.status==true" class="absolute top-10 right-0 w-[300px] h-fit p-3 bg-[#ef233c] border-l-2 border-gray-500">
        <h4 class="font-semibold text-[16px]">
            {{props.title}}
        </h4>
        <!-- article -->
        <h5 class="font-light text-[14px]">
            {{ props.message }}
        </h5>
    </div>
</template>
<style>

</style>