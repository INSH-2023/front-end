<script setup>
import{ref,computed,onBeforeMount}from'vue'
import { useRouter } from 'vue-router';
import BaseLoading from '../../../components/BaseLoading.vue';
import toBackEnd from '../../../JS/fetchToBack';
import validate from '../../../JS//validate'

// const requestLink="http://localhost:3000/events"
const requestLink=`${import.meta.env.VITE_BACK_END_HOST}/requests`
// const linkTesting=`${import.meta.env.VITE_BACK_END}/`

const myRouter = useRouter()

onBeforeMount(()=>{
    navigation()
    getEvents()
})

// get variable
const requestList=ref([])
const showList =ref([])
const filterList=ref([])
const request=ref({})

// edit variable
const assign_ch=ref("")
const status_ch=ref("")
const data_ch=computed(()=>{
    return{
        request_status:status_ch.value,
        request_assign:assign_ch.value        
    }
})

// delete variable
const request_id=ref(undefined)

// status
const get_status=ref(undefined)
const delete_status = ref(undefined)
const edit_status = ref(undefined)

const is_filter_open=ref(false)


// get data
const getEvents =async(id=undefined)=>{

    let status = false

    if(id==undefined){
        let [s,data] =await toBackEnd.getData('request',requestLink)
        if(s==200){

            status=true
            requestList.value = data
            showList.value = data
            get_status.value=true
            // status something
        }
        else {
            get_status.value=false
            // status something
        }

    }else{
        let [s,data]= await toBackEnd.getDataBy('request',requestLink,id)
        if(s==200){
            
            status=true
            request.value= data
            console.log(data)
            get_status.value=true
            // status something
        }
        else{
            get_status.value=false
            // status something
        }
    }

    return status
}

// edit by id
const editInfo = async(v)=>{
    edit_status.value=undefined
    let [ss,data] =await toBackEnd.editData('request',requestLink,v,data_ch.value)
    if(ss==200){
        edit_status.value=true
        console.log(data)
        await getEvents()
        navigation()
        //status something
        console.log(data)

    }else{
        //status something
        edit_status.value=false
        console.log(data)
        myRouter.go(-1)
    }
}

// delete
const deleteItem =async (v)=>{
    delete_status.value=undefined
    let [status,data] = await toBackEnd.delete('request',requestLink,v)
    if(status==200){
        delete_status.value=true
        await getEvents()
        navigation()
        // status something
        console.log(data)
    }else{
        // status something
        delete_status.value=false
        console.log(data)
    }
}

// callback

// edit request
const submitt =(v)=>{
    if(validate.vRequestEdit(data_ch.value)){
        // return something
    }
    else{
        editInfo(v)
    }
}


// showInfo
const showInfoByID=async(v,index)=>{
    let status=false
    request_id.value=v
    request.value={}
    console.log(v,index)
    status_ch.value=""
    assign_ch.value=""
 
    status = await getEvents(request_id.value)
    
    if(status && isEmptyOBJ.value !=true){

        changeST(request.value.request_status)
        assign_ch.value = request.value.request_assign
        console.log(assign_ch.value)
        navigation('#showInfo')
    }else{
        navigation()
        // status something
    }
}


// old version
const commentCh =ref('')
const commentArr =ref([])

// change status
const sIsR=ref(false)
const sIsO=ref(false)
const sIsI=ref(false)
const sIsF=ref(false)

// variable filter
const f_name=ref('')
const f_email=ref('')
const f_type=ref('')
const f_subject=ref('')
const f_status=ref('')



