import axios from 'utils/axios'

export const endpoints = {
    key: '/Filtros'
};

export async function getFiltroModuloAsync({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Modulos`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}