import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Rutas',
};

export async function getRutasAsync(){
    try{
        const response = await axios.get(`${endpoints.key}/rutas`)
        console.log(response)
        return response
    } catch (error){
        return error;
    }
}

export async function getRutasResumen(id){
    try{
        const response = await axios.get(`${endpoints.key}/verRutasResumen?ID=${id}`)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actRutas(data){
    try{
        console.log(data)
        const response = await axios.post(`${endpoints.key}/actRuta`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getHorariosAsync(){
    try{
        const response = await axios.get(`${endpoints.key}/verHorarios`)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function actHorarioRuta(data){
    try{
        console.log(data)  
        const response = await axios.post(`${endpoints.key}/actHorarioRuta`, data)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function getHorariosRutasAsync(id){
    try{
        const response = await axios.get(`${endpoints.key}/verRutasHorarios?ID=${id}`)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}

export async function deleteHorarioRutaAsync(id){
    try{
        const response = await axios.delete(`${endpoints.key}/eliminarRutaHorario?ID=${id}`)
        console.log(response)
        return response
    } catch(error){
        return error;
    }
}
