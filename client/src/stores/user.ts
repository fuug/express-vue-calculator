import {defineStore} from "pinia"
import {computed, ref} from "vue";
// @ts-ignore
import request from "@/helpers/request";

export const useUserStore = defineStore('user', () => {
    const user = ref<{ name?: string, email?: string }>({})

    const token = getTokenFromCookie()

    if (token)
        getUser().then(res => user.value = res);

    async function getUser(): Promise<{ name?: string, email?: string, access_token?: string; } | {}> {
        try {
            const userRaw = await request('user/current')
            if (userRaw.user)
                return userRaw.user
            return {};
        } catch (e) {
            console.error(e)
            return {};
        }
    }

    async function getUserById(id): Promise<{ name?: string, email?: string, access_token?: string; } | {}> {
        try {
            const userRaw = await request('user/get', {id:id})
            if (userRaw.user)
                return userRaw.user
            return {};
        } catch (e) {
            console.error(e)
            return {};
        }
    }

    async function login(payload: { email: string, password: string }) {
        try {
            const userRaw = await request('auth/login', payload)
            if (userRaw.error)
                return {error: userRaw.error}
            if (userRaw.token) {
                setAccessToken(userRaw.token)
                getUser().then(res => user.value = res);
            }
            return true
        } catch (e) {
            console.error(e)
            return null
        }
    }

    async function registration(payload: { email: string, password: string, second_password: string, name: string }) {
        try {
            const userRaw = await request('auth/signup', payload)
            if (userRaw.error)
                return {error: userRaw.error}
            if (userRaw.token) {
                setAccessToken(userRaw.token);
                getUser().then(res => user.value = res);
            }
            return true
        } catch (e) {
            console.error(e)
            return null
        }
    }

    async function logout() {
        removeAccessToken()
        getUser().then(() => {
            user.value = {}
        })
    }

    return {user, getUser, getUserById, login, logout, registration}
})

function setAccessToken(token: string) {
    const time = 3600 * 24 * 30;
    document.cookie = "access_token=" + token + "; max-age=" + time;
}

function removeAccessToken() {
    const time = 0;
    document.cookie = "access_token=''; max-age=" + time;
}

function getTokenFromCookie(name = 'access_token') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';').shift();
    return undefined;
}
