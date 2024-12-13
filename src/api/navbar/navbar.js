import axios from "utils/axios";

export const endpoints = {
  key: "/verEmpresasUsuario",
};



export async function getEmpresasUsuarioAsync(PersonaID) {
  try {
    const response = await axios.get(
      `${endpoints.key}?PersonaID=${PersonaID}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
}

