import { useCallback, useState } from 'react';
import { getSucursalesAsync } from 'api/catalogo/sucursales/sucursales';
import { getSucursalResumen } from 'api/catalogo/sucursales/sucursales';
import { actSucursal } from 'api/catalogo/sucursales/sucursales';

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

export const useActSucursal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const submitSucursal = useCallback(async ({data}) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await actSucursal({ data });
            setResponse(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { submitSucursal, response, error, isLoading };
}
