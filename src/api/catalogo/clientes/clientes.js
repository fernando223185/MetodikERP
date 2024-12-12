import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getClientesAsync({data}){
    try {
        const response = await axios.post(`${endpoints.key}/Clientes`, data)
        return response
    } catch(error) {
        console.error('Error fetching clientes:', error);
        return error;
    }
}

export async function getClienteIDAsync({id = 0}) {
    try {
        const response = await axios.get(`${endpoints.key}/Clientes/verClienteID?ID=${id}`);
        return response.data[0];
    } catch (error) {
        console.error("Error fetching clientes", error);
        return error;
    }
}

export async function newActClienteAsync({data}) {
    try {
        const response = await axios.post(`${endpoints.key}/Clientes`, data)
        return response
    } catch (error) {
        console.error("Error makin cliente", error);
        return error;
    }
}