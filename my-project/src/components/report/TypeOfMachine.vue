<script setup>
import {ref,computed,onUpdated,onBeforeMount} from 'vue'
import toBackEnd from '../../JS/fetchToBack';
import validate from '../../JS/validate';
const itemLink =`${import.meta.env.VITE_BACK_END_HOST}/items`

const indexNumber=ref(undefined)
const props = defineProps({
    typeOfUseOR:{
        type:Boolean,
        required:true 
    },
    item:{
        type:Array,
        required:false
    }
})
const statusAPI=ref(undefined)
const emit=defineEmits(["getTypeOfM"])
onUpdated(()=>{
    emit('getTypeOfM',{
        name:'type_of_machine',
        item:item.value,
        statusAPI:statusAPI.value

    })
})
onBeforeMount(()=>{
    getItem(validate.getUserDataFromLocal('user_emp_code'))
})

// item variable
const item=ref({
    type:'',
    sn:'',
    brand_or:'',
    user_emp_code:''
})



const itemList=ref([])
// get item for use type = or
const getItem=async(emp_code)=>{
    let [status,data]= await toBackEnd.getData('component_item',`${itemLink}/emp-code/${emp_code}`)
    if(status==200){
        itemList.value =data
        console.log('data item :',itemList.value)
        statusAPI.value=true
    }else{
        // status something
        console.log('error type of machine :',data)
        statusAPI.value=false

    }
}

const setData=(data=undefined,index=undefined)=>{
    if(data!=undefined && props.typeOfUseOR==false && typeof(data)=='string'){
        item.value.type = data
        console.log('set only type machine : ',data)
    }else
    if(data!=undefined && props.typeOfUseOR==true && typeof(index)=='number' && index !=undefined){
        
        indexNumber.value = index
        let {
            item_name,
            item_number,
            item_type,
            user_emp_code
        }=data
        item.value.brand_or=item_name
        item.value.type=item_type
        item.value.sn=item_number
        item.value.user_emp_code = user_emp_code



        console.log('itemmmm',item.value)
    }
    // console.log(data)
}
</script>
<template>
        <div class="w-full text-[20px] font-normal md:text-[25px] sm:w-fit">
            <h3 >
                2. เลือก <span class="text-rose-500">ชนิด</span> อุปกรณ์ของคุณ
            </h3>                    
        </div>

                
        <div v-if="props.typeOfUseOR==false" class="w-[300px] grid grid-cols-3 gap-y-2 gap-x-2 mt-4 mx-auto text-[15px] font-medium 
            sm:w-[400px] sm:grid-cols-4 sm:gap-y-2 sm:gap-x-1
            md:w-full 
            lg:sm:gap-y-4
        ">
            <!-- notebook -->
            <button @click="setData('NoteBook')" name="machine_sf" :style="[item.type=='NoteBook'?'background-color:#1E88E5;color:#E3F2FD':'']" class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit ">
                <img src="../../assets/machine/laptop.png" draggable="false" alt="NoteBook" class="w-[30px] mx-auto md:w-[60px]">
                <h3 class="truncate w-fit mx-auto mt-2 text-[0.813rem] md:text-[1.125rem]">
                    NoteBook
                </h3>
            </button>

            <!-- PC -->
            <button @click="setData('PC')" name="machine_sf" :style="[item.type=='PC'?'background-color:#1E88E5;color:#E3F2FD':'']" class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit ">
                <img src="../../assets/machine/pc.png" draggable="false" alt="NoteBook" class="w-[30px] mx-auto md:w-[60px]">
                <h3 class="truncate w-fit mx-auto mt-2  text-[0.813rem] md:text-[1.125rem] ">
                    PC
                </h3>
            </button>
                    
            <!-- Smart Phone -->
            <button @click="setData('Smart_Phone')" name="machine_sf" :style="[item.type=='Smart_Phone'?'background-color:#1E88E5;color:#E3F2FD':'']" class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit ">
                <img src="../../assets/machine/phone.png" draggable="false" alt="NoteBook" class="w-[30px] mx-auto md:w-[60px]">
                <h3 class="truncate w-fit mx-auto mt-2  text-[0.813rem] md:text-[1.125rem]">
                    Smart Phone
                </h3>
            </button>

            <!-- Tablet -->
            <button @click="setData('Tablet')" name="machine_sf" :style="[item.type=='Tablet'?'background-color:#1E88E5;color:#E3F2FD':'']" class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit ">
                <img src="../../assets/machine/tablet.png" draggable="false" alt="NoteBook" class="w-[30px] mx-auto md:w-[60px]">
                <h3 class="truncate w-fit mx-auto mt-2  text-[0.813rem] md:text-[1.125rem]">
                    Tablet
                </h3>
            </button>
        </div>

        <div v-else-if="props.typeOfUseOR==true && itemList.length != 0" class="w-[300px] grid grid-cols-3 gap-y-2 gap-x-2 mt-4 mx-auto text-[15px] font-medium 
            sm:w-[400px] sm:grid-cols-4 sm:gap-y-2 sm:gap-x-1
            md:w-full 
            lg:sm:gap-y-4
        ">
            <!-- item --> <!--need style selection-->
            <button v-for="(v,index) in itemList" 
                :key="index" 
                @click="setData(v,index)"
                name="machine_or"  
                :style="[item.sn==v.item_number?'background-color:#1E88E5;color:#E3F2FD':'']"
                class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit "
            >
                <img src="../../assets/machine/laptop.png" 
                    draggable="false" 
                    alt="NoteBook" 
                    class="w-[30px] mx-auto md:w-[60px]"
                >
                <h3 class="truncate w-fit mx-auto text-[0.625rem] md:text-[0.813rem] font-light">
                    {{v.item_name}}
                </h3>
                <h3 class="text-[0.625rem] md:text-[0.813rem] font-semibold uppercase">
                    {{v.item_type}}
                </h3>
            </button>

        </div>

        <div v-else-if="props.typeOfUseOR==true && itemList.length == 0" class="w-[300px] grid grid-cols-3 gap-y-2 gap-x-2 mt-4 mx-auto text-[15px] font-medium 
            sm:w-[400px] sm:grid-cols-4 sm:gap-y-2 sm:gap-x-1
            md:w-full 
            lg:sm:gap-y-4
        ">
            <div  name="problem"  class="truncate w-full mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300 md:w-[150px] md:h-fit ">
                <h3 class="w-fit mx-auto">
                    เหมือนว่าคุณจะไม่มีเครื่องที่ใช้ในองค์กรนะ 😱 
                </h3>
            </div>
        </div>
</template>
<style scoped>
</style>