import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getConceptosAsync({data}) {
    try{
        console.log('Request Data:', data);
        const response = await axios.post(`${endpoints.key}/verConceptos`, data)
        console.log(response)
        return response
    }catch(error){
        return error;
    }
}

export async function actConceptosAsync({data}) {
    try{
        const response = await axios.post(`${endpoints.key}/actConcepto`, data)
        return response
    }catch(error){
        return error;
    }
}

export async function getConceptoIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verConceptoID?ID=${id}`)
        return response.data[0]
    } catch (error) {
        console.error('Error fetching concepto:', error);
        return error;
    }
}