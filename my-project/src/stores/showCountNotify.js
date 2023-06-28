import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";

export const useNotify = defineStore("notify", () => {
    const requestList = ref([]);
    const addList = (data) => {
        console.log("T")
        requestList.value.push(data)
        console.log(requestList.value)
        return requestList
    };
    const count = computed(() => requestList.value.length)
    const clearList = () => {
        requestList.value = []
    }
    return { requestList, count, addList, clearList }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotify, import.meta.hot))
}