import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Agentes'
};

export async function getAgentesAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/agentes?EmpresaID=${data.EmpresaID}&EstatusID=${data.EstatusID}`)
        return response
    }catch(error){
        return error;
    }
}

export async function ActAgentesAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actAgentes`, data)
        console.log(response)
        return response
    }catch(error){
        return error;
    }
}

export async function getAgentesByIdAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verAgenteID?ID=${id}` )
        console.log(response)
        return response.data[0]
    }catch(error){
        return error;
    }
}
