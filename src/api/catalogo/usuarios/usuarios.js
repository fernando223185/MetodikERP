import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Usuarios'
};

export async function getUsersAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/usuarios?EmpresaID=${data.EmpresaID}&EstatusID=${data.EstatusID}`)
        return response
    }catch(error){
        return error;
    }
}

export async function ActUsersAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actUsuarios`, data)
        console.log(response)
        return response
    }catch(error){
        return error;
    }
}

export async function getUsersByIdAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verUsuarioID?ID=${id}` )
        console.log(response)
        return response.data[0]
    }catch(error){
        return error;
    }
}