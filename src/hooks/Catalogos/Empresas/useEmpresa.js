import { useCallback, useState } from 'react';
import { getEmpresasAsync } from 'api/catalogo/empresas/empresas';
import { getEmpresasResumen } from 'api/catalogo/empresas/empresas';

export const useGetEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getEmpresas = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getEmpresasAsync({ data });
  
      setEmpresas(result);
      setIsLoading(false);
    }, []);
  
    return { getEmpresas, empresas, isLoading, setIsLoading };
}

export const useGetEmpresasResumen = () => {
    const [empresasResumen, setEmpresasResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getResumen = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getEmpresasResumen({ data });
  
      setEmpresasResumen(result);
      setIsLoading(false);
    }, []);
  
    return { getResumen, empresasResumen, isLoading, setIsLoading };
}
