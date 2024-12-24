import { useCallback, useState } from "react";
import { actProyectoAsync, getProyectosAsync, getProyectoIDAsync } from "api/catalogo/proyectos/Proyectos";
import { subirArchivoAsync } from "api/HelpDesk/Tickets/Tickets";


export const useGetProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProyectos = useCallback(async ({ data }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try {
            const result = await getProyectosAsync({ data });
            if (result.status === 200) {
                setProyectos(result.data);
            } else {
                setError('Error al obtener los proyectos');
            }
        } catch (error) {
            setError('Error al obtener los proyectos');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return{getProyectos, proyectos, isLoading, error};
}

export const useActProyecto = () => {
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const actProyecto = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await actProyectoAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);

    return { actProyecto, result, isLoading };
}

export const useGetProyectoID = () => {
    const [proyectoID, setProyectoID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProyectoID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        
        try{
            const result = await getProyectoIDAsync({id});
            setProyectoID(result);
            setError(null);
        } catch(error) {
            setError('an Error ocurred while fetching Proyectos');
        } finally {
            setIsLoading(false)
        }
    },[isLoading]);
    
    return { getProyectoID, proyectoID, isLoading, error };
}

export const useGetProyectoIDOption = () => {
    const [proyectoIDOption, setProyectoOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProyectoID = useCallback(async({id}) => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getProyectoIDAsync({id});
                setProyectoOpt(result);
        } catch(error){
            setError('An error occurred while fetching Proyecto')
        }finally{
            setIsLoading(false);
        }
    }, [isLoading])

    return { getProyectoID, proyectoIDOption, isLoading, error };
}

export const useSubirArchivo = () => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const subirArchivo = useCallback(async ({ file, tipo }) => {
        if (isLoading) return;  // Evitar llamadas en paralelo
        setIsLoading(true);
        setError(null);

        try {
            const response = await subirArchivoAsync({ file, tipo });
            setResult(response);
            return response; // Importante: retorna la respuesta
        } catch (err) {
            setError('Error al subir el archivo');
            console.error(err);
            // Retorna explícitamente null o lanza el error para controlarlo en el componente llamante
            return null; 
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { subirArchivo, result, isLoading, error };
};