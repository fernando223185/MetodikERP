import { useCallback, useState } from 'react';
import { getChoferesAsync } from 'api/catalogo/choferes/choferes';
import { getChoferById } from 'api/catalogo/choferes/choferes';

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

export const useGetChoferById = () => {

    const [chofer, setChofer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getChofer = useCallback(async (id) => {
      setIsLoading(true);
      const result = await getChoferById(id);
      setChofer(result.data[0]);
      setIsLoading(false);
    }, []);
  
    return { getChofer, chofer, isLoading, setIsLoading };
  }