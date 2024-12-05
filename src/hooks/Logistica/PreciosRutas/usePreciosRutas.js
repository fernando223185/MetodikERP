import { useCallback, useState } from "react";
import {
  getPreciosRutaAsync,
  actPreciosRutasID,
  afectarPreciosRutas,
} from "api/logistica/preciosrutas/preciosrutas";

export const useGetPreciosRuta = () => {
  const [preciosruta, setPreciosRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPreciosRuta = useCallback(async ( { data } ) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await getPreciosRutaAsync({ data });
      if (result.status === 200) {
        setPreciosRuta(result);
      } else {
        setError("Failed to fetch ruta");
      }
    } catch (error) {
      setError("An error occurred while fetching ruta");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return { getPreciosRuta, preciosruta, isLoading, error };
};

export const useActPreciosRuta = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const ActPreciosRuta = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await actPreciosRutasID({ data });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { ActPreciosRuta, result, isLoading };
};

export const useAfectarPreciosRuta = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const AfectarPreciosRuta = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await afectarPreciosRutas({ data });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { AfectarPreciosRuta, result, isLoading };
};