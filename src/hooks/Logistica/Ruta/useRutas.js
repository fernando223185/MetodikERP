import { useCallback, useState } from 'react';
import { getRutaAsync, newRutaAsync } from 'api/logistica/ruta/rutas';

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

export const useNewRuta = () => {
    const [result, setResult] = useState({})    
    const [isLoading, setIsLoading] = useState(false)
    
    const newRuta = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await newRutaAsync({ data });
        setResult(result);
        setIsLoading(false);
      }, [])
    
      return { newRuta, result, isLoading };
}
