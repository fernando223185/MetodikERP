import axios from 'utils/axios'

export const endpoints = {
    key: '/Exploradores'
};

export async function getPaqueteriaEAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verPaqueteriaEntrega`,data)
        console.log(response)
        return response
    } catch(error) {
        return error
    }
}