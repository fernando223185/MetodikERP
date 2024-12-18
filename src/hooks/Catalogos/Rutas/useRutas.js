import { useCallback, useState } from 'react';
import { getRutasAsync, getRutaIDAsync, actRutaAsync, actDescensoRutaAsync, delDescensoRutaAsync } from 'api/catalogo/rutas/rutas';


export const useGetRutas = () => {
    const [ rutas, setRutas ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const getRutas = useCallback(async ({data}) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        try {
            const result = await getRutasAsync({data});
            if (result.status === 200) {
                setRutas(result);
            } else {
                setError("Failed to fetch rutas");
            }
        } catch (error) {
            setError("An error ocurred while fetching rutas");
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getRutas, rutas, isLoading, error };
}

export const useGetRutaID = () => {
    const [ ruta, setRuta ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const getRutaID = useCallback(async ({id}) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        try {
            const result = await getRutaIDAsync({ id });
            setRuta(result);
            setError("Failed to fetch ruta");
        } catch(error) {
            setError("An error ocurred while fetching ruta");
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getRutaID, ruta, isLoading, error };
};

export const useActRuta = () => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const actRuta = useCallback(async ({ data }) => {
        setIsLoading(true);
        try {
            const result = await actRutaAsync({ data });
            setResult(result);
        } catch (error) {
            console.error("Error al guardar la ruta:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { actRuta, result, isLoading };
};

export const useActDescensoRuta = () => {
    const [ result, setResult ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const actDescenso = useCallback(async ({data}) => {
        setIsLoading(true);
        const result = await actDescensoRutaAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);

    return { actDescenso, result, isLoading };
};

export const useDelDescensoRuta = () => {
    const [ result, setResult ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const delDescenso = useCallback(async ({data}) => {
        setIsLoading(true);
        const result = await delDescensoRutaAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);

    return { delDescenso, result, isLoading };
};