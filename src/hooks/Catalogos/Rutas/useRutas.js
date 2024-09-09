import { useCallback, useState } from 'react';
import { getRutasAsync } from 'api/catalogo/rutas/rutas';
import { getRutasResumen } from 'api/catalogo/rutas/rutas';


export const useGetRutas = () => {
    const [rutas, setRutas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getRutas = useCallback(async () => {
      setIsLoading(true);
      const result = await getRutasAsync();
  
      setRutas(result);
      setIsLoading(false);
    }, []);
  
    return { getRutas, rutas, isLoading, setIsLoading };
}

export const useGetRutasResumen = () => {
    const [rutasResumen, setRutasResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getResumen = useCallback(async ({data}) => {
      setIsLoading(true);
      const result = await getRutasResumen(data);
  
      setRutasResumen(result);
      setIsLoading(false);
    }, []);
  
    return { getResumen, rutasResumen, isLoading, setIsLoading };
}