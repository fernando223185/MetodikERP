import { useCallback, useState } from 'react';
import { getChoferesAsync, getChoferIDAsync, newChoferAsync, delChoferAsync } from 'api/catalogo/choferes/choferes';

export const useGetChoferes = () => {
    const [choferes, setChoferes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getChoferes = useCallback(async ({data}) => {
        if(isLoading) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const result = await getChoferesAsync({data});
            if (result.status === 200) {
                setChoferes(result);
            } else {
                setError('Failed to fetch choferes');
            }
        } catch(error){
            setError('An error ocurred while fetching choferes');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);
  
    return { getChoferes, choferes, isLoading, error };
};

export const useGetChoferID = () => {
    const [chofer, setChofer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getChoferID = useCallback(async ({ id }) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        try {
            const result = await getChoferIDAsync({ id });
            setChofer(result);
            setError('Failed to fetch choferes');
        } catch (error) {
            setError('An error ocurred while fetching choferes');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getChoferID, chofer, isLoading, error };
};

export const useActChoferD = () => {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const actChoferD = useCallback(async ({data}) => {
        setIsLoading(true);
        const result = await newChoferAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, [])

    return { actChoferD, result, isLoading };
}

export const useDelChofer = () => {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const delChofer = useCallback(async ({id}) => {
        setIsLoading(true);
        const result = await delChoferAsync({id});
        setResult(result);
        setIsLoading(false);
    }, []);

    return { delChofer, result, isLoading };
}