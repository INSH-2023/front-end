<script setup>
import {ref,onBeforeMount} from 'vue'
const props =defineProps({
    type:{
        type:String,
        default:'text'
    },
    w:{
        type:String,
        default:'10'
    },
    h:{
        type:String,
        default:'10'
    },
    r:{
        type:String,
        default:'10'
    }
})
const arrayy=ref(['.'])
const wait =()=>{
    if(arrayy.value.length<4){
        arrayy.value.push('.')
    }else 
    if(arrayy.value.length==4){
        arrayy.value=[]
    }
 
}
onBeforeMount(()=>{
    setInterval(wait,500)
})
</script>
<template>
    <div v-if="props.type=='text'" class="flex m-auto">
        <div>
            Waiting            
        </div>
        <div v-for="(d,index) in arrayy" :key="index">
            {{d}}
        </div>
    </div>
    <div v-else-if="props.type=='circle'" :style="`width:${props.w}px;height:${props.h}px;`" class="lds-dual-ring">
    </div>
</template>
<style scoped>
.lds-dual-ring {
  display: block;
  margin: auto;
  border-radius: 50%;
  border: 5px  solid #cef;
  border-color: #cef  #cef transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
