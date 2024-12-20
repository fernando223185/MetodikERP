import axios from "utils/axios";


export const subirArchivo = async (file, tipo) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipo', tipo);

    try {
        const response = await axios.post(`/Archivos/subirArchivo`, formData);
        return response.data;
    } catch (error) {
        console.error("Error al subir el archivo: ", error);
        throw error.response ? error.response.data : error;
    }
}