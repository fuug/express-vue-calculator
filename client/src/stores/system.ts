import {defineStore} from "pinia"
// @ts-ignore
import request from "@/helpers/request";
import {ref} from "vue";

export const useSystemStore = defineStore('system', () => {

    const isShowAuthModal = ref(false)

    const setAuthModal = (isShow: boolean) => {
        isShowAuthModal.value = isShow;
    }

    return {isShowAuthModal, setAuthModal}
})
