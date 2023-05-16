import {defineStore} from "pinia"
// @ts-ignore
import request from "@/helpers/request";

export const useOrderStore = defineStore('order', () => {

    async function createOrder(payload: {}) {
        try {
            const res = await request('order/create', payload)
            return true
        } catch (e) {
            console.error(e)
            return null
        }
    }

    async function getOrderList() {
        try {
            const orderList = await request('order/')
            return orderList.order_list
        } catch (e) {
            console.error(e)
            return null
        }
    }

    return {createOrder, getOrderList}
})
