<script setup>
import{ref,computed,onBeforeMount,onUpdated} from 'vue'
import toBackEnd from '../../JS/fetchToBack'

const problemsLink = `${import.meta.env.VITE_BACK_END_HOST}/problems`
const emit =defineEmits(["getProblemSelected"])
const props = defineProps({
    typeP:{
        type:Array,
        required:true
    }
})

onBeforeMount(async()=>{
    getProblems()
})

onUpdated(()=>{
    emit('getProblemSelected',{problems:problems.value,other:otherSelection()})
})

// get from db
const problemList =ref([])
// selection
const problems =ref([])
//check other
const is_other=ref(false)
const otherSelection=()=>{
    let status=is_other.value
    is_other.value = !is_other.value
    status=is_other.value
    return status
}

// get problems
const getProblems=async()=>{
    let[status,data]=await toBackEnd.getData('component_problem',problemsLink,props.typeP)
    if(status==200){
        problemList.value=data
        // console.log(data)        
        addProperty(problemList.value)
    }else{
        console.log(data)
    }
}

// add property
const addProperty =(v)=>{
    for(let data of v){
        data['selection']=false
    }
    // console.log(v)
}

// add problem
const addP =(v)=>{
    let check=false
    for(let value of problems.value){
        if(value==v)check=true;
       
    } 
    if(check==true){
        // console.log(problems.value.indexOf(v))
        problems.value.splice(problems.value.indexOf(v),1)
        // console.log(problems.value)

        // animation
        for(let value2 of problemList.value){
            if(value2.problem_problem==v){
                value2.selection= !value2.selection
            }
            
        }
        check=false
        console.log(problems.value)
    }
    else if(check==false){
        problems.value.push(v)

        // animation
        for(let value2 of problemList.value){
            if(value2.problem_problem==v){
                value2.selection= !value2.selection
            }
            
        }
        // console.log(problemList.value)
        console.log(problems.value)
    }
}
</script>
<template>
<!-- problems -->
    <button  v-for="(value,index) in problemList" :key="index" @click="addP(value.problem_problem)"  :style="[value.selection==true?'background-color:#1E88E5;color:#E3F2FD':'']" class="w-[150px] mx-auto p-2 hover:bg-gray-300 bg-gray-200 rounded-xl">
        <img src="../../assets/vue.svg" alt="NoteBook" draggable="false" class="w-[80px] mx-auto">
        <h3 class="w-fit mx-auto">
            {{value.problem_problem}}
        </h3>
    </button>


    <!-- other -->
    <button  @click="otherF"  class="w-[150px] mx-auto p-2 bg-gray-200 rounded-xl hover:bg-gray-300">
        <img src="../../assets/report_icon/other.png" draggable="false" alt="other" class="w-[80px] mx-auto">
        <h3 class="w-fit mx-auto">
            อื่นๆโปรดระบุ
        </h3>
    </button> 
</template>
<style scoped>
</style>