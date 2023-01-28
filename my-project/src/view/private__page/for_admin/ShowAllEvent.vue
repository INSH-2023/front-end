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
const isFilter=ref(false)

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

// show Info
const showInfo =()=>{
console.log('hello')
}
</script>
<template>
<div class="overflow-y-auto relative">
    <div class="">
        <div class="">
            
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/vue.svg" alt="users_icon" class="w-[40px] mr-4">
                        Request
                    </div>
                </div>
                <!-- button -->
                <div class="   right-[80px] top-[115px]  absolute">
                    <button @click="isFilter= !isFilter" class="flex w-fit">
                        <span class="font-semibold my-auto">
                            ตัวกรอง
                        </span> 
                        <img src="../../../assets/vue.svg" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
                    </button>
                </div>

                <!-- filter -->
                <div v-show="isFilter==true" class="w-fit mx-auto absolute">
                    <div class="flex ">
                        <div class="p-3">
                            testing filter
                        </div>
                        <div class="p-3">
                            testing filter
                        </div>
                        <div class="p-3">
                            testing filter
                        </div>
                        <div class="p-3">
                            testing filter
                        </div>
                    </div>
                </div>
            </div>
                
            

        
              <!-- table -->    
        <div class="w-[1200px] mx-auto  h-[450px] mt-16"> 
            <hr class="mt-3 bg-gray-700  w-[1170px] h-[3px]">
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
                                <div class="flex w-fit mx-auto truncate ">
                                    <a href="#showInfo">
                                        <img src="../../../assets/vue.svg" alt="delete_icon" class="w-[28px] m-2">
                                    </a>
                                    <img src="../../../assets/vue.svg" alt="delete_icon" class="w-[28px] m-2">
                                </div>
                            </td>
                            
                        </tr>
                    </tbody>
                    
                </table>    
            </div>    
        </div>
        </div> 
    </div>

    <!-- show detail -->
    <div id="showInfo" class="overlay">
        <div class=" popup2 h-96 ">
            <div class="h-[100%] overflow-y-auto">
                <div id="summaryInfo" class=" w-fit mx-auto text-[25px] font-semibold">
                    <h3>
                        ข้อมูลเพิ่มเติม 
                    </h3>
                </div>

                <!-- first -->
                <div  class="mt-10  text-[20px] font-semibold ">
                    <div class="w-fit">
                        <h3>
                            ของ : 
                        </h3>
                        <h3 class="w-fit mx-auto mr-2">
                            ประเภทของ Hardware :
                        </h3>
                        <h3 class="w-fit mx-auto mr-2">
                            ยี้ห้อ : 
                        </h3>
                        <h3 class="w-fit mx-auto mr-2">
                            S/N : 
                        </h3>                    
                    </div>
                </div>
                <!-- second  -->
                <div class="mt-4 ">
                    <div class="text-[20px] font-semibold">
                        <h3 >
                        ชนิด Hardware อุปกรณ์ของคุณ
                        </h3>
                                            
                    </div>

                    
                    <div class=" mt-4 text-[15px] font-medium">
                        <!-- notebook -->
                        <div class="w-[70px]  p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            Notebook
                            </h3>
                        </div >
                    </div>
                </div>

                <!-- problem -->
                <div   class="mt-4 " >
                    <div class="text-[20px] font-semibold">
                        <h3 >
                            อาการของ Hardware ของคุณ
                        </h3>   
                    </div>

                    
                    <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                        
                        <div   class="w-[70px] mx-auto p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            Notebook testing
                            </h3>
                        </div >
                        <div   class="w-[70px] mx-auto p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            Notebook testing
                            </h3>
                        </div >

                    </div>
                </div>

                <!-- massage other -->
                <div   class=" w-full mt-10 ">
                    <div  class="">
                        <label for="other_1" class="ml-2 text-[17px] font-semibold inline-b">
                            กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
                        </label>
                        <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                        <textarea v-model="others" name="other" id="other_1"  disabled class="w-full h-[100px] resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                    </div>
                    
                    <div  class="">
                        <label for="other_2" class="ml-2 text-[17px] font-semibold">
                            ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)
                        </label>
                        <textarea v-model="massage" name="other" id="other_2"  disabled class="w-full h-[100px] resize-none block bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
                    </div>
                    <div>

                    </div>
                </div>

                <!-- edit status and assign -->
                <div class="w-full mt-4">
                    <div class="flex">
                        <div class="ml-3 w-[250px]">
                            <h5 class="font-semibold">
                                Status
                            </h5>
                            <div class="grid grid-cols-2 gap-y-2 gap-x-2 mt-1 text-[15px] font-medium">
                                <button class="bg-gray-600 text-gray-300 p-2 text-center">
                                    Request
                                </button>
                                <button class="bg-gray-600 text-gray-300 p-2 text-center">
                                    Request
                                </button>
                                <button class="bg-gray-600 text-gray-300 p-2 text-center">
                                    Request
                                </button>
                                <button class="bg-gray-600 text-gray-300 p-2 text-center">
                                    Request
                                </button>
                            </div>
                        </div>

                        <div class="w-fit mx-auto">
                            <h5 class="font-semibold">
                                Assign
                            </h5>
                            <select name="" id="" class="w-[200px] mt-2 p-1 bg-gray-400 text-gray-700 font-semibold rounded">
                                <option value="" selected disabled>เลือกผู้รับผิดชอบ</option>
                                <option value="Testing_Tseing " class="font-semibold">Testing Tseing</option>
                                <option value="gnitset_testing" class="font-semibold">gnitset testing</option>

                            </select>
                        </div>

                    </div>
                </div>

                <!-- comment -->
                <div   class=" w-full mt-10 ">
                    <div  class="">
                        <label for="other_1" class="ml-2 text-[17px] font-semibold inline-b">
                            Comment
                        </label>
                        <textarea v-model="others" name="other" id="other_1"  disabled class="w-full h-[100px] resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                    </div>
                    
                    <div>

                    </div>
                </div>
                
                <!-- button -->
                <div class="w-fit mx-auto mt-10">
                    <button @click="isSummary=true" class="w-[130px] mx-3 p-2 font-semibold bg-rose-400 text-white rounded-xl">
                        <h4>
                            ทำการแก้ไข
                        </h4>
                    </button>
                </div>
                
            </div>

            <div class="absolute top-[10px] right-[20px] font-bold text-[30px]">
                <a href="#">X</a>
            </div>
        </div>
    </div>
</div>


</template>
<style scoped>

/* info detail */
/* submit */
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}
.popup2 {
  margin: auto;
  margin-top: 3%;
  /* overflow-y: auto; */
  padding: 40px;
  background: #fff;
  width: 40%;
  height: 600px;
  border-radius: 20px;
  position: relative;
  transition: all 5s ease-in-out;
}
.popup2 h2 {
  margin-top: 0;
  color: #333;
}
.popup2 .option {
  bottom: 0;
}
@media screen and (max-width: 700px) {
  .popup2 {
    width: 70%;
  }
  .option {
    width: 20%;
  }
}

</style>