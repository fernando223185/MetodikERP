import { useCallback, useState } from 'react';
import { getClientesAsync, getClienteIDAsync, newActClienteAsync, getPaisEstadoAsync } from 'api/catalogo/clientes/clientes';

export const useGetClientes= () => {
    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getClientes = useCallback(async ({data}) => {
        if(isLoading) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const result = await getClientesAsync({data});
            if (result.status === 200) {
                setClientes(result);
            } else {
                setError('Failed to fetch clientes');
            }
        } catch(error){
            setError('An error ocurred while fetching clientes');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);
  
    return { getClientes, clientes, isLoading, error };
};

export const useGetClienteID = () => {
    const [cliente, setCliente] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getClienteID = useCallback(async ({ id }) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        try {
            const result = await getClienteIDAsync({ id });
            setCliente(result);
            setError('Failed to fetch cliente');
        } catch (error) {
            setError('An error ocurred while fetching cliente');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getClienteID, cliente, isLoading, error };
};

export const useActCliente = () => {
    const [ result, setResult ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const actClienteD = useCallback(async ({data}) => {
        setIsLoading(true);
        const result = await newActClienteAsync({data});
        setResult(result);
        setIsLoading(false);
    }, []);

    return { actClienteD, result, isLoading }
}

export const useGetPaisEstado = () => {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPaisEstado = useCallback(async (CodigoPostal) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await getPaisEstadoAsync(CodigoPostal);
            setResult(result);
        } catch (error) {
            console.error("Error fetching pais/estado", error);
            setError("An error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getPaisEstado, result, isLoading, error };
};