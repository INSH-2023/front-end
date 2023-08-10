<script setup>
import {ref,computed,onBeforeMount,onUpdated,onMounted} from 'vue'
import Img1 from './../../assets/stages/1.png';
import Img2 from './../../assets/stages/2.png';
import Img3 from './../../assets/stages/3.png';
import Img4 from './../../assets/stages/4.png';
import Img5 from './../../assets/stages/5.png';

const imgList = ref([Img1,Img2,Img3,Img4,Img5])

const props =defineProps({
    stage:{
        type:Number,
        default:0
    },
    full_stage:{
        type:Number,
        default:0
    }
})

const full_stage=ref(0)
const stage=ref(0)

// const imageLink=`${import.meta.env.VITE_BACK_END_HOST}/images`
// const computedIconForSrc=(id)=>{
//     // console.log('sdfjlasdjflasdjf      ',full_stage.value)
//     if(id>(full_stage.value+1) || id<0){
//        console.log('cannot get images BaseProgress!!')
//     }else
//     { console.log(`${imageLink}/stage/${full_stage.value}/${id}.png`)
//         return `${imageLink}/stage/${full_stage.value}/${id}`
        
//         // http://localhost:5000/api/image/stage_5/
//     }
// }


// const computedIconForSrc=computed((stage=0)=>{
//     // return '../../assets/vue.svg'
//     let src=''
//     if(full_stage.value==5){
//         src=`../../assets/${srcIconV.value[stage]}`
//         console.log(`../../assets/vue.svg`)
//     }else
//     if(full_stage.value==3){
//         src=`../../assets/${srcIconIII.value[stage]}`
//     }else 
//     if(full_stage.value==2){
//         src=`../../assets/${srcIconII.value[stage]}`
//     }else{
//         return console.log('error cannot return src for images !!!')
//     }
//     return src
// })
onBeforeMount(()=>{
    countAllStage()
})
onMounted(()=>{
    getAllStage()
})
onUpdated(()=>{
    setStage()
})

const getAllStage = () => {
    document.getElementsByClassName('stage_color')[0].classList.replace("bg-[#EDEDE9]","bg-[#b7e4c7]")
}

const countAllStage =()=>{
    let number = props.full_stage
    if(typeof(number) =='number'){
        console.log(number)
        full_stage.value = number
        imgList.value = imgList.value.slice(-number)
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
        // circle[number].classList.add("bg-rose-300")
        circle[number].classList.replace("bg-[#EDEDE9]","bg-[#b7e4c7]")

        // circle[number-1].classList.remove("bg-rose-300")
        stage.value=number
    }else 
    if(number < stage.value && !(number<=-1)){
        // circle[number].classList.add("bg-rose-300")
        circle[number+1].classList.replace("bg-[#b7e4c7]","bg-[#EDEDE9]")
        stage.value=number
    }
}

</script>
<template>
    <!-- progress -->
    <ul  class=" flex justify-around">
        <li v-for="(img,index) in imgList" >
            <div  class="relative z-0 stage_color w-[45px] h-[45px]  bg-[#EDEDE9] rounded-full">
                <img :src="img" alt="icon" class="absolute z-10 inset-0 w-[22px] h-[22px] m-auto brightness-200" :key=index>
                <!-- <img v-else-if="full_stage==3" :src="srcIconIII[0]" alt="icon" class=" w-[20px] h-[20px] mx-auto">
                <img v-else-if="full_stage==2" v-attr="src=`${srcIconII[0]}`" alt="icon" class=" w-[20px] h-[20px] mx-auto"> -->

                <!-- <img  src="../../assets/vue.svg" alt="icon" class=" w-[20px] h-[20px] mx-auto"> -->

            </div>
        </li>
    </ul>

</template>
<style scoped>
</style>