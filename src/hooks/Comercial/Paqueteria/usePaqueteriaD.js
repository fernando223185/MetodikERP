import { useCallback, useState } from 'react';
import { getPaqueteriaIDAsync, getArtDisponibleAsync, avanzarPaqueteriaAsync, getPaqueteriaDAsync,
          agregarPaqueteriaDAsync } from 'api/comercial/paqueteria/paqueteria';

export const useGetPaqueteriaID = () => {
    const [paqueteriaId, setPaqueteria] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);  
    
    const getPaqueteriaID = useCallback(async ({ id }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null); 
      try {
        const result = await getPaqueteriaIDAsync({ id });
        setPaqueteria(result); 
          setError('Failed to fetch paqueteria');
      } catch (error) {
        setError('An error occurred while fetching paqueteria');
      } finally {
        setIsLoading(false);
      }
    }, [isLoading]); 
  
    return { getPaqueteriaID, paqueteriaId, isLoading, error };
  };

  export const useGetArtDisponible = () => {
    const [Art, setArt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);  
    
    const getArtDisponible = useCallback(async ({ EmpresaID }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null); 
      try {
        const result = await getArtDisponibleAsync({ EmpresaID });
        setArt(result); 
          setError('Failed to fetch reservas');
      } catch (error) {
        setError('An error occurred while fetching reservas');
      } finally {
        setIsLoading(false);
      }
    }, [isLoading]); 
  
    return { getArtDisponible, Art, isLoading, error };
  };

  export const useAvanzaPaqueteria = () =>{
    const [result, setResult] = useState({})    
    const [isLoading, setIsLoading] = useState(false)
    
    const avanzarPaqueteria = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await avanzarPaqueteriaAsync({ data });
        setResult(result);
        setIsLoading(false);
      }, [])
    
      return { avanzarPaqueteria, result, isLoading };
  }

  export const useGetPaqueteriaD = () => {
    const [paqueteriaD, setReserva] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);  
    
    const getPaqueteriaD = useCallback(async ({ id }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null); 
      try {
        const result = await getPaqueteriaDAsync({ id });
        setReserva(result); 
        setError('Failed to fetch reservas');
      } catch (error) {
        setError('An error occurred while fetching reservas');
      } finally {
        setIsLoading(false);
      }
    }, [isLoading]); 
  
    return { getPaqueteriaD, paqueteriaD, isLoading, error };
  };

  export const useAgregarPaqueteriaD = () => {
    const [result, setResult] = useState({})    
    const [isLoading, setIsLoading] = useState(false)
    
    const agregarPaqueteriaD = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await agregarPaqueteriaDAsync({ data });
        setResult(result);
        setIsLoading(false);
      }, [])
    
      return { agregarPaqueteriaD, result, isLoading };
  }