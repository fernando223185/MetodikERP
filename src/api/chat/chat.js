import axios from 'utils/axios'

export async function getMensagesAsync(data){
    try{
        const response = await axios.post(`leerMensajes`,data)
        return response.data;
    }catch(error){
        console.error('Error fetching mensajes:', error);
        return error;
    }
}

export async function getUsersAsync(){
    try{
        const response = await axios.get(`verUsuarios`)
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error('Error fetching usuarios:', error);
        return error;
    }
}