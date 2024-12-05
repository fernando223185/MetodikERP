import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getDestinosAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verDestinos`,data)
        console.log(response)
        return response
    } catch(error) {
        return error
    }
}

export async function actDestinoAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actDestino`, data)
        console.log(response)
        return response 
    } catch(error) {
        return error;
    }
}

export async function getDestinosIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verDestinoID?ID=${id}`)
        return response.data[0]
    } catch(error) {
        console.error('Error fetching destino:', error);
        return error;
    }
}
