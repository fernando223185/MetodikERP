import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getVehiculosAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verVehiculos`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actVehiculoAync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actVehiculo`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getVehiculosIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verVehiculoID?ID=${id}`)
        return response.data[0]
    } catch(error){
        console.error('Error fetching vehiculo:', error);
        return error;
    }
}
