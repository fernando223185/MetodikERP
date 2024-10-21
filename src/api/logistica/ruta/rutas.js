import axios from 'utils/axios'

export const endpoints = {
    key: '/Logistica/Rutas'
};

export async function getRutaAsync(){
    try{
        const response = await axios.get(`${endpoints.key}/verRutas`)
        return response
    }catch(error){
        console.error('Error fetching rutas:', error);
        return error;
    }
}

export async function newRutaAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/nuevaRuta`, data)
        return response
    }catch(error){
        return error;
    }
}

export async function getRutaIDAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verRutaID?ID=${id}`)
        return response.data[0]
    }catch(error){
        console.error('Error fetching reservas:', error);
        return error;
    }
}

export async function getRutaDAsync({ id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verRutaDetalle?ID=${id}`)
        return response.data
    }catch(error){
        console.error('Error fetching ruta:', error);
        return error;
    }
}

export async function avanzarRutaAsync({ data })
{
    try{
        const response = await axios.post(`${endpoints.key}/AvanzarRuta`, data)
        return response;
    }catch(error)
    {
        console.error('Error fetching rutas:', error);
        return error;
    }
}

export async function getRutaDisAsync({id = 0}){
    try{
        const response = await axios.get(`${endpoints.key}/verParadaRutasDisponible?ID=${id}`)
        return response.data
    }catch(error){
        console.error('Error fetching rutas:', error);
        return error;
    }
}

export async function agregarParadaDAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/agregarParadaRuta`, data)
        return response
    } catch (error) {
        console.error('Error fetching rutas:', error);
        return error;
    }
}

export async function actParadaDAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/ActParadaRuta`, data)
        return response
    } catch (error) {
        console.error('Error fetching rutas:', error);
        return error;
    }
}

export async function delRowAsync({ id = 0, RowID = 0, UsuarioID = 0}){
    try{
        const response = await axios.delete(`${endpoints.key}/eliminarParadaRuta?ID=${id}&RenglonID=${RowID}&UsuarioID=${UsuarioID}`)
        return response
    }catch(error){
        console.error('Error fetching rutas:', error);
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

export async function afectarRutaAsync ({ data }){
    try{
        const response = await axios.post(`${endpoints.key}/afectarRuta`, data)
        return response
    }catch(error){
        console.error('Error fetching rutas:', error);
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

export async function verPDFAsync({ data }){
    try {
        const response = await axios.post(`${endpoints.key}/Reservas/verPDFReserva`, data)
        return response
    } catch (error) {
        console.error('Error fetching paqueteria:', error);
        return error;
    }
}