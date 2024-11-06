import { useCallback, useState } from 'react';
import { getEquiposAsync, getEquipoIDAsync, newEquipoAsync, delEquipoAsync } from 'api/catalogo/equipos/equipos';

export const useGetEquipos = () => {
    const [equipos, setEquipos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getEquipos = useCallback(async ({ data }) => {
        if(isLoading) return;

        setIsLoading(true);
        setError(null);
        try {
            const result = await getEquiposAsync({ data });
            if(result.status === 200) {
                setEquipos(result);
            } else {
                setError('Failed to fetch equipos')
            }
        } catch(error) {
            setError('An error ocurred while fetching equipos');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getEquipos, equipos, isLoading, error };
};

export const useGetEquipoID = () => {
    const [equipoId, setEquipo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getEquipoID = useCallback(async ({ id }) => {
        if(isLoading) return;

        setIsLoading(true);
        setError(null);
        try {
            const result = await getEquipoIDAsync({ id });
            setEquipo(result);
            setError('Failed to fetch equipos');
        } catch(error) {
            setError('An error ocurred while fetching equipos');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getEquipoID, equipoId, isLoading, error };
};

export const useActEquipoD = () => {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const actEquipoD = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await newEquipoAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);

    return { actEquipoD, result, isLoading };
};

export const useDelEquipo = () => {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const delEquipo = useCallback(async ({ id }) => {
        setIsLoading(true);
        const result = await delEquipoAsync({ id });
        setResult(result);
        setIsLoading(false);
    }, []);

    return { delEquipo, result, isLoading };
};