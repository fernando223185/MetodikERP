import axios from 'utils/axios'

export const endpoints = {
    key: '/Exploradores'
};

export async function getPaqueteriaRAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/verPaqueteriaR`,data)
        console.log(response)
        return response
    } catch(error) {
        return error
    }
}