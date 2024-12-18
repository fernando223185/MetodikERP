import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Usuarios'
};

export async function getUsuariosAsync(data){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/verUsuarios`, data)
        return response.data
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

export async function getUsersByIdAsync({id}){
    try{
        console.log(id)
        const response = await axios.get(`${endpoints.key}/verUsuariosPorID?id=${id}`)
        console.log(response)
        return response.data[0]
    }catch(error){
        return error;
    }
}
