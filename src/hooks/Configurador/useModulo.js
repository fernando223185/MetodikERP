import { useCallback, useState } from 'react';
import { getModulosAsync, actModuloAsync, getModuloIDAsync } from 'api/Configurador/Modulos/Modulos';

export const useGetModulos = () => {
    const [modulos, setModulos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);  

    const getModulos = useCallback(async({data}) => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);

        try{
            const result = await getModulosAsync({data});
            if(result.status === 200){
                setModulos(result);
            } else {
                setError('Failed to fetch modulos');
            }
        } catch(error) {
            setError('An error occurred while fetching modulos');
        } finally{
            setIsLoading(false);
        }
    },[isLoading]);

    return { getModulos, modulos, isLoading, error};
};

export const useActModulo = () => {
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const actModulo = useCallback(async ({data}) => {
        setIsLoading(true);
        const result = await actModuloAsync({data});
        setResult(result);
        setIsLoading(false);
    }, []);
    
    return { actModulo, result, isLoading };
}

export const useGetModuloID = () => {
    const [moduloID, setModulos] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getModuloID = useCallback(async ({id}) => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);

        try{
            const result = await getModuloIDAsync({id});
            setModulos(result);
            setError("Failed to fetch modulos");
        }catch(error){
            setError("An error occurred while fetching modulos");
        }finally{
            setIsLoading(false);
        }
   },[isLoading]);

    return { getModuloID, moduloID, isLoading, error };
}

export const useGetModuloIDOption = () => {
    const [moduloIdOption, setModuloOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getModuloID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await getModuloIDAsync({ id });
            setModuloOpt(result);
        } catch(error) {
            setError("An error occurred while fetching modulos");
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getModuloID, moduloIdOption, isLoading, error };
}