import { useCallback, useState } from 'react';
import { getPasajerosAsync, actPasajerosAsync, getPasajerosIDAsync } from 'api/catalogo/Pasajeros/pasajeros';

export const useGetPasajeros = () => {
    const [pasajeros, setPasajeros] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPasajeros = useCallback(async ({data}) =>{
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        try{
            const result = await getPasajerosAsync({data});
            if(result.status === 200){
                setPasajeros(result);
            }else { 
                setError('Failed to fetch pasajeros');
            }
        } catch(error) {
            setError('An error occurred while fetching pasajeros');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return {getPasajeros, pasajeros, isLoading, error};
};

export const useActPasajero = () => {
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const actPasajero = useCallback(async ({data}) =>{
        setIsLoading(true);
        const result = await actPasajerosAsync({data});
        setResult(result);
        setIsLoading(false);
    }, [])

    return {actPasajero, result, isLoading};
}

export const useGetPasajeroID = () => {
    const [pasajeroID, setPasajero] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPasajeroID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await getPasajerosIDAsync({id});
                setPasajero(result);
                setError("Failed to fetch pasajeros");
        } catch (error) {
            setError("An error occurred while fetching pasajeros");
        } finally {
            setIsLoading(false);
        }
    },[isLoading]);

    return {getPasajeroID, pasajeroID, isLoading, error};

};

export const useGetPasajerosIDOption = () => {
    const [pasajeroIdOption, setPasajeroOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPasajeroID = useCallback(async ({id})=> {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getPasajerosIDAsync({id});
                setPasajeroOpt(result);
                setError("Failed to fetch pasajeros");
        } catch (error) {
            setError("An error occurred while fetching pasajeros");
        }finally {
            setIsLoading(false);
        }
    },[isLoading]);

    return { getPasajeroID, pasajeroIdOption, isLoading,error};
};