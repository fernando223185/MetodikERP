import { useCallback, useState } from 'react';
import { getReservasAsync, newReservaAsync } from 'api/comercial/reservas/reservas';

export const useGetReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  // Añadimos control de errores
  
  const getReservas = useCallback(async ({ data }) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getReservasAsync({ data });
      if (result.status === 200) {
        setReservas(result); 
      } else {
        setError('Failed to fetch reservas');
      }
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getReservas, reservas, isLoading, error };
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
