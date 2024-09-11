import { useCallback, useState } from 'react';
import { getDestinosAsync } from 'api/catalogo/destinos/destinos';
import { getDestinoResumen } from 'api/catalogo/destinos/destinos';
import { actDestino } from 'api/catalogo/destinos/destinos';

export const useGetDestinos = () => {
    const [destinos, setDestinos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getDestinos = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getDestinosAsync({ data });
  
      setDestinos(result);
      setIsLoading(false);
    }, []);
  
    return { getDestinos, destinos, isLoading, setIsLoading };
}

export const useGetDestinoResumen = () => {
    const [destinoResumen, setDestinoResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getResumen = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getDestinoResumen({ data });
  
      setDestinoResumen(result);
      setIsLoading(false);
    }, []);
  
    return { getResumen, destinoResumen, isLoading, setIsLoading };
}

export const useActDestino = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const submitDestino = useCallback(async ({data}) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await actDestino({ data });
            setResponse(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { submitDestino, response, error, isLoading };
}
