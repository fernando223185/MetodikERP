import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getPasajerosAsync({data}){
    try {
        const response = await axios.post(`${endpoints.key}/verPasajeros`, data)
        return response
    }catch(error){
        console.error('Error fetching pasajeros: ', error);
        return error;
    }
}

export async function actPasajerosAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actPasajeros`, data)
        return response
    }catch(error){
        return error;
    }
}

export async function getPasajerosIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verPasajerosID?ID=${id}`)
        return response.data[0]
    }catch(error){
        console.error('Error fetching pasajeros: ', error);
        return error;
    }
}