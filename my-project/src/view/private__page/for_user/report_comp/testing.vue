<script setup>
import {ref,computed,onUpdated,onBeforeMount} from 'vue'
let props = defineProps({
    msg:String
})

let data=ref('')

let emit =defineEmits(["capturedata"])

const showProps =()=>{
    console.log(props.msg)
    console.log('hello',props.msg)
    emit('capturedata',data.value)
}
// const helloG=computed(()=>{
//     return 'เป็นไรคัฟสุดหล่อ'
// })
onUpdated(()=>{
    // emit('capturedata',data.value)
    
})
onBeforeMount(()=>{
    setInterval(()=>emit("capturedata",Date()),100)
    
})
</script>
<template>
    <!-- <button @click="showProps">click mee!!</button> -->
    <input type="text" @change="showProps" v-model="data"></template>
<style scoped>
</style>