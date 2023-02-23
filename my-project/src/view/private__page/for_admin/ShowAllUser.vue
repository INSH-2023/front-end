<script setup>
import{ref,computed, onBeforeMount}from'vue'
import {useRouter} from 'vue-router'
import toBackEnd from'../../../JS/fetchToBack.js'

const myRouter =useRouter()
const userLink ='http://localhost:3000/users'
// const userLink ='http://localhost:5000/api/users'
// const userLink =`${import.meta.env.BASE_URL}`

const userList =ref([])

// const sampleData=ref([
//     {
//         "id":1,
//         "user":"นักรับ ทมิฬ",
//         "email":"testingEmail@testingmain.com",
//         "group":"วิจัยและวัฒนะธรรม",
//         "active":false,
//         "respo":"administrator",
//     },{
//         "id":2,
//         "user":"ทมิฬ นักรับ ",
//         "email":"testingEmail@testingmain.com",
//         "group":"วิจัยและวัฒนะธรรม",
//         "active":true,
//         "respo":"administrator",
//     },
    
// ])
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

// get user
const getUsers =async(id)=>{
    
    let status=undefined

    if(id==undefined){
        const res =await fetch(userLink,{
            method:'GET'
        })
        if(res.status==200){
            userList.value=await res.json()
            status = true
            console.log('get data successfull')
        }else{
            status= false
            console.log('cannot get user list')
        }    
    }else if(id != undefined){
        const res= await fetch(`${userLink}/${id}`,{
            method:'GET'
        })
        if(res.status==200){
             console.log('get user successful')
        user.value=await res.json()
        console.log(user.value)
        // changeST(user.value.status)
        // user.value.assign==''?assignCh.value='': assignCh.value = event.value.assign
        }else{
            status= false
            console.log('error cannot get user by id')
        }  
    }
    // return status




}

// delete user
const deleteUser =async(v,l)=>{
    console.log('this is location delete :'+l)
    const res = await fetch(`${userLink}/${v}`,{
        method:'DELETE'
    })
    if(res.status==200){
        console.log('user delete successful')
        getUsers()
        closeP(l)
    }else{
        console.log('error something cannot delete user')
    }
}

onBeforeMount(()=>{
    // fn.greeting('hellowwwwwwww')
    // toBackEnd.getData('user',userLink)
    getUsers()
})


const user=ref({})
// showInfo
const showInfoByID=(v,index)=>{
    user.value={}
    console.log('value : ',v)
    console.log('index : ',index)
    // statusCh.value=undefined
    // assignCh.value=''
    // commentCh.value=''
    let detail =document.getElementsByClassName("goInfo")
    console.log('this is index:',index)

    // console.log(getUsers(v))

    
    if( getUsers(v)){
        detail[index].setAttribute("href","#showInfo")
        detail[index].click()
    }else{
        console.log('error to show detail of user')
    }
}


// edit
const eName =ref('')
const eEmail =ref('')
const eRole =ref('')
const eOffice =ref('')
const eGroup =ref('')
const ePosition =ref('')
const eStatus =ref('')
const eCPw =ref('')
const ePw =ref('')


const isEdit=ref(false)
const editDetail =(b)=>{
    
    if(user.value.lenght!=0){
        if(b==true){
            isEdit.value=b
            eName.value=`${user.value.first_name} ${user.value.last_name}`
            eEmail.value=user.value.email
            eRole.value=user.value.role
            eOffice.value=user.value.office
            eGroup.value=user.value.group_work
            ePosition.value=user.value.position
            eStatus.value=user.value.status
            ePw.value=user.value.passW
            console.log('open edit mode')
        }else if(b==false){
            isEdit.value=b
            eName.value=''
            eEmail.value=''
            eRole.value=''
            eOffice.value=''
            eGroup.value=''
            ePosition.value=''
            eStatus.value=''
            ePw.value=''
            console.log('close edit mode')
        }
    }else{
        console.log('cannot open edit mode')
    }
}

