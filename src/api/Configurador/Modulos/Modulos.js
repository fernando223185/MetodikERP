import axios from 'utils/axios'

export const endpoints = {
    key: '/Configuracion'
};

export async function getModulosAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verModulos`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actModuloAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actModulo`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getModuloIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verModuloID?ID=${id}`)
        return response.data[0]
    } catch(error){
        console.error('Error fetching modulo:', error);
        return error;
    }
}