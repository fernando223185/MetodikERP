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
        return response.data;
    }catch(error){
        console.error('Error fetching usuarios:', error);
        return error;
    }
}

export async function sendMessageAsync(data){
    try{
        const response = await axios.post(`answer_message`,data)
        console.log('API response : ' + response.data)
        return response.data;
    } catch(error){
        console.error('Error sending message:', error);
        return error;
    }
}

export async function readMessageAsync(data){
    try{
        const response = await axios.post('marcarComoLeido',data)
        console.log(response)
        return response.data 
    } catch(error){
        console.error('Error sending message: ', error);
        return error
    }
}