import { useCallback, useState } from 'react';
import { getChoferesAsync } from 'api/catalogo/choferes/choferes';

export const useGetChoferes = () => {
    const [choferes, setChoferes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getChoferes = useCallback(async () => {
      setIsLoading(true);
      const result = await getChoferesAsync();
  
      setChoferes(result);
      setIsLoading(false);
    }, []);
  
    return { getChoferes, choferes, isLoading, setIsLoading };
}
