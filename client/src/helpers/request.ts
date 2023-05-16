import axios from "axios";

export default async function (method: string, body?: {}) {
    try {
        let url_str = import.meta.env.VITE_API_URL

        const headers: { Authorization?: string } = {};

        headers.Authorization ='Bearer ' + getTokenFromCookie();

        if (method[0] === '/')
            url_str += method.slice(1)
        else url_str += method;

        if (body) return await post()
        else return await get()

        async function get() {
            return await axios.get(url_str, {headers})
                .then(({data}) => data)
                .catch(err => {
                    return err.response.data;
                })
        }

        async function post() {
            return await axios.post(url_str, body, {headers})
                .then(({data}) => data)
                .catch(err => {
                    return err.response.data;
                })
        }
    } catch (e) {
        console.log(e)
    }
}

function getTokenFromCookie(name = 'access_token') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';').shift();
    return undefined;
}