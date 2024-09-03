import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Empresas'
};

export async function getEmpresasAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/empresas?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getEmpresasResumen({data}){
    try{
        const response = await axios.get(`${endpoints.key}/verEmpresasResumen?ID=${data.ID}`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actEmpresas({data}){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actEmpresa`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}