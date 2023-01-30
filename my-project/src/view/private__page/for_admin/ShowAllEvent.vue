<script setup>
import{ref,computed,onBeforeMount}from'vue'
const sampleDataLink="http://localhost:3000/events"
const isFilter=ref(false)
const eventList=ref([])
const comment =ref('')
// bg color status
const changeColorBy=(v)=>{
    let style=[]
    
    if(v=='request'){
        style.push('background-color:rgb(31 41 55)')
        style.push('color: rgb(255 255 255);')
        
    }else
    if(v=='open_Case'){
        style.push('background-color:rgb(245 158 11)')
        style.push('color: rgb(255 255 255);')
    }else
    if(v=='in_Progress'){
        style.push('background-color:rgb(56 189 248)')
        style.push('color: rgb(255 255 255);')
    }else
    if(v=='finish'){
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

// change status
const changeST =(v)=>{
    // let status = document.getElementById(v)
    eventch.value.status=v
}

const eventch=ref({})
const event=ref({})
// showInfo
const showInfoByID=async(v)=>{
    event.value=[]
    let detail =document.getElementById('goInfo')
    detail.setAttribute("href","#showInfo")

    let res=await fetch(`${sampleDataLink}/${v}`,{
        method:'GET'
    })
    if(res.status==200){
        console.log('get event successful')
        event.value=await res.json()
        eventch.value=event.value
        console.log(event.value)
    }else{
        console.log('error to get event')
    }
}

// show Info
const clickedInfo =()=>{
    document.getElementById('goInfo').click()
    console.log('Show all detail')
}

// getInfo
const getEvents =async(v)=>{
    let res = await fetch(sampleDataLink,{
        method:'GET'
    })
    if(res.status==200){
        console.log('get event already')
        eventList.value=await res.json()
       
    }else{
        console.log('error something can not get events')
    }
}

// delete
const deleteItem =async (v)=>{
    let res = await fetch(`${sampleDataLink}/${v}`,{
        method:'DELETE'
    })
    if(res.status==200){
        console.log('delete success')
        getEvents()
    }else{
        console.log('can not delete data error something')
    }
}

onBeforeMount(()=>{
    getEvents()
})
</script>
<template>
<div class="overflow-y-auto relative">
    <div class="">
        <div class="">
            
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4">
                        Request
                    </div>
                </div>
                <!-- button -->
                <div class="   right-[80px] top-[115px]  absolute">
                    <button @click="isFilter= !isFilter" class="flex w-fit">
                        <span class="font-semibold my-auto">
                            ตัวกรอง
                        </span> 
                        <img src="../../../assets/admin_page/filter.png" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
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
                    
                    <tbody> <!-- @click="clickedInfo" -->
                        <tr  v-for="data in eventList"  class="relative text-[15px] cursor-pointer bg-white border-b-2 border-gray-300 hover:border-gray-400 ">
                            
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
                                    <a @click="showInfoByID(data.id)" id="goInfo" >
                                        <img src="../../../assets/admin_page/edit.png" alt="delete_icon" class="w-[28px] m-2">
                                    </a>
                                    <img id="delete" @click="deleteItem(data.id)" src="../../../assets/admin_page/bin.png" alt="delete_icon" class="w-[30px] m-2 hover:bg-rose-300 rounded p-[2px]">
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
            <div  class="h-[100%] overflow-y-auto">
                <div id="summaryInfo" class=" w-fit mx-auto text-[25px] font-semibold">
                    <h3>
                        ข้อมูลเพิ่มเติม 
                    </h3>
                </div>

                <!-- first -->
                <table class="w-full   mt-10  text-[20px] font-semibold ">
                   <tbody >
                        <tr >
                            <td class="text-right w-[130px]">
                                ของผู้ใช้ :
                            </td>
                            <td class="truncate w-[]">
                                {{ event.user }}
                            </td>
                        </tr>
                        <tr>
                            <td class="text-right">
                                ประเภทของ :
                            </td>
                            <td>
                                {{event.useT}}
                            </td>
                        </tr>
                        <tr>
                            <td class="text-right">
                                ยี่ห้อ : 
                            </td>
                            <td>
                                {{event.userTU}}
                            </td>
                        </tr>
                        <tr>
                            <td class="text-right">
                                S/N :
                            </td>
                            <td>
                                023u09234234234
                            </td>
                        </tr>
                   </tbody>
                </table>
                
                <!-- <div  class="mt-10  text-[20px] font-semibold ">
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
                </div> -->

                <!-- second  -->
                <div class="mt-4 ">
                    <div class="text-[20px] font-semibold">
                        <h3 >
                        ชนิดของ Hardware 
                        </h3>
                                            
                    </div>

                    
                    <div class=" mt-4 text-[15px] font-medium">
                        <!-- notebook -->
                        <div class="w-[70px]  p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            {{event.typeM}}
                            </h3>
                        </div >
                    </div>
                </div>

                <!-- problem -->
                <div   class="mt-4 " >
                    <div class="text-[20px] font-semibold">
                        <h3 >
                            อาการของ Hardware ที่พบ
                        </h3>   
                    </div>

                    
                    <div class="grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                        
                        <div  v-for="data in event.problems" class="w-[70px] mx-auto p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            {{data}}
                            </h3>
                        </div >
                        <div   class="w-[70px] mx-auto p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            other
                            </h3>
                        </div >

                    </div>
                </div>

                <!-- massage other -->
                <div   class=" w-full mt-10 ">
                    <div v-show="event.other !=''"  class="">
                        <label for="other_1" class="ml-2 text-[17px] font-semibold inline-b">
                            กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
                        </label>
                        <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                        <textarea v-model="event.other"  name="other" id="other_1"  disabled class="w-full h-[100px] resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                    </div>
                    
                    <div v-show="event.massage !=''" class="">
                        <label for="other_2" class="ml-2 text-[17px] font-semibold">
                            ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)
                        </label>
                        <textarea v-model="event.massage"  name="other" id="other_2"  disabled class="w-full h-[100px] resize-none block bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
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
                            <div class="grid grid-cols-2 gap-y-2 gap-x-2 mt-1 text-[15px] font-bold">
                                <button id="request" @click="changeST('request')" :style="changeColorBy('request')" class="bg-gray-600 text-gray-300 p-2 text-center hover:bg-gray-300 hover:text-gray-600">
                                    Request
                                </button>
                                <button id="open_case" @click="changeST('open_case')" :style="changeColorBy('open_case')" class="bg-gray-600 text-gray-300 p-2 text-center hover:bg-gray-300 hover:text-gray-600">
                                    Open Case
                                </button>
                                <button id="in_progress" @click="changeST('in_progress')" :style="changeColorBy('in_progress')" class="bg-gray-600 text-gray-300 p-2 text-center hover:bg-gray-300 hover:text-gray-600">
                                    In Progress
                                </button>
                                <button id="finish" @click="changeST('finish')" :style="changeColorBy('finish')" class="bg-gray-600 text-gray-300 p-2 text-center hover:bg-gray-300 hover:text-gray-600">
                                    Finish
                                </button>
                            </div>
                        </div>

                        <div class="w-fit mx-auto">
                            <h5 class="font-semibold">
                                Assign
                            </h5>
                            <select name="" id="" class="w-[200px] mt-2 p-1 bg-gray-400 text-gray-700 font-semibold rounded">
                                <option value="" selected disabled>เลือกผู้รับผิดชอบ</option>
                                <option value="Testing_Tseing " class="font-semibold bg-gray-300">Testing Tseing</option>
                                <option value="gnitset_testing" class="font-semibold bg-gray-300">gnitset testing</option>
                                <option value="Testing_Tseing " class="font-semibold bg-gray-300">Testing Tseing</option>

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
                        <textarea v-model="comment"  name="other" id="other_1"   class="w-full h-[100px] resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                    </div>
                    
                    <div>

                    </div>
                </div>
                
                <!-- button -->
                <div v-show="eventch != event" class="w-fit mx-auto mt-10">
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