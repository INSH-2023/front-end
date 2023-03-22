<script setup>
import BaseProgress from '../../../components/report/BaseProgress.vue';
import TypeOfUse from '../../../components/report/TypeOfUse.vue';
import TypeOfMachine from '../../../components/report/TypeOfMachine.vue'
</script>
<template>
<div class="overflow-auto">
    <div class="pt-3">
       
        <!-- for write report -->
        <div v-if="isSummary==false"  class="w-[1000px] mx-auto">

        <!-- header -->
        <div class="w-fit h-fit mx-auto my-3 text-[36px]">
                <h3 class="font-semibold">
                    รายงานปัญหาเกี่ยวกับ <span class="font-light">{{ typeP }}</span>
                </h3>
            </div> 
        </div>

        <!-- first -->
        <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="w-[400px] h-fit mt-5 mx-auto text-center">
            <TypeOfUse @get-type-of-use="testingData" />
        </div>

        <!-- seconde -->
        <div v-if="typeP=='hardware'||typeP=='software'||typeP=='internet'" class="mt-4">
            <TypeOfMachine @get-type-of-m="testingData" />
        </div>
        
    </div>
</div>   
</template>
<style scoped>
</style>