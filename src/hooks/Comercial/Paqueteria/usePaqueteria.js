import { useCallback, useState } from 'react';
import { getPaqueteriaAsync, newPaqueteriaAsync } from 'api/comercial/paqueteria/paqueteria';

export const useGetPaqueteria = () => {
  const [paqueteria, setPaqueteria] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getPaqueteria = useCallback(async ({ data }) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getPaqueteriaAsync({ data });
      if (result.status === 200) {
        setPaqueteria(result); 
      } else {
        setError('Failed to fetch reservas');
      }
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getPaqueteria, paqueteria, isLoading, error };
};

export const useNewPaqueteria = () => {
    const [result, setResult] = useState({})    
    const [isLoading, setIsLoading] = useState(false)
    
    const newPaqueteria = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await newPaqueteriaAsync({ data });
        setResult(result);
        setIsLoading(false);
      }, [])
    
      return { newPaqueteria, result, isLoading };
}
