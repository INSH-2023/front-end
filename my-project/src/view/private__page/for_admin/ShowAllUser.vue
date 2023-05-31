<script setup>
import { EMPTY_ARR } from '@vue/shared';
import{ref,computed, onBeforeMount}from'vue'
import {useLink, useRouter} from 'vue-router'
import toBackEnd from'../../../JS/fetchToBack.js'
import validate from'../../../JS/validate.js'
import jsCookie from 'js-cookie';
import getRefreshToken from './../../../JS/refresh';
onBeforeMount(()=>{
    changePath()
    getUsers()
    getRefreshToken(JSON.parse(jsCookie.get("data")).refreshToken)
})

//variable 

const myRouter =useRouter()
// const userLink ='http://localhost:3000/users'
// const userLink ='http://localhost:5000/api/users'
const userLink =`${import.meta.env.VITE_BACK_END_HOST}/users`

// get variable
const userList =ref([])
const showList = ref([])
const filterList = ref([])
const user=ref({})

// put variable
const eFName =ref('')
const eLName =ref('')
const eEmail =ref('')
const eRole =ref('')
const eOffice =ref('')
const eGroup =ref('')
const ePosition =ref('')
const eStatus =ref('')
const eCPw =ref('')
const ePw =ref('')
let dataCh =computed(()=>{
    return{
        user_first_name: eFName.value,
        user_last_name: eLName.value,
        user_email: eEmail.value,
        user_role: eRole.value,
        user_office: eOffice.value,
        user_position: ePosition.value,
        user_password: ePw.value,
        user_group: eGroup.value,
        user_status: eStatus.value,
        user_cPassW: eCPw.value
    }
})

// delete
const user_id=ref(undefined)

const lenghtOfInput={
    fnameL: 30,
    lnameL: 61,
    emailL: 30,
    passwordL: 14,
    // cPasswordL: 14
}


// old version
// const userList =ref([])
// const user=ref({})
// const filterList=ref([])
// const show_userList=ref([])



// const user_id =ref(undefined)


// filter
// const f_name =ref('')
const f_email =ref('')
const f_status =ref('')
const f_reposibility =ref('')


// const organization ='@moralcenter.or.th'
// status
const get_status=ref(undefined)
const delete_status=ref(undefined)
const put_status=ref(undefined)

const is_filter_open=ref(false)
const is_edit_open=ref(false)
const is_active_open=ref(false)

const token = ref('')

// get user
const getUsers =async(id=undefined)=>{
    console.log(id)
    let status=false
    if(id==undefined){
        token.value = JSON.parse(jsCookie.get("data")).token
        let [s,data] = await toBackEnd.getData('user',userLink,token.value)
        if(s==200)status = true
        userList.value=data

        showList.value = userList.value
        
    }else{
        token.value = JSON.parse(jsCookie.get("data")).token
        let [s,data] = await toBackEnd.getDataBy('user',`${userLink}/emp-code`,id,token.value)
        if(s==200)status = true
        user.value=data
        console.log(user.value)
    }

    return status
}


// delete user
const deleteUser =async(v)=>{
    token.value = JSON.parse(jsCookie.get("data")).token
    let [status,data] = await toBackEnd.delete('user',userLink,v,token.value)
    
    if(status==200){
        await getUsers()
        console.log(data)
        changePath()
        // status something
    }else{
        // status something
        changePath('#showInfo')
        console.log(data)
    }
}


// showInfo
const showInfoByID=async(v,index)=>{
    user.value={}
    user_id.value=v

    let status =false
    console.log('value : ',v)
    console.log('index : ',index)
    // statusCh.value=undefined
    // assignCh.value=''
    // commentCh.value=''
    // let detail =document.getElementsByClassName("goInfo")
    console.log('this is index:',index)

    // console.log(getUsers(v))
    // console.log('is user obj is empty ? : '+isEmptyOBJ.value)
    status = await getUsers(user_id.value)

    if( status && isEmptyOBJ.value !=true){
        changePath('#showInfo')

    }else{
        console.log('error to show detail of user')
    }
}


