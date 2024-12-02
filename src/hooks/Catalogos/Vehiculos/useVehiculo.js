import { useCallback, useState } from 'react';
import { getVehiculosAsync, actVehiculoAync, getVehiculosIDAsync } from 'api/catalogo/vehiculos/vehiculos';

export const useGetVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getVehiculos = useCallback(async ({data}) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);
        try{
            const result = await getVehiculosAsync({data});
            if(result.status === 200){
                setVehiculos(result);
            }else{
                setError('Failed to fetch vehiculos');
            }
        } catch(error){
            setError('An error occurred while fetching vehiculos');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);
  
    return { getVehiculos, vehiculos, isLoading, error };
}

export const useActVehiculo = () => {
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const actVehiculo = useCallback(async({data}) =>{
        setIsLoading(true);
        const result = await actVehiculoAync({data});
        setResult(result);
        setIsLoading(false);
    },[])

    return{actVehiculo, result, isLoading}
}

export const useGetVehiculoID = () => {
    const [vehiculoID, setVehiculo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVehiculoID = useCallback(async ({ id }) =>{
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getVehiculosIDAsync({id});
              setVehiculo(result);
              setError("failed to fetch vehiculo");
        } catch (error) {
            setError("An error occurred while fetching vehiculo");
        } finally {
            setIsLoading(false);
        }
    },[isLoading]);

    return {getVehiculoID, vehiculoID, isLoading, error};
} 

export const useGetVehiculoIDOption = () => {
    const [vehiculoIdOption, setVehiculoOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVehiculoID = useCallback(async ({id})=> {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getVehiculosIDAsync({id});
                setVehiculoOpt(result);
                setError("Failed to fetch vehiculo");
        }catch(error) {
            setError("An error occurred while fetching vehiculo");
        }finally {
            setIsLoading(false);
        }
    },[isLoading]);

    return {getVehiculoID, vehiculoIdOption, isLoading, error};
};
