import axios from 'utils/axios'

export const endpoints = {
    key: '/Comercial/Paqueteria'
};

export async function getPaqueteriaAsync(){
    try{
        const response = await axios.get(`${endpoints.key}/verPaqueterias`)
        return response
    }catch(error){
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function newPaqueteriaAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/nuevaPaqueteria`, data)
        return response
    }catch(error){
        return error;
    }
}

export async function getPaqueteriaIDAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verPaqueteriaID?ID=${id}`)
        return response.data[0]
    }catch(error){
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function getArtDisponibleAsync({EmpresaID = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verArtDispPaqueteria?EmpresaID=${EmpresaID}`)
        return response.data
    }catch(error){
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function avanzarPaqueteriaAsync({ data })
{
    try{
        const response = await axios.post(`${endpoints.key}/AvanzarPaqueteria`, data)
        return response;
    }catch(error)
    {
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function getPaqueteriaDAsync({ id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verPaqueteriaDetalle?ID=${id}`)
        return response.data
    }catch(error){
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function agregarPaqueteriaDAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/agregarPaqueteriaDetalle`, data)
        return response
    } catch (error) {
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function actPaqueteriaDAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/actPaqueteriaDetalle`, data)
        return response
    } catch (error) {
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function afectarPaqueteriaAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/afectarPaqueteria`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function cancelarPaqueteriaAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/cancelarReserva`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function delRowAsync({ id = 0, RowID = 0}){
    try{
        const response = await axios.delete(`${endpoints.key}/eliminarRenglonPaqueteria?ID=${id}&RenglonID=${RowID}`)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function cambiarSituacionesAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/cambiarSituacion`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

