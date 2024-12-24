import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getDepartamentosAsync({data}) {
    try{
        const response = await axios.post(`${endpoints.key}/verDepartamentos`, data)
        return response
    } catch(error){
        return error;
    }
}

export async function actDepartamentoAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actDepartamento`, data)
        return response
    } catch(error){
        return error;
    }
}

export async function getDepartamentoIDAsync({id=0}) {
    try{
        const response = await axios.get(`${endpoints.key}/verDepartamentoID?ID=${id}`)
        return response.data[0]
    } catch(error){
        console.error('Error fetching departamento: ', error);
        return error;
    }
}