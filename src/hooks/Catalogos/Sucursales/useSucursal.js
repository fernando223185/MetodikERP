import { useCallback, useState } from 'react';
import { actSucursalAsync, getSucursalesAsync } from 'api/catalogo/sucursales/sucursales';
import { getSucursalIDAsync } from 'api/catalogo/sucursales/sucursales';

export const useGetSucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getSucursales = useCallback(async ({ data }) => {
      if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try{
        const result = await getSucursalesAsync({ data });
        if(result.status === 200){
            setSucursales(result);
        } else {
            setError('failed to fetch sucursales');
        }
      } catch(error) {
        setError('an error ocurred while fetching sucursales');
      } finally {
        setIsLoading(false);
      }
        
    }, [isLoading]);
  
    return { getSucursales, sucursales, isLoading, error };
}
export const useActSucursal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const actSucursal = useCallback(async ({data}) => {
        setIsLoading(true);
        const result = await actSucursalAsync({data});
        setResult(result);
        setIsLoading(false);
    },[])
    return { actSucursal, result, isLoading}
}

export const useGetSucursalID = () => {
    const [sucursalID, setSucursal] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSucursalID = useCallback(async ({id}) => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getSucursalIDAsync({id});
            setSucursal(result)
            setError("Failed to fetch sucursal");
        } catch(error) {
            setError("An error occurred while fetching sucursal");
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return{getSucursalID, sucursalID, isLoading, error}
}

export const useGetSucursalIDOption = () => {
    const [sucursalIdOption, setSucursalOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSucursalID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null); 
        try {
            const result = await getSucursalIDAsync({ id });
            setSucursalOpt(result);
        } catch (error) {
            setError('Failed to fetch sucursal options');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);
    
    return { getSucursalID, sucursalIdOption, isLoading, error };
}