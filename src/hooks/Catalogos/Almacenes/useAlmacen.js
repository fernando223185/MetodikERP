import { useCallback, useState } from 'react';
import { getAlmacenesAsync } from 'api/catalogo/almacenes/almacenes';
import { getAlmacenResumen } from 'api/catalogo/almacenes/almacenes';
import { actAlmacen } from 'api/catalogo/almacenes/almacenes';

export const useGetAlmacenes = () => {
    const [almacenes, setAlmacenes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getAlmacenes = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getAlmacenesAsync({ data });
  
      setAlmacenes(result);
      setIsLoading(false);
    }, []);
  
    return { getAlmacenes, almacenes, isLoading, setIsLoading };
}

export const useGetAlmacenResumen = () => {
    const [almacenResumen, setAlmacenResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getResumen = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getAlmacenResumen({ data });
  
      setAlmacenResumen(result);
      setIsLoading(false);
    }, []);
  
    return { getResumen, almacenResumen, isLoading, setIsLoading };
}

export const useActAlmacen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const submitAlmacen = useCallback(async ({data}) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await actAlmacen({ data });
            setResponse(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { submitAlmacen, response, error, isLoading };
}
