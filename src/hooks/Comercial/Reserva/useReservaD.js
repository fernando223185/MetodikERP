import { useCallback, useState } from 'react';
import { getReservaIDAsync, avanzarReservaAsync, getRutaIdaAsync, getRutaVueltaAsync, actReservaDAsync, getReservaDAsync, delRowAsync } from 'api/comercial/reservas/reservas';

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

export const useActReservaD = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const actReservaD = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await actReservaDAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { actReservaD, result, isLoading };
}

export const useGetReservaD = () => {
  const [reservaD, setReserva] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getReservaD = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getReservaDAsync({ id });
      setReserva(result); 
      setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getReservaD, reservaD, isLoading, error };
};

export const useDelRowReservaD = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const delRowReservaD = useCallback(async ({ id, RowID }) => {
      setIsLoading(true);
      const result = await delRowAsync({ id, RowID });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { delRowReservaD, result, isLoading };
}

