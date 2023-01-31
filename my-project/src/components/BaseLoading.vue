<script setup>
import {ref,onBeforeMount} from 'vue'

const arrayy=ref(['.'])
const wait =()=>{
    if(arrayy.value.length<4){
        arrayy.value.push('.')
    }else 
    if(arrayy.value.length==4){
        arrayy.value=[]
    }
 
}
onBeforeMount(()=>{
    setInterval(wait,500)
})
</script>
<template>
    <div class="flex m-auto">
        <div>
            Waiting            
        </div>
        <div v-for="(d,index) in arrayy" :key="index">
            {{d}}
        </div>

    </div>
</template>
<style scoped>
</style>
