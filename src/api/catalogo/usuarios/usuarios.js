import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Usuarios'
};

export async function getUsersAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/usuarios?EmpresaID=${data.EmpresaID}&EstatusID=${data.EstatusID}`, data)
        console.log(response)
        return response
    }catch(error){
        return error;
    }
}
