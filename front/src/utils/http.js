import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:4000', // 基地址
    timeout: 5000 // 请求超时时间
});
service.interceptors.response.use((res) => {
        if (res.status !== 200) {
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default service;

