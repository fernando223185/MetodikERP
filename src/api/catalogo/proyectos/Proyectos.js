import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos'
};

export async function getProyectosAsync({data}) {
    try{
        const response = await axios.post(`${endpoints.key}/verProyectos`, data)
        return response
    } catch(error){
        return error;
    }
}

export async function actProyectoAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actProyecto`, data)
        return response
    } catch(error){
        return error;
    }
}

export async function getProyectoIDAsync({id=0}) {
    try{
        const response = await axios.get(`${endpoints.key}/verProyectoID?ID=${id}`)
        return response.data[0]
    } catch(error){
        console.error('Error fetching Proyecto: ', error);
        return error;
    }
}