const submitEdit =async(id,l)=>{
    console.log('this is location edit:'+l)

    // if(validate()){
        // eEmail.value=email.value+organization
        let name =eName.value.split(' ')
        let res = await fetch(`${userLink}/${id}`,{
            method:'PUT',
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({
            
            first_name: name[0],
            last_name: name[1],
            email: eEmail.value,
            role: eRole.value,
            office: eOffice.value,
            position:ePosition.value,
            passW: ePw.value,
            group_work: eGroup.value,
            status: eStatus.value,
            })
        })
        if(res.status==200){
            console.log('update successful user')
            editDetail(false)
            await getUsers()
            closeP("submit_edit")
        }else{
            console.log('error cannot update user')
        }        
    // }else{
    //     console.log('error something cannot edit and not into fetch Put method')
    // }
   
    
}

// lenght
// const fNameL=30
const nameL=61
const emailL=30
const pwL=14

const organization ='@moralcenter.or.th'
// validate
// const validate=()=>{
//     let vStatus =false
//     let email = eEmail.value+organization
//     // fNameS.value=undefined
//     // eNameS.value=undefined
//     // emailS.value=undefined
//     // groupS.value =undefined
//     // passWS.value =undefined
//     // cPassWS.value =undefined
//     // positionS.value=undefined
//     // officeS.value =undefined
//     // roleS.value =undefined
//     // eEmail.value=email.value+organization

    
//     if(eName.value.length==0){
//         console.log('Please input ur last name')
//         // lNameS.value=false
//         vStatus =true
//     }
//     if(email.value.length==0){
//         console.log('Please input ur email')
//         // emailS.value=false
//         vStatus =true
//     }
//     if(eGroup.value.length==0){
//         console.log('Please input ur group')
//         // groupS.value=false
//         vStatus =true
//     }
//     if(ePosition.value.length==0){
//         console.log('Please input ur position')
//         // positionS.value=false
//         vStatus =true
//     }
//     if(eOffice.value.length==0){
//         console.log('Please input ur office')
//         // officeS.value=false
//         vStatus =true
//     }
//     if(eRole.value.length==0){
//         console.log('Please input ur role')
//         // roleS.value=false
//         vStatus =true
//     }
//     if(ePw.value.length==0){
//         console.log('Please input ur password')
//         // passWS.value=false
//         vStatus =true
//     }
//     if(eCPw.value.length==0){
//         console.log('Please input ur confirm password')
//         // cPassWS.value=false
//         vStatus =true
//     }
//     if(eName.length>nameL){
//         console.log(`lenght of last name more then ${nameL}`)
//         //lNameS.value=false
//         vStatus =true
//     }
//     if(email.length>emailL){
//         console.log(`lenght of email more then ${emailL}`)
//         //emailS.value=false
//         vStatus =true
//     }
//     if(valFormEmail(email)==false){
//         console.log('this email invalid')
//         //emailS.value=false
//         vStatus =true
//     }
//     if(ePw.value.length>pwL){
//         console.log(`lenght of password more then ${passWL}`)
//         //passWS.value=false
//         vStatus =true
//     }
//     if(eCPw.value.length>pwL){
//         console.log(`lenght of password more then ${passWL}`)
//         // cPassWS.value=false
//         vStatus =true
//     }  
//     if(ePw.value !=eCPw.value){
//         console.log('password not match')
//         // passWS.value=false
//         // cPassWS.value=false
//         vStatus =true
//     }

//     return vStatus
// }



// close pop up
const closeP =(id)=>{
    let button =document.getElementById(id)
    button.setAttribute("href","#")
    button.click()
}


