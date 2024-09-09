import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Sucursales'
};

export async function getSucursalesAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/sucursales?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getSucursalResumen({data}){
    try{
        const response = await axios.get(`${endpoints.key}/verSucursalResumen?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actSucursal({data}){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actSucursal`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}
