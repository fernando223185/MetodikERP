import { useCallback, useState } from 'react';
import { getSucursalesAsync } from 'api/catalogo/sucursales/sucursales';
import { getSucursalResumen } from 'api/catalogo/sucursales/sucursales';

export const useGetSucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getSucursales = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getSucursalesAsync({ data });
  
      setSucursales(result);
      setIsLoading(false);
    }, []);
  
    return { getSucursales, sucursales, isLoading, setIsLoading };
}

export const useGetSucursalResumen = () => {
    const [sucursalResumen, setSucursalResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getResumen = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getSucursalResumen({ data });
  
      setSucursalResumen(result);
      setIsLoading(false);
    }, []);
  
    return { getResumen, sucursalResumen, isLoading, setIsLoading };
}
