<script setup>
import {ref,computed,onBeforeMount,onUpdated,onMounted} from 'vue'
const props =defineProps({
    stage:{
        type:Number,
        default:"0"
    },
    full_stage:{
        type:Number,
        default:"0"
    }
})

const full_stage=ref(0)
const stage=ref(0)

onBeforeMount(()=>{
    countAllStage()
})
onMounted(()=>{
    document.getElementsByClassName('stage_color')[0].classList.add("bg-rose-300")
})
onUpdated(()=>{
    setStage()
})

const countAllStage =()=>{
    let number = props.full_stage
    if(typeof number =='number'){
        console.log(typeof number)
        full_stage.value = number

        
    }else {
        console.log('use default full_stage data')
        full_stage.value = 0
    }
}


const setStage=()=>{
   
    let number =props.stage
    console.log('porps ', props.stage)
   
    let circle = document.getElementsByClassName("stage_color")

    // more then full
    if(props.stage > full_stage.value-1){
        number=full_stage.value-1
    }else //less then 0
    if(props.stage<0 ){
        number=0
    }

    // check input with stage
    if(number > stage.value && !(number>=full_stage.value)){
        circle[number].classList.add("bg-rose-300")
        // circle[number-1].classList.remove("bg-rose-300")
        stage.value=number
    }else 
    if(number < stage.value && !(number<=-1)){
        // circle[number].classList.add("bg-rose-300")
        circle[number+1].classList.remove("bg-rose-300")
        stage.value=number
    }
}

</script>
<template>
    <!-- progress -->

                <ul  class=" flex justify-around">
                    <li v-for="index  in full_stage" :key=index>
                        <div  class="stage_color w-[45px] h-[45px] p-1 bg-gray-400 rounded-full">

                        </div>
                    </li>
                </ul>

</template>
<style scoped>
</style>