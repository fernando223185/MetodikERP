import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getSucursalesAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verSucursales`,data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actSucursalAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actSucursal`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getSucursalIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verSucursalID?ID=${id}`)
        return response.data[0]
    } catch (error) {
        console.error('Error fetching sucursal:', error);
        return error;
    }
}
