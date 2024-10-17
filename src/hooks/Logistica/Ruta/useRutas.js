import { useCallback, useState } from 'react';
import { getRutaAsync, newReservaAsync } from 'api/logistica/ruta/rutas';

export const useGetRuta = () => {
  const [ruta, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getRuta = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getRutaAsync();
      if (result.status === 200) {
        setRuta(result); 
      } else {
        setError('Failed to fetch ruta');
      }
    } catch (error) {
      setError('An error occurred while fetching ruta');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getRuta, ruta, isLoading, error };
};

export const useNewReserva = () => {
    const [result, setResult] = useState({})    
    const [isLoading, setIsLoading] = useState(false)
    
    const newReserva = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await newReservaAsync({ data });
        setResult(result);
        setIsLoading(false);
      }, [])
    
      return { newReserva, result, isLoading };
}