const assignDetail =(b)=>{
    if(user.value.lenght!=0){
        if(b==true){
            is_edit_open.value=b
            eFName.value=user.value.user_first_name
            eLName.value=user.value.user_last_name
            eEmail.value=user.value.user_email
            eRole.value=user.value.user_role
            eOffice.value=user.value.user_office
            eGroup.value=user.value.user_group
            ePosition.value=user.value.user_position
            eStatus.value=user.value.user_status
            ePw.value=user.value.user_password
            eCPw.value=user.value.user_password
            is_active_open.value=user.value.user_status=='active'?true:false
            console.log('open edit mode')
        }else if(b==false){
            is_edit_open.value=b
            eFName.value=''
            eLName.value=''
            eEmail.value=''
            eRole.value=''
            eOffice.value=''
            eGroup.value=''
            ePosition.value=''
            eStatus.value=''
            ePw.value=''
            eCPw.value=''
            console.log('close edit mode')
        }
    }else{
        console.log('cannot open edit mode')
    }
}



const submitEdit =async(id)=>{

    // if(validate.vUserCreate(dataCh.value,lenghtOfInput) !=true){
        token.value = JSON.parse(jsCookie.get("data")).token
        let [status,data] = await toBackEnd.editData('user',userLink,id,dataCh.value,token.value)
            console.log(status)
            if(status==200){
                await getUsers()
                changePath()
                assignDetail(false)
                
                // status something
            }else{
                changePath('#showInfo')
                console.log(data)
                // status something
            }        
    // }else{
    //     // status something
    //     console.log('error validate input value')
    //     window.location.href = "#showInfo"
    // }


}


// check obj empty
const isEmptyOBJ =computed(()=> {
    let boolean = Object.keys(user.value).length === 0 && user.value.constructor ===Object
    console.log(boolean)
    return boolean
})


// validate input
const checkInput =()=>{
    if(validate.vUserCreate(dataCh.value,lenghtOfInput) !=true){
        window.location.href='#veri'
    }else{
        console.log('input invalid value pls fix it 😂')
    }
}


// close detail every reload
const changePath=(path='#')=>{
    window.location.href = path
}


// change status 
const change_s=()=>{
    is_active_open.value = !is_active_open.value
    // eStatus.value= !eStatus.value
    if(is_active_open.value==true){
        eStatus.value='active'
        console.log('status is :',eStatus.value)
    }else
    if(is_active_open.value==false){
        eStatus.value='inactive'
        console.log('status is :',eStatus.value)
    }
}



// filter 
const resetF=()=>{
    // f_name.value= ''
    f_email.value= ''
    f_status.value= ''
    f_reposibility.value= ''
    showList.value = userList.value
}


