import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Choferes'
};

export async function getChoferesAsync(){
    try{
        const response = await axios.get(`${endpoints.key}/choferes`)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actChoferes({data}){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actChoferes`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}