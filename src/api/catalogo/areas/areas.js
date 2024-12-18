import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getAreasAsync({data}) {
    try{
        const response = await axios.post(`${endpoints.key}/verAreas`, data)
        return response
    } catch(error){
        return error;
    }
}

export async function actAreaAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actArea`, data)
        return response
    }catch(error){
        return error;
    }
}

export async function getAreaIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verAreaID?ID=${id}`)
        return response.data[0]
    }catch(error){
        console.error('Error fetching area:', error);
        return error;
    }
}