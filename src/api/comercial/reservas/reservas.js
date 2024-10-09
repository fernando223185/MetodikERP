import axios from 'utils/axios'

export const endpoints = {
    key: '/Comercial'
};

export async function getReservasAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verReservas`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function newReservaAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/NuevaReserva`, data)
        return response
    }catch(error){
        return error;
    }
}

export async function getReservaIDAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/Reservas/verReservaID?ID=${id}`)
        return response.data[0]
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function avanzarReservaAsync({ data })
{
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/avanzarReserva`, data)
        return response;
    }catch(error)
    {
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function getRutaIdaAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/Reservas/verViajesDisponiblesIda?ID=${id}`)
        return response.data
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function getRutaVueltaAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/Reservas/verViajesDisponiblesVuelta?ID=${id}`)
        return response.data
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function actReservaDAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/Reservas/ActReservaD`, data)
        return response
    } catch (error) {
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function getReservaDAsync({ id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/Reservas/verReservaDetalle?ID=${id}`)
        return response.data
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function delRowAsync({ id = 0, RowID = 0}){
    try{
        const response = await axios.delete(`${endpoints.key}/Reservas/eliminarRenglonReserva?ID=${id}&RenglonID=${RowID}`)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function getAsientosAsync({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/verAsientosDispoblesRuta`, data)
        return response.data
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function agregarAsientoAsync({ data })
{
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/agregarAsientos`, data)
        return response;
    }catch(error)
    {
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function getPersonaReservaAsync({ data }){
    try{
        const response = await axios.get(`${endpoints.key}/Reservas/verPersonasReserva?ID=${data.ID}&HorarioRutaID=${data.HorarioRutaID}&RenglonID=${data.RenglonID}`)
        return response.data
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function guardarDatosPersonaAsync({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/guardarDatosPersona`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function cancelarReservaAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/cancelarReserva`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function afectarReservaAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/afectarReserva`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function agregarFormaPagoAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/agregarPagoReserva`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function cambiarSituacionesAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/Reservas/cambiarSituacion`, data)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function agregarEquipajeDAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/Reservas/AgregarEquipajeDetalle`, data)
        return response
    } catch (error) {
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function getEquipajeDAsync({ id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/Reservas/verEquipajeDetalle?ID=${id}`)
        return response.data
    }catch(error){
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function actEquipajeDetalleAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/Reservas/actEquipajeDetalle`, data)
        return response
    } catch (error) {
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}

export async function delRowEquipajeAsync({ id = 0, RowID = 0}){
    try{
        const response = await axios.delete(`${endpoints.key}/Reservas/eliminarRenglonEquipaje?ID=${id}&RenglonID=${RowID}`)
        return response
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}