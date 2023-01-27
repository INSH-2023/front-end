<script setup>
import{ref,computed}from'vue'
const sampleData=ref([
    {
        "id":1,
        "user":"testingtestingtestingtesting",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "type":"IT_Service",
        "subject":"Hardware",
        "date":"00/00/00",
        "status":"Request",
        "Assign":"testing"
    },
    {
        "id":2,
        "user":"หำใหญ่ ไข่ดาว",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "type":"PR_Service",
        "subject":"News",
        "date":"00/00/00",
        "status":"Open_Case",
        "Assign":"testing"
    },
    {
        "id":3,
        "user":"โดส ทำไรวะเพื่อน",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "type":"IT_Service",
        "subject":"News",
        "date":"00/00/00",
        "status":"In_Progress",
        "Assign":"testing"
    },
    {
        "id":4,
        "user":"เทส กี",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "type":"IT_Service",
        "subject":"Hardware",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testing"
    },
    {
        "id":5,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":6,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":7,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":8,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":9,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":10,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":11,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":12,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    },
    {
        "id":13,
        "user":"testingtestingtesting 12346579800000000",
        "email":"testingEmail@testingmain.com",
        "group":"testingtestingtestingtestingtesting",
        "type":"IT_Service",
        "subject":"Hardwaretestingtestingtestingtesting",
        "date":"00/00/00",
        "status":"Finish",
        "Assign":"testingtestingtesting testingtesting"
    }
])

// bg color status
const changeColorBy=(v)=>{
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

    if(v=='IT_Service'){
        style.push('color: rgb(14 165 233);')
        
    }else
    if(v=='PR_Service'){
        style.push('color: rgb(217 119 6);')
        
    }

    return style
}
</script>
<template>
<div class="">
    <div class="">

        <!-- header -->
        <div>
            
            <div class=" bg-gray-300">
                <div class="w-full text-center font-semibold text-[40px] ">
                    Request
                </div>
                <!-- button -->
                <div class=" w-fit mx-auto mr-[60px]">
                    <button class="flex w-fit">
                        <span class="font-semibold my-auto">
                            ตัวกรอง
                        </span> 
                        <img src="../../../assets/vue.svg" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
                    </button>
                </div>

                <!-- filter -->
                <div class="flex ">
                    <div >
                        <div>
                            testing
                        </div>
                    </div>
                </div>
            </div>
                
            <hr class="mt-3 bg-gray-700 mx-auto w-[90%] h-[3px]">

        </div> 
              <!-- table -->    
        <div class="w-[1200px] mx-auto  h-[500px] ">
               
            <div class="overflow-y-auto mx-auto h-[100%] w-[100%] ">
                <table class="w-full text-sm text-center text-gray-800 ">
                    <thead class="bg-white text-lg sticky top-0">
                        <tr class="">
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
                        <tr v-for="data in sampleData"  class="text-[15px] cursor-pointer bg-white border-b-2 border-gray-300 hover:border-gray-400 hover:bg-gray-400">
                            <td class="w-[140px]   font-medium px-6 py-4 text-left">
                            <div class="w-[130px] font-semibold truncate ">
                                {{data.user}}
                            </div>
                            <div class="w-[130px] text-[10px] truncate">
                                {{ data.email }}
                            </div> 
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div class="w-[120px] truncate">
                                {{data.group}}
                                </div>
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div :style="[changeColorBy(data.type)] " class="w-[120px] truncate">
                                {{data.type}}
                            </div>
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div class="w-[120px] truncate">
                                {{data.subject}}                                    
                                </div>

                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div class="w-[120px] ">
                                {{data.date}}
                                </div>
                            </td>
                            <td class="w-[130px] px-3 py-4 text-center ">
                            <div :style="[changeColorBy(data.status)]" class="w-[120px] mx-auto static  py-[4px] px-[8px] rounded-2xl text-[15px] font-semibold ">
                                {{data.status}}
                            </div> 
                            </td>
                            <td class="w-[130px] px-6 py-4 font-semibold">
                                <div class="w-[120px] truncate">
                                {{data.Assign}}                                    
                                </div>

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