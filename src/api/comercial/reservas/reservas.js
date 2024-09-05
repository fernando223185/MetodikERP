import axios from 'utils/axios'

export const endpoints = {
    key: '/Comercial'
};

export async function getReservasAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verReservas`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function newReservaAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/NuevaReserva`, data)
        return response
    }catch(error){
        return error;
    }
}
