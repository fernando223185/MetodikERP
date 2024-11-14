import axios from 'utils/axios'

export const endpoints = {
    key: '/Exploradores/Rutas'
};

export async function getExploradorRutas({ data }) {
  try {
    const response = await axios.post(`${endpoints.key}/VerRutasExplorador`, data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getExploradorRutasID(ID){
    try{
        const response = await axios.get(`${endpoints.key}/RutasDetalle?ID=${ID}`)
        return response
    }catch(error){
        return error;
    }
}


export async function getParadasRutasExp(ID) {
  try {
    const response = await axios.get(
      `${endpoints.key}/VerParadasRutasExp?ID=${ID}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function getExploradorRutasPasajeros(RutaID, ParadaID) {
  try {
    const response = await axios.get(
      `${endpoints.key}/verPasajerosRuta?RutaID=${RutaID}&ParadaID=${ParadaID}`
    );
    return response;
  } catch (error) {
    return error;
  }
}
