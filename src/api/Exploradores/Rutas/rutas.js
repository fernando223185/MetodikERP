import axios from 'utils/axios'

export const endpoints = {
    key: '/Exploradores/Rutas'
};

export async function getExploradorRutas(){
    try{
        const response = await axios.get(`${endpoints.key}`)
        return response
    }catch(error){
        return error;
    }
}

export async function getExploradorRutasID(ID){
    try{
        const response = await axios.get(`${endpoints.key}/RutasDetalle?ID=${ID}`)
        return response
    }catch(error){
        return error;
    }
}
