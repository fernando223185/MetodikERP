import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Almacenes'
};

export async function getAlmacenesAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/almacenes?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getAlmacenResumen({data}){
    try{
        const response = await axios.get(`${endpoints.key}/verAlmacenResumen?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actAlmacen({data}){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actAlmacen`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}
