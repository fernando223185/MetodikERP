import axios from 'utils/axios'

export const endpoints = {
    key: '/Catalogos/Perfiles'
};

export async function getProfilesAsync({data}){
    try{
        const response = await axios.get(`${endpoints.key}/verPerfiles?EstatusID=${data.EstatusID}&EmpresaID=${data.EmpresaID}&SearchText=${data.searchText}`)
        return response
    }catch(error){
        return error;
    }
}

export async function ActProfilerAsync({data}){
    try{
        const response = await axios.post(`${endpoints.key}/actPerfil`, data)
        console.log(response)
        return response
    }catch(error){
        return error;
    }
}

export async function getPerfilesByIdAsync(ID){
    try{
        const response = await axios.get(`${endpoints.key}/verPerfilID?ID=${ID}`)
        console.log(response)
        return response.data[0]
    }catch(error){
        return error;
    }
}

export async function getModulosAccesoAsync({ data }) {
  try {
    const response = await axios.get(
      `${endpoints.key}/verModulosAcceso?PerfilID=${data.PerfilID}&PersonaID=${data.PersonaID}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function actModulosAccesoAsync({ data }) {
  try {
    const response = await axios.post(
      `${endpoints.key}/actAccesosPerfil`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getMenusAccesoAsync(ID) {
  try {
    const response = await axios.get(
      `${endpoints.key}/crearMenus?PersonaID=${ID}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function actModulosFavoritosAsync({ data }) {
  try {
    const response = await axios.post(
      `${endpoints.key}/actModuloFavorito`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}


export async function getAccesosRapidosAsync(PersonaID) {
  try {
    const response = await axios.get(
      `${endpoints.key}/verModulosFavoritos?PersonaID=${PersonaID}`
    );
    return response;
  } catch (error) {
    return error;
  }
}