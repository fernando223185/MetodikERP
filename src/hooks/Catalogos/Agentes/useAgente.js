import { useCallback, useState } from 'react';
import { getAgentesAsync, ActAgentesAsync, getAgentesByIdAsync } from 'api/catalogo/agentes/agentes';


export const useGetAgentes = () => {
    const [agentes, setAgentes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getAgentes = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getAgentesAsync({ data });
  
      setAgentes(result);
      setIsLoading(false);
    }, []);
  
    return { getAgentes, agentes, isLoading, setIsLoading };
};

export const useActAgentes = () => {
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(false)
  
    const actAgentes = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await ActAgentesAsync({ data });
  
      setTimeout(() => {
        setResult(result);
        setIsLoading(false);
      }, 1_000);
    }, [])
  
    return { actAgentes, result, isLoading };
};

export const useGetAgenteById = () => {
    const [agenteId, setAgentes] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const getAgenteById = useCallback(async ({ id }) => {
      setIsLoading(true);
      const result = await getAgentesByIdAsync({ id });
        console.log("result", result)
      setAgentes(result);
      setIsLoading(false);
    }, []);
  
    return { getAgenteById, agenteId, isLoading, setIsLoading };
};

