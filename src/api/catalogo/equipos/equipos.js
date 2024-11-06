import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getEquiposAsync({data}) {
    try {
        const response = await axios.post(`${endpoints.key}/Equipos`, data);
        return response;
    } catch(error) {
        console.error('Error fetching equipos:', error);
        return error;
    }
}

export async function newEquipoAsync({data}) {
    try {
        const response = await axios.post(`${endpoints.key}/Equipos/actEquipoD`, data);
        return response;
    } catch(error) {
        console.error("error: ", error);
        return error;
    }
}

export async function getEquipoIDAsync({id = 0}) {
    try {
        const response = await axios.get(`${endpoints.key}/Equipos/verEquipoID?ID=${id}`);
        return response.data[0];
    } catch(error) {
        console.error("Error fecthing equipos:", error);
        return error;
    }
}

export async function delEquipoAsync({id = 0}) {
    try {
        const response = await axios.delete(`${endpoints.key}/Equipos/eliminarEquipo?ID=${id}`);
        return response;
    } catch(error) {
        console.error("Error fetching equipos:", error);
        return error;
    }
}

