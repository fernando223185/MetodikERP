import { useCallback, useState } from 'react';
import { getIndicadoresAsync } from 'api/indicadores';


export const useGetIndicadores = () => {
    const [indicadores, setIndicadores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getIndicadores = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getIndicadoresAsync({ data });
  
      setIndicadores(result);
      setIsLoading(false);
    }, []);
  
    return { getIndicadores, indicadores, isLoading, setIsLoading };
};



