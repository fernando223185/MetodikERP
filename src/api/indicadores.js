import axios from 'utils/axios'

export const endpoints = {
    key: '/Indicadores'
};

export async function getIndicadoresAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}`, data)
        return response
    }catch(error){
        return error;
    }
}