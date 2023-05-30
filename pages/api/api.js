import axios from "axios";
const BASEURL = "https://api.belkacrypto.com/api/v2/"

const URLS = Object.freeze({
    Login: `${BASEURL}token/otp/`,
    LoginVerify: `${BASEURL}token/verify/`,

    ForgetPassword: `${BASEURL}token/password/`,
    ForgetPasswordVerify: `${BASEURL}token/password/verify/`
})



const config = {
    baseURL: BASEURL,
}


const api = axios.create(config)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token)
        config.headers["Authorization"] = `Bearer ${token}`
    return config
})
api.interceptors.response.use((config) => {
    return config
},
    (error) => {
        if ((error?.response?.status === 401 || error?.response?.status === 400) && localStorage.getItem('token'))
            localStorage.removeItem('token');
        return Promise.reject(error)
    }
)

export {
    api,
    BASEURL,
    URLS
}