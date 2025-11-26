import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://api-class-o1lo.onrender.com/api/thuannh/',
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config)
    return config;
});

export default api;
