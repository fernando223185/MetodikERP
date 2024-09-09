import { useCallback, useState } from 'react';
import { getReservaIDAsync, avanzarReservaAsync, getRutaIdaAsync, getRutaVueltaAsync } from 'api/comercial/reservas/reservas';

export const useGetReservaID = () => {
  const [reservaId, setReserva] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getReservaID = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getReservaIDAsync({ id });
        setReserva(result); 
        setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getReservaID, reservaId, isLoading, error };
};

export const useAvanzaReserva = () =>{
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const avanzarReserva = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await avanzarReservaAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { avanzarReserva, result, isLoading };
}

export const useGetRutaIda = () => {
  const [rutaIda, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getRutaIda = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getRutaIdaAsync({ id });
      setRuta(result); 
        setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getRutaIda, rutaIda, isLoading, error };
};

export const useGetRutaVuelta = () => {
  const [rutaVuelta, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getRutaVuelta = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getRutaVueltaAsync({ id });
      setRuta(result); 
        setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getRutaVuelta, rutaVuelta, isLoading, error };
};

