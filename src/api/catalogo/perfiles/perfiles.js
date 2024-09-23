import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Perfiles'
};

export async function getProfilesAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/verPerfiles?EstatusID=${data.EstatusID}&EmpresaID=${data.EmpresaID}`)
        return response
    }catch(error){
        return error;
    }
}

export async function ActProfilerAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actPerfil`, data)
        console.log(response)
        return response
    }catch(error){
        return error;
    }
}

export async function getPerfilesByIdAsync(ID){
    try{
        const response = await axios.get(`${endpoints.key}/verPerfilID?ID=${ID}` )
        console.log(response)
        return response.data[0]
    }catch(error){
        return error;
    }
}
