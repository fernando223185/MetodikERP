import { useCallback, useState } from 'react';
import { getPaqueteriaEAsync } from 'api/Exploradores/PaqueteriaEntrega/PaqueteriaEntrega';

export const useGetPaqueteriaE = () => {
    const [paqueteriaE, setPaqueteriaE] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPaqueteriaE = useCallback(async ({data}) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try{
            const result = await getPaqueteriaEAsync({data});
            if(result.status === 200){
                setPaqueteriaE(result);
            } else {
                setError('Failed to fetch paqueteria recepcion');
            }
        } catch(error) {
            setError('An error occurred while fetching paqueteria recepcion');
        } finally {
            setIsLoading(false);
        }
    },[isLoading])

    return {getPaqueteriaE, paqueteriaE, isLoading, error};
}