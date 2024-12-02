import { useCallback, useState } from 'react';
import { getPaqueteriaRAsync } from 'api/Exploradores/PaqueteriaRecepcion/PaqueteriaRecepcion';

export const useGetPaqueteriaR = () => {
    const [paqueteriaR, setPaqueteriaR] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPaqueteriaR = useCallback(async ({data}) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try{
            const result = await getPaqueteriaRAsync({data});
            if(result.status === 200){
                setPaqueteriaR(result);
            } else {
                setError('Failed to fetch paqueteria recepcion');
            }
        } catch(error) {
            setError('An error occurred while fetching paqueteria recepcion');
        } finally {
            setIsLoading(false);
        }
    },[isLoading])

    return {getPaqueteriaR, paqueteriaR, isLoading, error};
}