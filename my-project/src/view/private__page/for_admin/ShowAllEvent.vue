<script setup>
import{ref,computed}from'vue'
const sampleData=ref([
    {
        "id":1,
        "user":"testingtestingtestingtesting",
        "group":"testing",
        "type":"IT Service",
        "subject":"testing",
        "data":"testing",
        "status":"Request",
        "Assign":"testing"
    },
    {
        "id":2,
        "user":"หำใหญ่ ไข่ดาว",
        "group":"testing",
        "type":"PR Service",
        "subject":"testing",
        "data":"testing",
        "status":"Open_Case",
        "Assign":"testing"
    },
    {
        "id":3,
        "user":"โดส ทำไรวะเพื่อน",
        "group":"testing",
        "type":"IT Service",
        "subject":"testing",
        "data":"testing",
        "status":"In_Progress",
        "Assign":"testing"
    },
    {
        "id":4,
        "user":"เทส กี",
        "group":"testing",
        "type":"IT Service",
        "subject":"testing",
        "data":"testing",
        "status":"Finish",
        "Assign":"testing"
    },
    {
        "id":5,
        "user":"testing",
        "group":"testing",
        "type":"IT Service",
        "subject":"testing",
        "data":"testing",
        "status":"Request",
        "Assign":"testing"
    },
    {
        "id":6,
        "user":"testing",
        "group":"testing",
        "type":"PR Service",
        "subject":"testing",
        "data":"testing",
        "status":"Finish",
        "Assign":"testing"
    },
    {
        "id":7,
        "user":"testing",
        "group":"testing",
        "type":"testing",
        "subject":"testing",
        "data":"testing",
        "status":"In_Progress",
        "Assign":"testing"
    },
    {
        "id":8,
        "user":"testing",
        "group":"testing",
        "type":"testing",
        "subject":"Request",
        "data":"testing",
        "status":"Finish",
        "Assign":"testing"
    },
    {
        "id":9,
        "user":"testing",
        "group":"testing",
        "type":"testing",
        "subject":"testing",
        "data":"testing",
        "status":"In_Progress",
        "Assign":"testing"
    },
    {
        "id":10,
        "user":"testing",
        "group":"testing",
        "type":"testing",
        "subject":"testing",
        "data":"testing",
        "status":"Request",
        "Assign":"testing"
    },
    {
        "id":11,
        "user":"testing",
        "group":"testing",
        "type":"testing",
        "subject":"testing",
        "data":"testing",
        "status":"Finish",
        "Assign":"testing"
    },
    {
        "id":12,
        "user":"testing",
        "group":"testing",
        "type":"testing",
        "subject":"testing",
        "data":"testing",
        "status":"Request",
        "Assign":"testing"
    },
    {
        "id":13,
        "user":"testing",
        "group":"testing",
        "type":"testing",
        "subject":"testing",
        "data":"testing",
        "status":"Request",
        "Assign":"testing"
    }
    
])

// bg color status
const changeColorStatus=(v)=>{
    let style=[]
    
    if(v=='Request'){
        style.push('background-color:rgb(31 41 55)')
        style.push('color: rgb(255 255 255);')
        
    }else
    if(v=='Open_Case'){
        style.push('background-color:rgb(245 158 11)')
        style.push('color: rgb(255 255 255);')
    }else
    if(v=='In_Progress'){
        style.push('background-color:rgb(56 189 248)')
        style.push('color: rgb(255 255 255);')
    }else
    if(v=='Finish'){
        style.push('background-color: rgb(45 212 191)')
        style.push('color: rgb(255 255 255);')
    }

    return style
}
</script>
<template>
<div class="overflow-auto">
    <div>
        <div>
            <div class="w-fit mx-auto mt-3 font-semibold text-[40px]">
                Request
            </div>
            <hr class="mt-3 bg-gray-700 mx-auto w-full h-[3px]">
            <div class="w-[1200px] mx-auto mt-3 relative overflow-x-auto">
                <table class="w-full text-sm text-center text-gray-800 ">
                    <thead class="text-lg ">
                        <tr >
                            <th scope="col" class="py-3 px-6 ">
                                User
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Group
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Type
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Subject
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Data
                            </th>
                            <th scope="col" class="p-3">
                                Status
                            </th>
                            <th scope="col" class="p-3">
                                Assign
                            </th>
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr v-for="data in sampleData" :key="data.id" class="text-[15px]  bg-white border-b-2 border-gray-700 hover:bg-gray-400 hover:rounded-lg">
                            <td class="w-[130px]   font-medium px-6 py-4 text-left">
                               <div class="w-[130px] text-ellipsis overflow-hidden">
                                    {{data.user}}
                               </div> 
                            </td>
                            <td class="px-6 py-4">
                                {{data.group}}
                            </td>
                            <td class="px-6 py-4">
                                {{data.type}}
                            </td>
                            <td class="px-6 py-4">
                                {{data.subject}}
                            </td>
                            <td class="px-6 py-4">
                                {{data.data}}
                            </td>
                            <td class="px-3 py-4 text-center ">
                               <div :style="[changeColorStatus(data.status)]" class="w-[120px] mx-auto static  py-[4px] px-[8px] rounded-2xl text-[15px] font-semibold">
                                    {{data.status}}
                               </div> 
                            </td>
                            <td class="px-6 py-4">
                                {{data.Assign}}
                            </td>
                        </tr>
                        
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
</style>