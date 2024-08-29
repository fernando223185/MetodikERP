import axios from 'axios';

const axiosServices = axios.create({ baseURL: 'http://127.0.0.1:5001' });

axiosServices.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default axiosServices;

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
  
    const res = await axiosServices.get(url, { ...config });
  
    return res.data;
};
  
  export const fetcherPost = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
  
    const res = await axiosServices.post(url, { ...config });
  
    return res.data;
};
  