// bg color status
const changeColorBy=(v)=>{
    let style=[]
    
    if(v=='request'){
        style.push('background-color:rgb(31 41 55)')
        style.push('color: rgb(255 255 255);')
        
    }else
    if(v=='open_case'){
        style.push('background-color:rgb(245 158 11)')
        style.push('color: rgb(255 255 255);')
    }else
    if(v=='in_progress'){
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





const changeST =(v)=>{
    status_ch.value=''
    // status request
    sIsR.value=false
    // status open case
    sIsO.value=false
    // status in progress
    sIsI.value=false
    // status finish
    sIsF.value=false
    if(v=='request'){
        sIsR.value=true
        status_ch.value=v
    }
    else if(v=='open_case'){
        sIsO.value=true
        status_ch.value=v
    }
    else if(v=='in_progress'){
        sIsI.value=true
        status_ch.value=v
    }
    else if(v=='finish'){
        sIsF.value=true
        status_ch.value=v
    }
    console.log(status_ch.value)
    // rStatus.value=v
}



// add comment
const addComment =()=>{
    let date =new Date()
    let timeDate =`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    
    if(commentCh.value.length!=0){
        commentArr.value.push({date:timeDate,comment:commentCh.value})
        console.log('add new comment successful ✅')
        console.log(commentArr.value)
        // editInfo()
        commentCh.value=''
    }else{
        console.log('input ur comment first ❌')
    }
    
}


// check obj empty
const isEmptyOBJ =computed(()=> {
    let boolean = Object.keys(request.value).length === 0 && request.value.constructor ===Object
    console.log(boolean)
    return boolean
})


// close pop up
const navigation =(p='#')=>window.location.href=p



//filter
const resetF=()=>{
    f_name.value=''
    f_email.value=''
    f_type.value=''
    f_subject.value=''
    f_status.value=''
    showList.value=requestList.value
}

const searchByKeyW=()=>{
    console.log(f_status.value)

    // email
    if(f_email.value.length != 0){
        filterList.value = requestList.value.filter(e=>e.request_email.toLowerCase().includes(f_email.value.toLowerCase()))
        console.log('this  email filter : '+f_email.value)
    }

    // service
    else if(f_type.value.length !=0){
        filterList.value = requestList.value.filter(e=>e.request_service_type.toLowerCase()==f_type.value.toLowerCase())
    }

    // service
    else if(f_subject.value.length !=0){
        filterList.value = requestList.value.filter(e=>e.request_subject.toLowerCase()==f_subject.value.toLowerCase())
    }

    // stauts
    else if(f_status.value.length !=0){
        filterList.value = requestList.value.filter(e=>e.request_status.toLowerCase() == f_status.value.toLowerCase())
    }

    showList.value = filterList.value
    console.log(filterList.value)
}
</script>
<template>
<div class="overflow-y-auto relative">
    <div class="">

        <!-- wait -->
        <div v-if="get_status==undefined">
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px]">
                    <div class="my-auto w-fit mx-auto mt-[250px]">
                        <!-- <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4"> -->
                        <BaseLoading/>
                        <!-- <button @click="getEvents()" class="mt-6 bg-rose-300 focus:bg-rose-400 text-gray-700 focus:text-whte px-2 mx-auto rounded-lg">
                            Refresh
                        </button>   -->
                    </div>
                </div>
              
            </div>
        </div>
        <!-- no data -->
        <div v-else-if="get_status==false">
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px]">
                    <div class="my-auto w-fit mx-auto mt-[250px]">
                        <!-- <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4"> -->
                        <h4>
                            No data try again later .😏
                        </h4>
                        <!-- <button @click="getEvents()" class="mt-6 bg-rose-300 focus:bg-rose-400 text-gray-700 focus:text-whte px-2 mx-auto rounded-lg">
                            Refresh
                        </button>   -->
                    </div>
                </div>
              
            </div>
        </div>
        
        <!-- can get data but no data (clean) -->
        <div v-else-if="get_status==false ||requestList.length==0" class="show_up">
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px]">
                    <div class="my-auto w-fit mx-auto mt-[250px]">
                        <!-- <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4"> -->
                        <h4>
                            Can get data but no data.😏
                        </h4>
                        <h4 class="text-[25px]">
                            Wait for user send request.👌
                        </h4>
                        <!-- <button @click="getEvents()" class="mt-6 bg-rose-300 focus:bg-rose-400 text-gray-700 focus:text-whte px-2 mx-auto rounded-lg">
                            Refresh
                        </button>   -->
                    </div>
                </div>
              
            </div>
        </div>
                

        <!-- have data -->
        <div v-else-if="get_status==true" class="show_request show_up">
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/admin_page/request.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4">
                        Request
                    </div>
                </div>
                

                <!-- filter -->
                <div  class="relative w-[1200px] h-[70px]  mx-auto ">
                    <div v-show="is_filter_open==true" class="absolute w-fit h-fit bottom-0">
                        <div class="flex ">
                            
                            <!-- name -->
                            <!-- <div class="px-2 ">
                                <input v-model="f_name" placeholder="Name" type="text" class="px-3 py-[4px] bg-[#E3F2FD] text-gray-600 rounded-xl focus:outline-0">
                            </div> -->

                            <!-- email -->
                            <div class="px-2">
                                <input v-model="f_email" placeholder="E-mail" type="text" class="px-3 py-[4px] bg-[#E3F2FD] text-gray-600 rounded-xl focus:outline-0">
                            </div>

                            <!-- type -->
                            <div class="px-2">
                                <select v-model="f_type" name="status" id="status" class="px-3 py-[4px] bg-[#E3F2FD] text-gray-600 rounded-xl focus:outline-0">
                                    <option value="" selected hidden> Service type </option>
                                    <option value="IT_Service" class="bg-gray-100 text-[#0ea5e9] "> IT Service </option>
                                    <option value="PR_Service" class="bg-gray-100 text-[#d97706]"> PR Service </option>

                                </select>
                            </div>

                            <!-- Subject -->
                            <div class="px-2">
                                <select v-model="f_subject" name="Subject" id="Subject" class="px-3 py-[4px] bg-[#E3F2FD] text-gray-600 rounded-xl focus:outline-0">
                                    <option value="" selected hidden> Select Subject </option>
                                    <option value="hardware"> hardware </option>
                                    <option value="software"> software </option>
                                    <option value="internet"> internet </option>
                                    <option value="printer"> printer </option>
                                    <option value="website"> website </option>
                                    <option value="meeting"> meeting </option>
                                    <option value="application"> application </option>
                                    <option value="other"> other </option>

                                </select>
                            </div>

                            <!-- status -->
                            <div class="px-2">
                                <select v-model="f_status" name="status" id="status" class="px-3 py-[4px] bg-[#E3F2FD] text-gray-600 rounded-xl focus:outline-0">
                                    <option value="" selected hidden> Select Status </option>
                                    <option value="request"     class="bg-"> request </option>
                                    <option value="open_case"   class="bg-"> open case </option>
                                    <option value="in_progress" class="bg- "> in progress </option>
                                    <option value="finish"      class="bg-"> finish </option>

                                </select>
                            </div>

                            

                            <div class="flex px-2 font-light">
                                <button @click="resetF" class="px-3 mx-1 bg-gray-500 text-rose-300  rounded-xl hover:text-gray-500 hover:bg-rose-300">
                                    รีเซต
                                </button>

                                <button @click="searchByKeyW()" class="px-3 mx-1 bg-gray-300 rounded-xl">
                                    ค้นหา
                                </button>
                            </div>
                        </div>
                    </div>


                    <!-- button -->
                    <div class="   right-[20px] bottom-0  absolute">
                        <button @click="is_filter_open= !is_filter_open" class="flex w-fit">
                            <span class="font-semibold my-auto">
                                ตัวกรอง
                            </span> 
                            <img src="../../../assets/admin_page/filter.png" alt="icon" class="w-[20px] ml-[5px] my-auto">                                
                        </button>
                    </div>

                </div>
            </div>
                
            

        
              <!-- table -->    
        <div class="w-[1200px] mx-auto  h-[450px] mt-2"> 
            <hr class="mt-3 bg-gray-700  w-[1170px] h-[3px]">
            <div class="overflow-y-auto mx-auto h-[100%] w-[100%] ">
                <table class="relative w-full table-fixed text-sm text-center text-gray-800 ">
                    <thead class="absolute bg-white text-lg sticky top-0 z-10">
                        <tr class="">
                            <th scope="col" class="w-[180px] p-2">
                                User
                            </th>
                            <!-- <th scope="col" class="w-[200px] p-2">
                                Group
                            </th> -->
                            <th scope="col" class="w-[100px] p-2">
                                Type
                            </th>
                            <th scope="col" class="w-[100px] p-2">
                                Subject
                            </th>
                            <th scope="col" class="w-[120px] p-2">
                                Date
                            </th>
                            <th scope="col" class="w-[150px] p-2">
                                Status
                            </th>
                            <th scope="col" class="w-[120px] p-2">
                                Assign
                            </th>
                            <th scope="col" class="w-[100px] p-2">
                                Details
                            </th>
                        </tr>                        
                    </thead>
                    


                    <!-- have data -->
                    <tbody class="z-0"> <!-- @click="clickedInfo" -->
                        <tr  v-for="(data,index) in showList" :key="index" class="relative text-[15px]  bg-white border-b-2 border-gray-300 cursor-default hover:border-gray-400 z-1">
                            
                            <td class=" font-medium py-3 px-2 text-center">
                                <div class="  font-normal truncate ">
                                    <span class="">
                                        {{data.request_first_name}}
                                    </span>
                                    <span class=" pl-3">
                                        {{ data.request_last_name }}
                                    </span>
                                    
                                </div>
                                <div class=" text-[10px] truncate font-light">
                                    {{ data.request_email }}
                                </div> 
                            </td>
                            <!-- <td class=" py-3 px-2 font-light">
                                <div class="w-full truncate">
                                    {{data.group_work}}
                                </div>
                            </td> -->
                            <td class=" py-3 px-2 font-semibold">
                                <div :style="[changeColorBy(data.request_service_type)] " class="w-[100px] text-center mx-auto truncate">
                                    {{data.request_service_type}}
                                </div>
                            </td>
                            <td class=" py-3 px-2 font-semibold">
                                <div class=" truncate">
                                    {{data.request_subject}}                                    
                                </div>

                            </td>
                            <td class=" py-3 px-2 font-light">
                                <div class=" ">
                                    {{data.request_req_date}}
                                </div>
                            </td>
                            <td class=" p-2 text-center ">
                                <div :style="[changeColorBy(data.request_status)]" class="w-[120px] mx-auto static  py-[4px] px-[8px] rounded-2xl text-[15px] font-semibold ">
                                    {{data.request_status}}
                                </div> 
                            </td>
                            <td class=" p-2 font-normal">
                                <div class=" ">
                                    {{data.request_assign}}
                                </div>
                            </td>                            
                            <td class=" p-2 font-semibold">
                                <div class="flex w-fit mx-auto  ">
                                    <a    class="goInfo ">
                                        <button @click="showInfoByID(data.requestId,index)">
                                            <img src="../../../assets/admin_page/edit.png" alt="edit_icon" class="w-[28px] h-[28px] mr-2 ">
                                        </button>
                                    </a>
                                    <!-- <img id="delete" @click="deleteItem(data.id)" src="../../../assets/admin_page/bin.png" alt="delete_icon" class="w-[28px] h-[28px] mx-1 hover:bg-rose-300 rounded "> -->
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
            <div  class="h-[100%] p-3 overflow-y-auto">
                <div id="summaryInfo" class=" w-fit mx-auto text-[25px] font-semibold">
                    <h3>
                        ข้อมูลเพิ่มเติม 
                    </h3>
                </div>

                <!-- first -->
                <table  class="w-full   mt-10  text-[20px] font-semibold ">

                        <!-- username -->
                        <tr >
                            <th class="table_header text-right w-[115px]">
                                ของผู้ใช้
                            </th>
                            <td class=" indent-[5px] truncate font-normal">
                                <span>
                                    {{ request.request_first_name }}
                                </span>
                                <span class="pl-2">
                                    {{ request.request_last_name }}
                                </span>
                            </td>
                        </tr>

                        <!-- email -->
                        <tr >
                            <th class="table_header text-right w-[115px]">
                                Email
                            </th>
                            <td class=" indent-[5px] truncate font-normal">
                                {{ request.request_email }}
                            </td>
                        </tr>

                        <!-- group -->
                        <tr >
                            <th class="table_header text-right w-[115px]">
                                Group
                            </th>
                            <td class=" indent-[5px] truncate font-normal">
                                {{ request.request_group }}
                            </td>
                        </tr>

                        <!-- service -->
                        <tr>
                            <th class="table_header text-right w-[115px]" >
                                Service
                            </th>
                            <td :style="[changeColorBy(request.request_service_type)]" class="indent-[5px] font-normal">
                                {{ request.request_service_type }}
                            </td>
                        </tr>

                        <!-- is OR or SF -->
                        <tr v-show="request.request_service_type=='IT_Service'">
                            <th class="table_header text-right w-[115px]">
                                ประเภทของ
                            </th>
                            <td class="indent-[5px] font-normal">
                                {{request.request_use_type=='or'?'เป็นขององค์กร':'เป็นของส่วนตัว'}}
                            </td>
                        </tr>

                        <!-- brand -->
                        <tr v-show="request.request_service_type=='IT_Service'">
                            <th class="table_header text-right w-[115px]">
                                ยี่ห้อ
                            </th>
                            <td class="indent-[5px] font-normal">
                                {{request.request_brand}}
                            </td>
                        </tr>

                        <!-- number -->
                        <tr v-show="request.request_service_type=='IT_Service'">
                            <th class="table_header text-right w-[115px]">
                                S/N
                            </th>
                            <td class="indent-[5px] font-normal">
                                {{request.request_sn}}
                            </td>
                        </tr>
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
                <div v-show="request.request_service_type=='IT_Service'&& (request.request_subject=='hardware'||request.request_subject=='software'||request.request_subject=='internet')" class="mt-4 ">
                    <div class="text-[20px] font-semibold">
                        <h3 >
                        ชนิดของ Hardware 
                        </h3>
                                            
                    </div>

                    
                    <div v-if="request.request_subject=='software'||request.request_subject=='hardware'||request.request_subject=='internet'" class=" mt-4 text-[15px] font-medium">
                        <!-- notebook -->
                        <div class="w-[85px]  p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[4px]">
                            {{request.request_type_matchine}}
                            </h3>

                        </div >
                    </div>
                </div>

                <!-- problem -->
                <div   class="mt-4 " >
                    <div class="text-[20px] font-semibold">
                        <h3 v-show="request.request_service_type=='IT_Service'">
                            อาการของ {{request.request_subject}} ที่พบ
                        </h3>  
                        <h3 v-show="request.request_service_type=='PR_Service'">
                            ความช่วยเหลือที่ต้องการเกี่ยวกับ<span class="text-rose-500 pl-2">{{request.request_subject}}</span> 
                        </h3> 
                    </div>

                    
                    <div class="w-full grid grid-cols-6 gap-y-2 gap-x-2 mt-4 text-[15px] font-medium">
                        
                        <div v-for="(data,index) of request.request_problems" :key="index"  class="w-[85px] mx-auto p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            {{data}}
                            </h3>
                        </div >
                        <!-- <div v-if="request.request_other!=''"  class="w-[70px] mx-auto p-2 bg-gray-200 rounded-xl ">
                            <img src="../../../assets/vue.svg" alt="NoteBook" class="w-[40px] mx-auto">
                            <h3 class="w-fit mx-auto text-[8px]">
                            other
                            </h3>
                        </div > -->

                    </div>
                </div>

                <!-- massage other -->
                <div   class=" w-full mt-10 ">
                    <div v-show="request.request_other!=''"  class="">
                        <label for="other_1" class="ml-2 text-[17px] font-semibold inline-b">
                            กรณีเลือก<span class="text-rose-500 pl-2">อื่นๆโปรดระบุ</span>
                        </label>
                        <span class="text-[13px] ml-2">(กรณีไม่พบปัญหาข้างต้น)</span>
                        <textarea v-model="request.request_other"  name="other" id="other_1"  disabled class="w-full h-[100px] resize-none pt-[10px] block rounded-xl bg-gray-300 p-2 focus:outline-0" ></textarea>
                    </div>
                    
                    <div v-show="request.request_message!=''" class="mt-3">
                        <label for="other_2" class="ml-2 text-[17px] font-semibold">
                            ระบุรายละเอียดของปัญหาที่พบ (ถ้ามี)
                        </label>
                        <textarea v-model="request.request_message"  name="other" id="other_2"  disabled class="w-full h-[100px] resize-none block bg-gray-300 rounded-xl p-2 focus:outline-0"></textarea>
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
                                <button id="request" name="status" @click="changeST('request')" :style="[sIsR==true?changeColorBy('request'):'']" class="bg-gray-600 text-gray-300 p-2 text-center rounded-lg hover:bg-gray-300 hover:text-gray-600">
                                    Request
                                </button>
                                <button id="open_case" name="status" @click="changeST('open_case')" :style="[sIsO==true?changeColorBy('open_case'):'']" class="bg-gray-600 text-gray-300 p-2 text-center rounded-lg hover:bg-gray-300 hover:text-gray-600">
                                    Open Case
                                </button>
                                <button id="in_progress" name="status" @click="changeST('in_progress')" :style="[sIsI==true?changeColorBy('in_progress'):'']" class="bg-gray-600 text-gray-300 p-2 text-center rounded-lg hover:bg-gray-300 hover:text-gray-600">
                                    In Progress
                                </button>
                                <button id="finish" name="status" @click="changeST('finish')" :style="[sIsF==true?changeColorBy('finish'):'']" class="bg-gray-600 text-gray-300 p-2 text-center rounded-lg hover:bg-gray-300 hover:text-gray-600">
                                    Finish
                                </button>
                            </div>
                        </div>

                        <div class="w-fit mx-auto">
                            <h5 class="font-semibold">
                                Assign
                            </h5>
                            <select v-model="assign_ch" name="assign" id="assign" class="w-[200px] mt-2 p-1 bg-gray-400 text-gray-700 font-semibold  rounded">
                                <option value="Not_assign" selected disabled>เลือกผู้รับผิดชอบ</option>
                                <option value="Testing_Tseing " class="font-semibold bg-gray-300">Testing Tseing</option>
                                <option value="gnitset_testing" class="font-semibold bg-gray-300">gnitset testing</option>
                                <option value="Testing_Tseing " class="font-semibold bg-gray-300">Testing Tseing</option>

                            </select>
                        </div>

                    </div>
                </div>
                
                <!-- button -->
                <div  class="w-fit flex mx-auto mt-10">
                    <!-- ลบข้อมูล -->
                        <button @click="navigation('#dele')"  class="w-[130px] mx-3 p-2 font-normal bg-gray-300  text-rose-400 rounded-xl hover:text-gray-200 hover:bg-rose-400">
                            <h4>
                                ลบคำร้องนี้
                            </h4>
                        </button>                        

                    <!-- แก้ไขข้อมูล -->
                    <a href="#veri">
                        <button v-show="status_ch != undefined &&status_ch != 'request'&& assign_ch.length >0 "  class="w-[130px] mx-3 p-2 font-normal bg-gray-300  text-[#64B5F6] rounded-xl hover:bg-[#64B5F6] hover:text-gray-200">
                            <h4>
                                ทำการแก้ไข
                            </h4>
                        </button>
                    </a>
                </div>

                <hr class="w-full h-[10px] mt-10">

                <!-- comment -->
                <!-- <div   class=" w-full mt-4 ">


                    <label for="other_1" class="ml-2 text-[20px] font-light inline-b">
                            Comment
                    </label>

                    old comments
                    <div class="comment_old w-[540px] h-[300px] mt-3 mx-auto  overflow-y-auto bg-gray-500 rounded-t-lg">
                        <div class="w-[530px] h-fit  pt-3 px-3">
                            comment
                            <div v-for="(com,index) in commentArr" class="w-full   pt-3 p-2 pb-4 mb-4 bg-[#1976D2] text-[#BBDEFB] rounded-lg">
                                <h5 class=" pl-2 text-sm text-[#64B5F6] font-semibold italic">
                                    13:56 13/2/2566
                                    {{ com.date }}
                                </h5>
                                <p class="indent-[10px] pl-4 font-light">
                                    นี่เป็นการทดสอบนะครับและทดสอบเพื่อที่เราตะได้รู้ว่าเรานั้นสามารถทำการทดสอบกับข้อความของข้อความเหล่านี้ได้และเราจะไม่หยุดทดสอบจนกว่าจะได้ทดสอบเพื่อที่จะไม่โดนหักคะแนน
                                    {{ com.comment }}
                                </p>                                
                            </div>
                        </div>
                    </div>

                    new comment
                    <div  class="comment_new w-[540px] h-fit  mx-auto ">

                        <textarea v-model="commentCh"  name="other" id="other_1" placeholder="text something ....."  class="w-full h-[70px] resize-none pt-[10px] block  bg-gray-300 p-2  focus:outline-0 " ></textarea>                  

                        <button @click="addComment" v-show="commentCh.length!=0" class="comment_new_button w-full h-[40px]  bg-[#2196F3] text-white font-light rounded-b-xl ">
                            Post Comment
                        </button>                            
                    </div>
                </div> -->
            </div>

            <button @click="navigation()" class="absolute top-[15px] right-[15px] font-bold text-[30px]">
                <img src="../../../assets/admin_page/close.png" alt="close_icon" class="w-[20px]">
            </button>
        </div>
    </div>


    <!-- verify -->
    <div id="veri" class="overlay">
        <div class=" verify_s h-96 overflow-hidden rounded-2xl">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะแก้ไขข้อมูลใช่หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <button @click="submitt(request.requestId)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300" >
                    ทำการแก้ไข
                </button>                    
            </div>
        </div>
    </div>

    <!-- delete -->
    <div id="dele" class="overlay">
        <div class=" verify_d h-96 overflow-hidden rounded-2xl ">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะลบข้อมูลนี้หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <button @click="deleteItem(request.requestId)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    ลบเลย !!
                </button>                    
            </div>
        </div>
    </div>
</div>


</template>
<style scoped>
::selection{
    background-color: black;
    color:white;
    text-transform: uppercase;
}

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
  z-index: 50;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}
.popup2 {
  margin: auto;
  margin-top: 3%;
  /* overflow-y: auto; */
  padding: 35px;
  padding-top: 45px;
  padding-left: 30px;
  padding-right: 16px;
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
  .verify_s {
    width: 70%;
  }
  .option {
    width: 20%;
  }
}

.verify_s {
  margin: auto;
  margin-top: 20%;
  /* overflow-y: auto; */
  /* padding: 2px; */
   padding-top: 2px;
  /*padding-left: 30px;
  padding-right: 16px; */
  background: #fff;
  width: 20%;
  height: 150px;
  /* border-radius: 20px; */
  position: relative;
  transition: all 5s ease-in-out;
}
.verify_s h2 {
  margin-top: 30px;
  color: #333;
}
/* .verify .option {
  bottom: 0;
} */


/* delete */
.verify_d {
  margin: auto;
  margin-top: 20%;
  /* overflow-y: auto; */
  /* padding: 2px; */
   padding-top: 2px;
  /*padding-left: 30px;
  padding-right: 16px; */
  background: #fff;
  width: 20%;
  height: 150px;
  /* border-radius: 20px; */
  position: relative;
  transition: all 5s ease-in-out;
}
.verify_d h2 {
  margin-top: 30px;
  color: #333;
}


.comment_new{
    position: relative;
    z-index: 5;

}
.comment_new_button{
    position: absolute;
    animation: tada 1.5s;
    /* transition: opacity 500ms; */
    transition: all 1s;
    z-index: 1;

}


@keyframes tada{
    0%{
        opacity: 0;
        /* transition-property: all 1s; */
        margin-top: -30px;
    }
    100%{
        opacity: 1;
        /* transition-property: all 1s; */
        margin-top:0px;

    }
}

::-webkit-scrollbar{
    width: 10px;
    background-color: rgb(119, 173, 212);
    border-radius: 20px;
}

::-webkit-scrollbar-thumb{
    background-color: rgb(104, 104, 104);
    border-radius: 20px;
}
/* scroll bar of comments */
.comment_old::-webkit-scrollbar{
    background-color: transparent;
    width:10px
}

.comment_old::-webkit-scrollbar-thumb{
    background-color: rgb(119, 173, 212);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.table_header::after{
    content: ':';
}

</style>