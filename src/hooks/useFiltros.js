import { useState, useCallback } from 'react';
import { getFiltroModuloAsync } from 'api/filtros'; 
import { getFiltroCatalogoAsync } from 'api/filtros';

export const useGetFiltroModulo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFiltroModulo = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getFiltroModuloAsync({data}); 
      if (result.status === 200) {
        return result.data; 
      } else {
        setError('Error al obtener los datos');
        return [];
      }
    } catch (error) {
      setError('Error en la petición');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getFiltroModulo, isLoading, error };
};

export const useGetFiltroCatalogo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFiltroCatalogo = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getFiltroCatalogoAsync({data}); 
      if (result.status === 200) {
        return result.data; 
      } else {
        setError('Error al obtener los datos');
        return [];
      }
    } catch (error) {
      setError('Error en la petición');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getFiltroCatalogo, isLoading, error };
}
