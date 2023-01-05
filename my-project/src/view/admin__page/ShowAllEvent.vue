<script setup>
import { onBeforeMount,ref } from 'vue';


const datalink ='http://localhost:3000/posts'
const data = ref([])

const getData = async()=>{
const res =await fetch(datalink,{
    method:'GET'
})
    if(res.status==200){
        console.log('get data already?')
        data.value=await res.json()
    }
}
onBeforeMount(()=>{
    getData()
})
</script>
<template>
    <div >
       <ul v-for="(data,index) in data">
        <li>
            {{data.title}}
        </li>
       </ul>
        
    </div>
</template>
<style scoped>
</style>