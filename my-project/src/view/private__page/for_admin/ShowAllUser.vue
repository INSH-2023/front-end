<script setup>
import{ref,computed, onBeforeMount}from'vue'

const userLink ='http://localhost:3000/users'
const userList =ref([])

const sampleData=ref([
    {
        "id":1,
        "user":"นักรับ ทมิฬ",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "active":false,
        "respo":"administrator",
    },{
        "id":2,
        "user":"ทมิฬ นักรับ ",
        "email":"testingEmail@testingmain.com",
        "group":"วิจัยและวัฒนะธรรม",
        "active":true,
        "respo":"administrator",
    },
    
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

// get user
const getUsers =async()=>{
    const res =await fetch(userLink,{
        method:'GET'
    })
    if(res.status==200){
        userList.value=await res.json()
        console.log('get data successfull')
    }else{
        console.log('cannot get user list')
    }
}

// delete user
const deleteUser =async(v)=>{
    const res = await fetch(`${userLink}/${v}`,{
        method:'DELETE'
    })
    if(res.status==200){
        console.log('user delete successful')
        getUsers()
    }else{
        console.log('error something cannot delete user')
    }
}

onBeforeMount(()=>{
    getUsers()
})

const userCh=ref({})
const user=ref({})
// showInfo
const showInfoByID=async(v,index)=>{
    user.value=[]
    console.log('value : ',v)
    console.log('index : ',index)
    // statusCh.value=undefined
    // assignCh.value=''
    // commentCh.value=''
    let detail =document.getElementsByClassName("goInfo")
    console.log('this is index:',index)

    let res=await fetch(`${userLink}/${v}`,{
        method:'GET'
    })
    if(res.status==200){
        console.log('get user successful')
        user.value=await res.json()
        userCh.value=user.value
        console.log(user.value)
        // changeST(user.value.status)
        // user.value.assign==''?assignCh.value='': assignCh.value = event.value.assign
        detail[index].setAttribute("href","#showInfo")
        detail[index].click()
    }else{
        console.log('error to get event')
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
                        <tr class="text-[25px] text-gray-500">
                            <th scope="col" class="py-2 px-2 ">
                                Name
                            </th>
                            <th scope="col" class=" py-2 px-2">
                                Group
                            </th>
                            <th scope="col" class="py-2 px-2">
                                Active
                            </th>
                            <th scope="col" class="py-2 px-2">
                                Reposibility
                            </th>
                            <th scope="col" class="py-2 px-2">
                                
                            </th>
                            
                            
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in userList" :key="index"  class="text-[15px] cursor-pointer bg-white border-b-2 border-gray-300 hover:border-gray-400 hover:bg-gray-400">
                            <td class="] text-left    px-2 py-2 font-medium text-left">
                                <div class="ml-4">
                                    <div class="w-full ml-3 text-[18px] font-semibold truncate mx-auto">
                                        {{data.first_name}} {{ data.last_name }}
                                    </div>
                                    <div class="w-full ml-3 text-[10px] truncate mx-auto">
                                        {{ data.email }}
                                    </div>                                     
                                </div>

                            </td>
                            <td class=" text-[15px] px-2 py-2 font-semibold ">
                                <div class="w-full truncate mx-auto">
                                    {{data.group_work}}
                                </div>
                            </td>
                            <td class=" px-2 py-2 text-[22px] font-semibold ">
                                <div class="w-full truncate mx-auto" :style="data.status=='Active'?'color:green':'color:red'">
                                    {{data.status}}                                    
                                </div>

                            </td>
                            <td class=" px-2 py-2 text-[22px] font-semibold ">
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
                                    <img @click="deleteUser(data.id)" src="../../../assets/admin_page/bin.png" alt="delete_icon" class="w-[28px] h-[28px] m-2">
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

                <!-- table -->
                <div>
                    <table class="table-auto mx-auto mt-10 text-[20px]">
                       <tbody>
                        <tr>
                            <td class="text-right font-normal">
                                Name :
                            </td>
                            <td class="indent-[5px] font-light text-gray-600">
                                {{ user.first_name }} {{ user.last_name }}
                            </td>
                        </tr>
                        
                        <!-- email -->
                        <tr>
                            <td class="text-right font-normal">
                                E-mail :
                            </td>
                            <td class="indent-[5px] font-light text-gray-600">
                                {{ user.email }}
                            </td>
                        </tr>

                        <!-- role -->
                        <tr>
                            <td class="text-right font-normal">
                                Role :
                            </td>
                            <td class="indent-[5px] font-light text-gray-600">
                                {{ user.role }}
                            </td>
                        </tr>

                        <!-- office -->
                        <tr>
                            <td class="text-right font-normal">
                                Office :
                            </td>
                            <td class="indent-[5px] font-light text-gray-600">
                                {{ user.office }}
                            </td>
                        </tr>

                        <!-- group -->
                        <tr>
                            <td class="text-right font-normal" >
                                Group :
                            </td>
                            <td class="indent-[5px] font-light text-gray-600">
                                {{ user.group_work }}
                            </td>
                        </tr>

                        <!-- position -->
                        <tr>
                            <td class="text-right">
                                Position :
                            </td>
                            <td class="indent-[5px] font-light text-gray-600">
                                {{ user.position }}
                            </td>
                        </tr>


                       </tbody>
                    </table>
                </div>

                <!-- button -->
                <div class="w-full flex mt-10">
                    <button class="w-[200px] h-[50px] px-5 mx-auto mr-3 text-[20px] font-light bg-rose-400 text-white rounded-2xl">
                        ลบข้อมูล
                    </button>
                    <button class="w-[200px] h-[50px] px-5 text-[20px]  mx-auto ml-3 font-light bg-violet-400 text-white rounded-2xl">
                        แก้ไขข้อมูล
                    </button>
                </div>
                
                <div class="absolute top-[15px] right-[15px] font-bold text-[30px]">
                    <a id="close_info" href="#">
                        <img src="../../../assets/admin_page/close.png" alt="close_icon" class="w-[20px]">
                    </a>
                </div>
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
  padding: 35px;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 16px;
  background: #fff;
  width: 40%;
  height: 450px;
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