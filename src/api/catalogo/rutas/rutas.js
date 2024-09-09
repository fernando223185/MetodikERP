import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Rutas',
};

export async function getRutasAsync(){
    try{
        const response = await axios.get(`${endpoints.key}/rutas`)
        console.log(response)
        return response
    } catch (error){
        return error;
    }
}

export async function getRutasResumen(data){
    try{
        const response = await axios.get(`${endpoints.key}/verRutasResumen?ID=${data.ID}`,data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actRutas(data){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actRuta`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}
