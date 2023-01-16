<script setup>
import { onBeforeMount,ref } from 'vue';


const datalink ='http://localhost:3000/events'
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
<div class="block z-10   bg-gray-200 mx-auto">
    <div class="w-[100%] h-[100%] overflow-y-auto    bg-gray-300">
   <table class="table-fixed  w-full ">
        <tr class="sticky top-0 h-4 text-lg bg-gray-400">
            <th >title</th>
            <th>username</th>
            <th>category</th>
            <th>note</th>
            <th>file</th>
            <th>status</th>
            <th></th>
        </tr>
        <tr v-for="(data,index) in data"  class="p-3 w-fit">
            <td :key="index" class="text-center">{{ data.title }}</td>
            <td :key="index" class="text-center">{{ data.user }}</td>
            <td  :key="index" class="text-center">{{ data.event }}</td>
            <td  :key="index" class="text-center">{{ data.event }}</td>
            <td  :key="index" class="text-center">{{ data.event }}</td>
            <td  :key="index" class="text-center">{{ data.event }}</td>

            <td class="text-center">
                <button class="bg-rose-400 text-white p-1.5 rounded">details</button>
            </td>
            
        </tr>
   </table>
    </div>
</div>
</template>
<style scoped>
</style>