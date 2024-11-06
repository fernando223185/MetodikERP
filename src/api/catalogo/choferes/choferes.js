import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getChoferesAsync({data}){
    try {
        const response = await axios.post(`${endpoints.key}/Choferes`, data)
        return response
    } catch(error) {
        console.error('Error fetching equipos:', error);
        return error;
    }
}

export async function getChoferIDAsync({id = 0}) {
    try {
        const response = await axios.get(`${endpoints.key}/Choferes/verChoferID?ID=${id}`);
        return response.data[0];
    } catch (error) {
        console.error("Error fetching choferes", error);
        return error;
    }
}

export async function newChoferAsync({data}) {
    try {
        const response = await axios.post(`${endpoints.key}/Choferes/actChoferD`, data);
        return response;
    } catch (error) {
        console.error("error: ", error);
        return error;
    }
}

export async function delChoferAsync({id=0}) {
    try {
        const response = await axios.delete(`${endpoints.key}/Choferes/eliminarChofer?ID=${id}`);
        return response;
    } catch(error) {
        console.error("Error fetching choferes:", error);
        return error;
    }
}