// change status 
const isActive=ref(false)
const change_s=()=>{
    isActive.value = !isActive.value
    // eStatus.value= !eStatus.value
    if(isActive.value==true){
        console.log('status is :',eStatus.value)
        eStatus.value='active'
        
    }else
    if(isActive.value==false){
        console.log('status is :',eStatus.value)
        eStatus.value='inactive'
    }
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
                                Active
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
                        <tr v-for="(data,index) in userList" :key="index"  class="text-[15px] cursor-default bg-white border-b-2 border-gray-300  hover:border-gray-400 hover:bg-gray-400">
                            <td class="]     px-2 py-2 font-medium ">
                                <div class="ml-4">
                                    <div class="w-full ml-3 text-[18px] font-light truncate mx-auto">
                                        {{data.first_name}} {{ data.last_name }}
                                    </div>
                                    <div class="w-full ml-3 text-[10px] truncate mx-auto">
                                        {{ data.email }}
                                    </div>                                     
                                </div>

                            </td>
                            <td class=" text-[15px] px-2 py-2 font-light text-l">
                                <div class="w-full truncate mx-auto">
                                    {{data.group_work}}
                                </div>
                            </td>
                            <td class=" px-2 py-2 text-[20px] font-semibold ">
                                <div class="w-full truncate mx-auto" :style="data.status=='active'?'color:green':'color:red'">
                                    {{data.status}}                                    
                                </div>

                            </td>
                            <td class=" px-2 py-2 text-[20px] font-light">
                                <div class=" mx-auto truncate">
                                {{data.role}}
                                </div>
                            </td>
                            <td class=" px-2 py-2 font-semibold">
                                <div class="flex w-fit mx-auto truncate ">
                                    <a    class="goInfo w-[28px] m-2 ">
                                        <button @click="showInfoByID(data.id,index)">
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
                <div v-if="isEdit==false">
                    <!-- table -->
                    <div>
                        <table class="w-full table-fixed mx-auto mt-6 text-[20px]">
                            <tr>
                                <th  class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Status 
                                </th>
                                <td :style="[user.status=='inactive'?'color:red':'color: green']" class="pt-2 pl-2 indent-[5px] font-semibold text-gray-600 ">
                                    {{ user.status }}
                                </td>
                            </tr>
                            <tr>
                                <th  class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Name
                                    <span> 
                                        {{  }}
                                    </span>
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.first_name }} {{ user.last_name }}
                                </td>
                            </tr>
                            
                            <!-- email -->
                            <tr>
                                <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    E-mail
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.email }}
                                </td>
                            </tr>

                            <!-- role -->
                            <tr>
                                <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Role
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.role }}
                                </td>
                            </tr>

                            <!-- office -->
                            <tr>
                                <th class="table_header w-[120px] h-fit pt-2 text-right font-normal">
                                    Office
                                </th>
                                <td class="pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.office }}
                                </td>
                            </tr>

                            <!-- group -->
                            <tr>
                                <th class="table_header w-[120px] text-right  font-normal" >
                                    Group
                                </th>
                                <td class="pt-2 pl-2 indent-[5px]  font-light text-gray-600">
                                    {{ user.group_work }}
                                </td>
                            </tr>

                            <!-- position -->
                            <tr>
                                <th class="table_header w-[120px] h-fit  text-right font-normal">
                                    Position
                                </th>
                                <td class="w-[100px] h-fit pt-2 pl-2 indent-[5px] font-light text-gray-600">
                                    {{ user.position }}
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
                        
                        <button @click="editDetail(true)" class="w-[200px] h-[50px] px-5 text-[15px]  mx-auto ml-3 font-light text-[#1565C0] bg-gray-300 rounded-2xl hover:bg-[#90CAF9] hover:text-gray-200">
                            แก้ไขข้อมูล
                        </button>
                    </div>
                    
                    
                </div>

                <!-- edit detail  -->
                <div v-else-if="isEdit==true" class="w-[500px] mx-auto">
                       
                    <!-- active -->
                    <div class="relative w-full h-[35px] mt-3">
                        <button @click="change_s" id="container_active" class="relative w-[150px] h-[30px] bg-gray-700 text-gray-100 text-[15px] z-0 rounded-lg">
                            <div v-show="isActive==true" id="active" class="w-full h-full z-10 flex ">
                                <div class="w-[75px] h-full bg-green-300 rounded-l-lg">
                                </div>                            
                                <div class="w-[75px] h-fit m-auto ">
                                        active
                                </div>

                            </div>
                            <div v-show="isActive==false" id="inactive" class="w-full h-full z-10 flex ">
                                <div class="w-[75px] h-fit m-auto ">
                                        inactive
                                </div>
                                <div class="w-[75px] h-full bg-rose-300 rounded-r-lg">
                                </div>
                            </div>
                        </button>                        
                    </div>


                    <!-- full name  and role-->
                    <div class="relative flex w-[500px]">
                        <!-- name -->
                        <div class="relative w-[338px]  h-[50px]  text-sm">
                            <h4 class="ml-2 text-sm font-light text-gray-500">
                                Name
                            </h4>
                            <input v-model="eName" type="text" class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">                              
                        </div>
                        <!-- role -->
                        <div class="relative w-[160px] h-[50px] ml-[2px] text-sm">
                            <h4 class="ml-2  font-light text-gray-500">
                                Role
                            </h4>
                            <select v-model="eRole" name="role" id="role" class="absolute bottom-0 w-full h-[30px] px-2 bg-sky-300 font-light text-[20px] text-gray-600 rounded-lg focus:outline-0">
                                <option value="user">User</option>
                                <option value="admin_it">Admin_IT</option>
                                <option value="admin_pr">Admin_PR</option>
                            </select>
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
                        <a href="#veri" id="editD">
                            <button class="w-[250px] h-fit bg-gray-600 p-2 text-[#90CAF9] rounded-lg hover:bg-[#90CAF9] hover:text-gray-600">
                                ทำการแก้ไข ->                                
                            </button>
                        </a>
                    </div>

                    <!-- back -->
                    <div class="absolute top-[20px] left-[15px] font-light text-[20px]">
                        <button @click="editDetail(false)" class="flex rounded-full pr-3 hover:bg-[#90CAF9] hover:text-[#E3F2FD]">
                            <img src="../../../assets/left-arrow.svg" alt="left-arrow" class="w-[30px] h-[30px] p-1.5 ">
                            <h4 class="my-auto text-[15px]">ย้อนกลับ</h4>
                        </button>
                    </div>
                </div>

                <div class="absolute top-[15px] right-[15px] font-bold text-[30px]">
                    <a @click="editDetail(false)" id="close_info" href="#" class="">
                        <img src="../../../assets/admin_page/close.png" alt="close_icon" class="w-[20px]">
                    </a>
                </div>
            </div>
        </div>
    </div>


    <!-- verify -->
    <div id="veri" class="overlay">
        <div class=" verify_s h-96 ">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะแก้ไขข้อมูลใช่หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <a id="submit_edit" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    <button @click="submitEdit(user.id,'submit_edit')" >
                        ทำการแก้ไข
                    </button>                    
                </a>

            </div>
        </div>
    </div>

    <!-- delete -->
    <div id="dele" class="overlay">
        <div class=" verify_d h-96 ">
            <h2 class="w-fit mx-auto text-[20px]">
                คุณต้องการที่จะลบข้อมูลนี้หรือไม่ ?
            </h2>
            <div class=" absolute bottom-0 w-full  flex m-auto">
                <button @click="myRouter.go(-1)" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-rose-300">
                    ย้อนกลับ
                </button>
                <a id="submit_delete" class="w-full h-fit text-center mx-auto p-2 bg-gray-300 hover:bg-green-300">
                    <button @click="deleteUser(user.id,'submit_delete')" >
                        ลบเลย !!
                    </button>                    
                </a>

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
  margin-top: 6%;
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