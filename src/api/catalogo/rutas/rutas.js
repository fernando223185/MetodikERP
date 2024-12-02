import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getRutasAsync({data}) {
    try {
        const response = await axios.post(`${endpoints.key}/Rutas`, data);
        return response;
    } catch (error) {
        console.error("Error fetching rutas:", error);
        return error;
    }
}

export async function getRutaIDAsync({id} = 0) {
    try {
        const response = await axios.get(`${endpoints.key}/Rutas/verCatRutaID?ID=${id}`);
        return response.data[0];
    } catch(error){
        console.error("Error fetching ruta: ", error);
        return error;
    }
}

export async function actRutaAsync({data}) {
    try {
        const response = await axios.post(`${endpoints.key}/Rutas/actCatRuta`, data);
        return response;
    } catch(error) {
        console.error("Error making new ruta: ", error);
        return error;
    }
}

export async function actDescensoRutaAsync({data}) {
    try {
        const response = await axios.post(`${endpoints.key}/Rutas/actDescensoRuta`, data);
        return response;
    } catch(error) {
        console.error("Error creating a new descenso: ", error);
        return error;
    }
}

export async function delDescensoRutaAsync({data}) {
    try {
        const response = await axios.delete(`${endpoints.key}/Rutas/delDescensoRuta`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch(error) {
        console.error("Error deleting descenso: ", error);
        return error;
    }
    
}