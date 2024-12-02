import axios from "utils/axios";

export const endpoints = {
  key: "/Logistica/PreciosRutas",
};

export async function getPreciosRutaAsync({ data }) {
  try {
    const response = await axios.get(
      `${endpoints.key}/verPreciosRutas?EmpresaID=${data.EmpresaID}&OrigenID=${data.OrigenID}&DestinoID=${data.DestinoID}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching rutas:", error);
    return error;
  }
}

export async function actPreciosRutasID({ data }) {
  try {
    const response = await axios.post(`${endpoints.key}/actPreciosRuta`, data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function afectarPreciosRutas({ data }) {
  try {
    const response = await axios.post(
      `${endpoints.key}/afectarCambioPreciosRuta`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}