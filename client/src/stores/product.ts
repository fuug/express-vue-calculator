import {defineStore} from "pinia"
// @ts-ignore
import request from "@/helpers/request";
import {ref} from "vue";

export const useProductStore = defineStore('product', () => {

    const activeProduct = ref({type: 't-shirt', color: 'white'})
    async function getProductList() {
        try {
            const orderList = await request('product/')
            return orderList.product_list
        } catch (e) {
            console.error(e)
            return null
        }
    }

    return {activeProduct, getProductList}
})
