<script setup>
import {onBeforeMount, ref} from 'vue'
import toBackEnd from '../../../JS/fetchToBack';
import { useRouter,useRoute } from 'vue-router'

const { params } = useRoute()
const empCode =params.emp_code

const myRouter = useRouter()
const goBack=()=>myRouter.go(-1)

const u_empCode =ref('ทดสอบ1 ทดสอบ1 ทดสอบ1 ทดสอบ1 ทดสอบ1')
const u_name=ref('ทดสอบ')
const u_email=ref('ทดสอบ')
const u_role=ref('ทดสอบ')
const u_group =ref('ทดสอบ')
const u_office=ref('ทดสอบ')
const u_position=ref('ทดสอบ')
const u_createdAt=ref('ทดสอบ')
const userLink = `${import.meta.env.VITE_BACK_END_HOST}/users`
const user =ref({})

const getStatus=ref(undefined)
const getUser=async()=>{
    // let status=undefined
    let [s, data] = await toBackEnd.getDataBy('user', `${userLink}/emp-code`, empCode)
        if (s == 200) {
            // status = true
            user.value=data
            console.log(data)
            assignDetail(user.value)
            getStatus.value=true
        }else{
            getStatus.value=false
            console.log('Fail ,cannot get user detail.')
        }    
    
}

const assignDetail=(data)=>{
    let {
        user_emp_code:emp_code,
        user_first_name:first_name,
        user_last_name:last_name,
        user_email:email,
        user_role:role,
        user_group:group,
        user_office:office,
        user_position:position,
        user_createdAt:createdAt
    }=data

    u_empCode.value=emp_code
    u_name.value=`${first_name} ${last_name}`
    u_email.value=email
    u_role.value=role
    u_group.value=group
    u_office.value=office
    u_position.value=position
    u_createdAt.value=new Date(createdAt).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok', day: "numeric", month: "narrow", year: "numeric"})
}

onBeforeMount(()=>{
    getUser()
    console.log(params.empCode)
    
})

</script>
<template>
<div class="h-fit w-[900px] mt-10 mb-4 m-auto">
    <div v-if="getStatus==true" class="show_up">
        <h4 class="w-fit h-fit mx-auto text-[2rem] font-semibold">
            User profile     
        </h4>
        <div class="w-[800px] text-[1.2rem] m-auto mt-6">
            <table class="w-full h-full  ">
                <tr >
                    <th class="w-[30%] h-fit px-3 text-right">
                        Employee code :
                    </th>
                    <td class="w-[60%] break-all">
                        {{ u_empCode }}
                    </td>
                </tr>

                <tr>
                    <th class="w-[30%] h-fit px-3 text-right">
                        Name :
                    </th>
                    <td class="w-[60%] break-all">
                        {{u_name}}
                    </td>
                </tr>

                <tr>
                    <th class="w-[30%] h-fit px-3 text-right">
                        email :
                    </th>
                    <td class="w-[60%] break-all">
                        {{u_email}}
                    </td>
                </tr>

                <tr>
                    <th class="w-[30%] h-fit px-3 text-right">
                        Role :
                    </th>
                    <td class="w-[60%] break-all">
                        {{u_role}}
                    </td>
                </tr>
                
                <tr>
                    <th class="w-[30%] h-fit px-3 text-right">
                        Group :
                    </th>
                    <td class="w-[60%] break-all">
                        {{u_group}}
                    </td>
                </tr>

                <tr>
                    <th class="w-[30%] h-fit px-3 text-right">
                        office :
                    </th>
                    <td class="w-[60%] break-all">
                        {{u_office}}
                    </td>
                </tr>

                <tr>
                    <th class="w-[30%] h-fit px-3 text-right">
                        position :
                    </th>
                    <td class="w-[60%] break-all">
                        {{u_position}}
                    </td>
                </tr>
                
                <tr>
                    <th class="w-[30%] h-fit px-3 text-right">
                        createdAt :
                    </th>
                    <td class="w-[60%] break-all">
                        {{u_createdAt}}
                    </td>
                </tr>

            </table>    
        </div>


        <div class="w-[200px] h-fit mx-auto  mt-6">
            <button @click="goBack" class="h-full w-full p-1.5 bg-gray-300 rounded hover:bg-[#457b9d] hover:text-white active:bg-[#a8dadc]">
                    ย้อนกลับ
                </button>
        </div>
        
    </div>    
    <div v-else>
        <h4 class="w-fit h-fit mx-auto mt-6 text-[2rem] font-semibold"> 
            Fail, cannot get user detail
        </h4>
        <div class="w-[200px] h-fit mx-auto  mt-6">
            <button @click="goBack" class="h-full w-full p-1.5 bg-gray-300 rounded hover:bg-[#457b9d] hover:text-white active:bg-[#a8dadc]">
                ย้อนกลับ
            </button>
        </div>
       
    </div>
    
    
</div>
        

</template>
<style scoped>
</style>