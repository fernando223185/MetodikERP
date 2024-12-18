import axios from 'utils/axios'

export const endpoints = {
    key: '/HelpDesk',
};

export async function getTicketsAsync({data}) {
    try{
        const response = await axios.post(`${endpoints.key}/verTickets`, data)
        return response
    } catch(error){
        return error;
    }
}

export async function actTicketAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actTickets`, data)
        return response
    } catch(error){
        return error;
    }
}

export async function getTicketIDAsync({id=0}){
    try{
        const response = await axios.get(`${endpoints.key}/verTicketID?ID=${id}`)
        return response.data[0]
    } catch(error){
        console.error('Error fetching tickets: ', error);
        return error;
    }
}

export async function avanzaTicketAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/avanzaTicket`, data)
        return response
    } catch(error){
        console.error('Error fetching tickets: ', error);
        return error;
    }
}

export async function reasignarTicketAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/reasignarTicket`, data)
        return response
    } catch(error){
        console.error('Error fetching tickets: ', error);
        return error;
    }
}

export async function actComentarioAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actComentario`, data)
        return response
    } catch(error){
        console.error('Error fetching tickets: ', error);
        return error;
    }
}

export async function getComentariosIDAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verComentarios`, data)
        return response
    } catch(error){
        console.error('Error fetching tickets: ', error);
        return error;
    }
}

export async function cancelarTicketAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/cancelarTicket`, data)
        return response
    } catch(error){
        console.error('Error fetching tickets: ', error);
        return error;
    }
}

export async function subirArchivoAsync({ file, tipo }) {
    try {
        // Crear un objeto FormData para incluir el archivo y el tipo
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tipo', tipo);

        // Enviar la solicitud POST al endpoint
        const response = await axios.post('/Archivos/subirArchivo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Devolver la respuesta
        return response.data;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        return {
            error: 'Hubo un problema al subir el archivo',
            details: error,
        };
    }
}