import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Destinos'
};

export async function getDestinosAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/destinos?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getDestinoResumen({data}){
    try{
        const response = await axios.get(`${endpoints.key}/verDestinoResumen?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actDestino({data}){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actDestino`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}
