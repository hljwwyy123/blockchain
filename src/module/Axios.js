import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

// 超时
axios.defaults.timeout = 10000;
// 允许发送cookie
axios.defaults.withCredentials = true;
//标记 XMLHttpRequest
// axios.defaults.headers = {'X-Requested-With': 'XMLHttpRequest'};

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 封装的
const ajax = {
    get(url, data) {
        return new Promise((resolve, reject) => {
            let a = { params: data ? data: '' };
            axios.get(url, a).then((response) => {
                resolve(response.data)
            }, (response) => {
                reject(response.data)
            })
        })
    },
    // todo 不支持post请求
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data)).then((response) => {
                resolve(response.data)
            }).catch((response) => {
                reject(response.data)
            })
        })
    },
};

Vue.prototype.$ajax = ajax;

export default ajax;