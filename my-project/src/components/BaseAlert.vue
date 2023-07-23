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
    },
    type:{
        type:String,
        default:'L',

    },
    msgArr:{
        type:Array,
        default:[]
    }
})

</script>
<template>
    <!-- login -->
    <div v-if="props.type =='L'" >
    <!-- waring -->
        <div v-if="props.status==false" >
            <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#fcbf49] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 class="font-light text-[14px]">
                    {{ props.message }}
                </h5>
            </div>
            <div class="relative block  w-[300px] h-fit mx-auto mt-2 mb-3 p-3 border-2 border-[#fcbf49] rounded sm:w-[400px] lg:hidden lg:hidden">
                <h4 class="font-semibold text-[16px] text-[#fcbf49]">
                    {{props.title}}
                    sdfsdf
                </h4>
                <!-- article -->
                <h5  class="font-light text-[14px] text-[#fcbf49]">
                    {{ props.message }}
                </h5>
            </div>
            <!-- header -->
            
            <!-- <button @click="props.status=undefined" class="absolute top-1 right-2">
                X
            </button> -->
        </div>
        <!-- error -->
        <div v-else-if="props.status==true" >
            <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#ef233c] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 class="font-light text-[14px]">
                    {{ props.message }}
                </h5>
            </div>
            <div class="relative block  w-[300px] h-fit mx-auto mt-2 mb-3 p-3 border-2 border-[#ef233c] rounded sm:w-[400px] lg:hidden lg:hidden">
                <h4 class="font-semibold text-[16px] text-[#ef233c]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 class="font-light text-[14px] text-[#ef233c]">
                    {{ props.message }}
                </h5>
            </div>
        </div>
    </div>


    <div v-else-if="props.type=='R'">
        <div v-if="props.status==false" >
            <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#fcbf49] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 class="font-light text-[14px]">
                    {{ props.message }}
                </h5>
            </div>
            <div class="relative block  w-[300px] h-fit mx-auto mt-2 mb-3 p-3 border-2 border-[#fcbf49] rounded sm:w-[400px] lg:hidden lg:hidden">
                <h4 class="font-semibold text-[16px] text-[#fcbf49]">
                    {{props.title}}
                    sdfsdf
                </h4>
                <!-- article -->
                <h5  class="font-light text-[14px] text-[#fcbf49]">
                    {{ props.message }}
                </h5>
            </div>
            <!-- header -->
            
            <!-- <button @click="props.status=undefined" class="absolute top-1 right-2">
                X
            </button> -->
        </div>
        <!-- error -->
        <div v-else-if="props.status==true" >
            <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#ef233c] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 class="font-light text-[14px]">
                    {{ props.message }}
                </h5>
            </div>
            <div class="relative block  w-[300px] h-fit mx-auto mt-2 mb-3 p-3 border-2 border-[#ef233c] rounded sm:w-[400px] lg:hidden lg:hidden">
                <h4 class="font-semibold text-[16px] text-[#ef233c]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 class="font-light text-[14px] text-[#ef233c]">
                    {{ props.message }}
                </h5>
            </div>
        </div>
    </div>


    <div v-else-if="props.type=='CU'">
        <div v-if="props.status==false" >
            <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#fcbf49] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px]">
                    {{ text }}
                </h5>
            </div>
            <div class="relative block  w-[300px] h-fit mx-auto mt-2 mb-3 p-3 border-2 border-[#fcbf49] rounded sm:w-[400px] lg:hidden lg:hidden">
                <h4 class="font-semibold text-[16px] text-[#fcbf49]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px] text-[#fcbf49]">
                    {{ text }}
                </h5>
            </div>
            <!-- header -->
            
            <!-- <button @click="props.status=undefined" class="absolute top-1 right-2">
                X
            </button> -->
        </div>
        <!-- error -->
        <div v-else-if="props.status==true" >
            <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#ef233c] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px]">
                    {{ text }}
                </h5>
            </div>
            <div class="relative block  w-[300px] h-fit mx-auto mt-2 mb-3 p-3 border-2 border-[#ef233c] rounded sm:w-[400px] lg:hidden lg:hidden">
                <h4 class="font-semibold text-[16px] text-[#ef233c]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px] text-[#ef233c]">
                    {{ text }}
                </h5>
            </div>
        </div>
    </div>

    <div v-else-if="props.type=='EU'">
        <div v-if="props.status==false" >
            <!-- <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#fcbf49] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                article
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px]">
                    {{ text }}
                </h5>
            </div> -->
            <div class="relative block  w-[300px] h-fit mx-auto mt-4 mb-3 p-3 border-2 border-[#fcbf49] rounded sm:w-[400px] ">
                <h4 class="font-semibold text-[16px] text-[#fcbf49]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px] text-[#fcbf49]">
                    {{ text }}
                </h5>
            </div>
            <!-- header -->
            
            <!-- <button @click="props.status=undefined" class="absolute top-1 right-2">
                X
            </button> -->
        </div>
        <!-- error -->
        <div v-else-if="props.status==true" >
            <!-- <div class="relative hidden top-20 right-0 w-[300px] h-fit p-3 bg-[#ef233c] border-l-2 border-gray-500 lg:block lg:absolute">
                <h4 class="font-semibold text-[16px]">
                    {{props.title}}
                </h4>
                article
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px]">
                    {{ text }}
                </h5>
            </div> -->
            <div class="relative block  w-[300px] h-fit mx-auto mt-2 mb-3 p-3 border-2 border-[#ef233c] rounded sm:w-[400px] ">
                <h4 class="font-semibold text-[16px] text-[#ef233c]">
                    {{props.title}}
                </h4>
                <!-- article -->
                <h5 v-for="(text,index) of props.msgArr" :key="index" class="font-light text-[14px] text-[#ef233c]">
                    {{ text }}
                </h5>
            </div>
        </div>
    </div>

    
    
</template>
<style>

</style>