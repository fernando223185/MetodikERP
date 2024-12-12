import { useCallback, useState } from 'react';
import { getClientesAsync, getClienteIDAsync, newActClienteAsync } from 'api/catalogo/clientes/clientes';

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
    const [ isLoading, setIsLoading ] = useState([]);

    const actCliente = useCallback(async ({data}) => {
        setIsLoading(true);
        const result = await newActClienteAsync({data});
        setResult(result);
        setIsLoading(false);
    }, []);

    return { actCliente, result, isLoading }
}