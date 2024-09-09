import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Vehiculos'
};

export async function getVehiculosAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/vehiculos?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getVehiculoResumen({data}){
    try{
        const response = await axios.get(`${endpoints.key}/verVehiculoResumen?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actVehiculo({data}){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actVehiculo`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}