const searchByKeyW=()=>{
    filterList.value=[]
    // name
    // if(f_name.value.length != 0){
    //     filterList.value = userList.value.filter(u=>{
    //     let name =`${u.first_name} ${u.last_name}`
    //     return name.toLowerCase().includes(f_name.value.toLowerCase())
    // })
    //     console.log('this name filter : '+f_name.value)
    // }

    // email
    if(f_email.value.length != 0){
        filterList.value = userList.value.filter(u=>u.user_email.toLowerCase().includes(f_email.value.toLowerCase()))
        console.log('this  email filter : '+f_email.value)
    }
    // status
    else if(f_status.value.length != 0){
        filterList.value = userList.value.filter(u=>u.user_status==f_status.value)
        console.log('this status filter : '+f_status.value)
    }
    // reposibility
    else if(f_reposibility.value.length != 0){
        filterList.value = userList.value.filter(u=>u.user_role.toLowerCase()==f_reposibility.value.toLowerCase())
        console.log('this role filter : '+f_reposibility.value)
    }

    showList.value = filterList.value
    console.log(filterList.value)
}
</script>
<template>
<div class="overflow-y-auto relative show_up">
    <div class="">
        <div class="">
            
            <div class=" bg-white w-full mx-auto  h-fit ">
                <div class="w-full text-center font-semibold text-[40px] pt-6">
                    <div class="flex w-fit mx-auto">
                        <img src="../../../assets/admin_page/allUser.png" alt="users_icon" class="w-[40px] h-[40px] my-auto mr-4">
                        All User
                    </div>

                </div>


                <!-- filter -->
                <div  class="relative w-[1200px] h-[70px] pl-4 mx-auto ">
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

                            <!-- status -->
                            <div class="px-2">
                                <!-- <input placeholder="" type="text" class="bg-gray-300"> -->
                                <select v-model="f_status" name="status" id="status" class="px-3 py-[4px] bg-[#E3F2FD] text-gray-600 rounded-xl focus:outline-0">
                                    <option value="" selected hidden> Select status </option>
                                    <option value="active"> active </option>
                                    <option value="inactive"> inactive</option>

                                </select>
                            </div>

                            <div class="px-2">
                                <!-- <input placeholder="" type="text" class="px-3 py-[4px] bg-gray-300 rounded-xl"> -->
                                <select v-model="f_reposibility" name="reposibility" id="reposibility" class="px-3 py-[4px] bg-[#E3F2FD] text-gray-600 rounded-xl focus:outline-0">
                                    <option value="" selected hidden>Select Reposibility</option>
                                    <option value="user">user</option>
                                    <option value="admin_pr">Admin PR</option>
                                    <option value="admin_it">Admin IT</option>

                                </select>
                            </div>

                            <div class="flex px-3 font-light">
                                <button @click="resetF" class="px-3 mx-1 bg-gray-500 text-rose-300  rounded-xl hover:text-gray-500 hover:bg-rose-300">
                                    รีเซต
                                </button>

                                <button @click="searchByKeyW" class="px-3 mx-1 bg-gray-300 rounded-xl">
                                    ค้นหา
                                </button>
                            </div>
                        </div>
                    </div>


                    <!-- button -->
                    <div class="   right-[70px] bottom-0  absolute">
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
                <table class="w-full table-fixed text-sm text-center text-gray-800 ">
                    <thead class="bg-white text-lg sticky top-0">
                        <tr class="text-[20px] text-gray-500">
                            <th scope="col"  class="w-[150px] py-2 px-2  pl-[40px]">
                                Name
                            </th>
                            <th scope="col" class="w-[250px] py-2 px-2">
                                Group
                            </th>
                            <th scope="col" class="w-[100px] py-2 px-2">
                                Status
                            </th>
                            <th scope="col" class="w-[100px] py-2 px-2">
                                Reposibility
                            </th>
                            <th scope="col" class=" w-[150px] py-2 px-2">
                                Detail
                            </th>
                            
                            
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in showList" :key="index"  class="text-[15px] cursor-default bg-white border-b-2 border-gray-300  hover:border-gray-400 hover:bg-gray-400">
                            <td class="]     px-2 py-2 font-medium ">
                                <div class="ml-4">
                                    <div class="w-full ml-3 text-[18px] font-light truncate mx-auto">
                                        {{data.user_first_name}} {{ data.user_last_name }}
                                    </div>
                                    <div class="w-full ml-3 text-[10px] truncate mx-auto">
                                        {{ data.user_email }}
                                    </div>                                     
                                </div>

                            </td>
                            <td class=" text-[15px] px-2 py-2 font-light text-l">
                                <div class="w-full truncate mx-auto">
                                    {{data.user_group}}
                                </div>
                            </td>
                            <td class=" px-2 py-2 text-[20px] font-semibold capitalize">
                                <div class="w-full truncate mx-auto" :style="data.user_status=='active'?'color:green':'color:red'">
                                    {{data.user_status}}                                    
                                </div>

                            </td>
                            <td class=" px-2 py-2 text-[20px] font-light">
                                <div class=" mx-auto truncate">
                                {{data.user_role}}
                                </div>
                            </td>
                            <td class=" px-2 py-2 font-semibold">
                                <div class="flex w-fit mx-auto truncate ">
                                    <a    class="goInfo w-[28px] m-2 ">
                                        <button @click="showInfoByID(data.user_emp_code,index)">
                                            <img src="../../../assets/admin_page/edit.png" alt="edit_icon" >
                                        </button>
                                    </a>                                    
                                    <!-- <img @click="deleteUser(data.userId)" src="../../../assets/admin_page/bin.png" alt="delete_icon" class="w-[28px] h-[28px] m-2 cursor-pointer"> -->
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
                <div class="w-full">
                    <h4 class="w-fit h-fit mx-auto font-semibold text-[30px] text-gray-500">
                        User Detail
                    </h4>                    
                </div>

                <!-- detail -->
                <div v-if="is_edit_open==false">
                    <!-- table -->
                    <div>
                        <table class="w-full table-fixed mx-auto mt-6 text-[20px]">
                            <tr>
                                <th  class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Status 
                                </th>
                                <td :style="[user.user_status=='inactive'?'color:red':'color: green']" class="pt-2 pl-2 indent-[5px] font-semibold text-gray-600 ">
                                    {{ user.user_status }}
                                </td>
                            </tr>
                            <tr>
                                <th  class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Name
                                    <!-- <span> 
                                        {{  }}
                                    </span> -->
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.user_first_name }} {{ user.user_last_name }}
                                </td>
                            </tr>
                            
                            <!-- email -->
                            <tr>
                                <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    E-mail
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.user_email }}
                                </td>
                            </tr>

                            <!-- role -->
                            <tr>
                                <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Role
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.user_role }}
                                </td>
                            </tr>

                            <!-- office -->
                            <tr>
                                <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Office
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.user_office }}
                                </td>
                            </tr>

                            <!-- group -->
                            <tr>
                                <th class="table_header w-[120px] text-right  font-normal" >
                                    Group
                                </th>
                                <td class="pt-2 pl-2 indent-[5px]  font-light text-gray-600">
                                    {{ user.user_group}}
                                </td>
                            </tr>

                            <!-- position -->
                            <tr>
                                <th class="table_header w-[120px] h-fit  text-right font-normal">
                                    Position
                                </th>
                                <td class="w-[100px] h-fit pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.user_position }}
                                </td>
                            </tr>
                        </table>
                    </div>
                

                    <!-- button -->
                    <div class="w-full flex mt-6 mb-1.5">
                        <a href="#dele" class="w-[200px] h-[50px] px-5 mx-auto mr-3 text-[15px] font-light text-rose-400 bg-gray-300 rounded-2xl hover:bg-rose-400 hover:text-gray-200">
                            <button class="w-full h-full ">
                                ลบข้อมูล
                            </button>                            
                        </a>
                        
                        <button @click="assignDetail(true)" class="w-[200px] h-[50px] px-5 text-[15px]  mx-auto ml-3 font-light text-[#1565C0] bg-gray-300 rounded-2xl hover:bg-[#90CAF9] hover:text-gray-200">
                            แก้ไขข้อมูล
                        </button>
                    </div>
                    
                    
                </div>

                <!-- edit detail  -->
                <div v-else-if="is_edit_open==true" class="w-[500px] mx-auto">
                       
                    <!-- active -->
                    <div class="relative flex t  w-full h-[40px] mt-3">
                        <button @click="change_s" id="container_active" class="relative w-[150px] h-[30px] my-auto bg-gray-700 text-gray-100 text-[15px] z-0 rounded-lg">
                            <div v-if="is_active_open==true" id="active" class="w-full h-full z-10 flex ">
                                <div class="w-[75px] h-full bg-green-300 rounded-l-lg">
                                </div>                            
                                <div class="w-[75px] h-fit m-auto ">
                                        active
                                </div>

                            </div>
                            <div v-else-if="is_active_open==false" id="inactive" class="w-full h-full z-10 flex ">
                                <div class="w-[75px] h-fit m-auto ">
                                        inactive
                                </div>
                                <div class="w-[75px] h-full bg-rose-300 rounded-r-lg">
                                </div>
                            </div>
                        </button>
                        
                        <!-- <div class="flex  w-[160px] h-full  text-sm">
                            <h4 class=" my-auto  font-light text-gray-500">
                                Role
                            </h4>
                            <select v-model="eRole" name="role" id="role" class=" bottom-0 w-full h-[30px] px-2 ml-2 my-auto bg-sky-300 font-light text-s, text-gray-600 rounded-lg focus:outline-0">
                                <option value="user">User</option>
                                <option value="admin_it">Admin_IT</option>
                                <option value="admin_pr">Admin_PR</option>
                            </select>
                        </div> -->
                    </div>


                    <!-- first name  and last name-->
                    <div class="relative flex w-[500px]">
                        <!-- name -->
                        <div class="relative w-[250px]  h-[50px]  text-sm">
                            <h4 class="ml-2 text-sm font-light text-gray-500">
                                First Name
                            </h4>
                            <input v-model="eFName" type="text" class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">                              
                        </div>
                        <!-- role -->
                        <div class="relative w-[250px] h-[50px] ml-[2px] text-sm">
                            <h4 class="ml-2  font-light text-gray-500">
                                Last Name
                            </h4>
                            <input v-model="eLName" type="text" class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                            <!-- <select v-model="eRole" name="role" id="role" class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                                <option value="user">User</option>
                                <option value="admin_it">Admin_IT</option>
                                <option value="admin_pr">Admin_PR</option>
                            </select> -->
                            <!-- <input type="text" class="absolute bottom-0 w-full h-[30px] p-2 bg-sky-300 font-light text-gray-600 rounded-lg focus:outline-0"> -->
                        </div>
                    </div>

                    <!-- email -->
                    <div class="relative w-full h-[50px] mt-1">
                        <h4 class="ml-2 text-sm font-light text-gray-500">
                            E-mail
                        </h4>
                        <input v-model="eEmail" type="text" class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                    </div>

                    <!-- role -->
                    <div class="relative w-full h-[50px] mt-1">
                        <h4 class="ml-2 text-sm font-light text-gray-500">
                            Role
                        </h4>
                        <select v-model="eRole" name="role" id="role" class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                            <option value="user">User</option>
                            <option value="admin_it">Admin_IT</option>
                            <option value="admin_pr">Admin_PR</option>
                        </select>
                    </div>

                    <!-- office -->
                    <div class="relative w-full h-[50px] mt-1">
                        <h4 class="ml-2 text-sm font-light text-gray-500">
                            Office
                        </h4>
                        <select v-model="eOffice" name="office" id="office"  class="absolute bottom-0 w-full h-[30px] px-2 px- bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                            <option value="" selected disabled hidden >Office</option>
                                    <option value="ผู้บริหาร" >ผู้บริหาร</option>
                                    <option value="สำนักส่งเสริมและขับเคลื่อนเครือข่ายทางสังคม" >สำนักส่งเสริมและขับเคลื่อนเครือข่ายทางสังคม</option>
                                    <option value="สำนักบริหารจัดการองค์กรและยุทธศาสตร์" >สำนักบริหารจัดการองค์กรและยุทธศาสตร์</option>
                                    <option value="สำนักพัฒนาองค์ความรู้นวัตกรรมและสื่อสารสนเทศ" >สำนักพัฒนาองค์ความรู้นวัตกรรมและสื่อสารสนเทศ</option>
                                    <option value="งานตรวจสอบภายใน" >งานตรวจสอบภายใน</option>
                        </select>
                        <!-- <input type="text" class="absolute bottom-0 w-full h-[30px] p-2 bg-sky-300 font-light text-gray-600 rounded-lg focus:outline-0"> -->
                    </div>

                    <!-- group -->
                    <div class="relative w-full h-[50px] mt-1">
                        <h4 class="ml-2 text-sm font-light text-gray-500">
                            Group
                        </h4>
                        <select v-model="eGroup" name="group" id="group"  class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                            <option value="" selected disabled hidden >Group</option>
                                    <option value="ผู้บริหาร" >ผู้บริหาร</option>
                                    <option value="บริหารจัดการองค์กร" >บริหารจัดการองค์กร</option>
                                    <option value="นโยบายและยุทธศาสตร์" >นโยบายและยุทธศาสตร์</option>
                                    <option value="วิจัยนวัตกรรมและระบบพฤติกรรมไทย" >วิจัยนวัตกรรมและระบบพฤติกรรมไทย</option>
                                    <option value="สื่อสารและรณรงค์ทางสังคม" >สื่อสารและรณรงค์ทางสังคม</option>
                                    <option value="ศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ" >ศูนย์ข้อมูลและเทคโนโลยีสารสนเทศ</option>
                                    <option value="สมัชชาคุณธรรมและความร่วมมือนานาชาติ" >สมัชชาคุณธรรมและความร่วมมือนานาชาติ</option>
                                    <option value="ส่งเสริมคุณธรรมเครือข่ายทางสังคม" >ส่งเสริมคุณธรรมเครือข่ายทางสังคม</option>
                        </select>
                        <!-- <input type="text" class="absolute bottom-0 w-full h-[30px] p-2 bg-sky-300 font-light text-gray-600 rounded-lg focus:outline-0"> -->
                    </div>

                    <!-- position -->
                    <div class="relative w-full h-[50px] mt-1">
                        <h4 class="ml-2 text-sm font-light text-gray-500">
                            Position
                        </h4>
                        <input v-model="ePosition" type="text" class="absolute bottom-0 w-full h-[30px] p-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                    </div>

                    <!-- password -->
                    <div class="relative w-[500px] flex h-[50px] mt-1">
                        <div class="relative w-[249px]">
                            <h4  h4 class="ml-2 text-sm font-light text-gray-500">
                                Password
                            </h4>
                            <input v-model="ePw" type="text" class="absolute bottom-0 w-full h-[30px] p-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">                     
                        </div>
                        <div class="relative w-[249px] ml-[2px]">
                            <h4  h4 class="ml-2 text-sm font-light text-gray-500">
                                Confirm Password
                            </h4>
                            <input v-model="eCPw" type="text" class="absolute bottom-0 w-full h-[30px] p-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">                                                 
                        </div>
                   </div>                    

                    <!-- button -->
                    <div class="mt-6 mb-1.5">
                        <button @click="checkInput" class="w-[250px] h-fit bg-gray-600 p-2 text-[#90CAF9] rounded-lg hover:bg-[#90CAF9] hover:text-gray-600">
                            ทำการแก้ไข ->                                
                        </button>
                    </div>

                    <!-- back -->
                    <div class="absolute top-[20px] left-[15px] font-light text-[20px]">
                        <button @click="assignDetail(false)" class="flex rounded-full pr-3 hover:bg-[#90CAF9] hover:text-[#E3F2FD]">
                            <img src="../../../assets/left-arrow.svg" alt="left-arrow" class="w-[30px] h-[30px] p-1.5 ">
                            <h4 class="my-auto text-[15px]">ย้อนกลับ</h4>
                        </button>
                    </div>
                </div>

                <div class="absolute top-[15px] right-[15px] font-bold text-[30px]">
                    <a @click="assignDetail(false)" id="close_info" href="#" class="">
                        <img src="../../../assets/admin_page/close.png" alt="close_icon" class="w-[20px]">
                    </a>
                </div>
            </div>
        </div>
    </div>


    <!-- verify -->
    <div id="veri" class="overlay ">
        <div class=" verify_s h-96 overflow-hidden rounded-2xl">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะแก้ไขข้อมูลใช่หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <button @click="submitEdit(user.userId)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    ทำการแก้ไข
                </button>                    
            </div>
        </div>
    </div>

    <!-- delete -->
    <div id="dele" class="overlay">
        <div class=" verify_d h-96 overflow-hidden rounded-2xl">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะลบข้อมูลนี้หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <button @click="deleteUser(user.userId)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    ลบเลย !!
                </button>                    
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
  padding: 30px;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 16px;
  background: #fff;
  width: 45%;
  height: fit-content;
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
  .verify {
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

.table_header::after{
    content: ':';
}
</style>