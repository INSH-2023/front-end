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
    <div class="w-fit mx-auto my-4 p-2 border-spacing-2">
        <table class="border-collapse border border-slate-500">
            <thead>
            <tr>
                <th class="border border-gray-700"> title </th>
                <th class="border border-gray-700"> username </th>
                <th class="border border-gray-700"> event </th>
                <!-- <th class="border border-gray-700"> details </th> -->
            </tr>                
            </thead>
            <tbody>
                <tr v-for="(data,index) in data" class="w-fit mx-auto ">
                <td >{{data.title}}</td>
                <td>{{data.user}}</td>
                <td>{{data.event}}</td>
                <td class="w-[10%] ">
                    <button class="w-fit mx-auto bg-rose-400 rounded-lg p-1.5">
                        details
                    </button>
                </td>
                </tr>                
            </tbody>

            
        </table>
       <!-- <ul v-for="(data,index) in data">
        <li class="">
            {{data.title}}
        </li>
       </ul> -->
        
    </div>
</template>
<style scoped>
</style>