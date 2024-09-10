import { useCallback, useState } from 'react';
import { getVehiculosAsync } from 'api/catalogo/vehiculos/vehiculos';
import { getVehiculoResumen } from 'api/catalogo/vehiculos/vehiculos';
import { actVehiculo } from 'api/catalogo/vehiculos/vehiculos';

export const useGetVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getVehiculos = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getVehiculosAsync({ data });
  
      setVehiculos(result);
      setIsLoading(false);
    }, []);
  
    return { getVehiculos, vehiculos, isLoading, setIsLoading };
}

export const useGetVehiculoResumen = () => {
    const [vehiculoResumen, setVehiculoResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getResumen = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getVehiculoResumen({ data });
  
      setVehiculoResumen(result);
      setIsLoading(false);
    }, []);
  
    return { getResumen, vehiculoResumen, isLoading, setIsLoading };
}

export const useActVehiculo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const submitVehiculo = useCallback(async ({data}) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await actVehiculo({ data });
            setResponse(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { submitVehiculo, response, error, isLoading };
}
