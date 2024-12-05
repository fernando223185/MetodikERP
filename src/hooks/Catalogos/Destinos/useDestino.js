import { useCallback, useState } from "react";
import {
  actDestinoAsync,
  getDestinosAsync,
  getDestinosIDAsync,
} from "api/catalogo/destinos/destinos";

//datos de la tabla
export const useGetDestinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDestinos = useCallback(
    async ({ data }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);

      try {
        const result = await getDestinosAsync({ data });
        if (result.status === 200) {
          setDestinos(result);
        } else {
          setError("Failed to fetch destinos");
        }
      } catch (error) {
        setError("An error occurred while fetching destinos");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { getDestinos, destinos, isLoading, error };
};

export const useActDestino = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const actDestino = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await actDestinoAsync({ data });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { actDestino, result, isLoading };
};

export const useGetDestinoID = () => {
  const [destinoID, setDestino] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDestinoID = useCallback(
    async ({ id }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await getDestinosIDAsync({ id });
        setDestino(result);
        setError("Failed to fetch destino");
      } catch (error) {
        setError("An error occurred while fetching destino");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { getDestinoID, destinoID, isLoading, error };
};

export const useGetDestinoIDOption = () => {
  const [destinoIdOption, setDestinoOpt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDestinoID = useCallback(
    async ({ id }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await getDestinosIDAsync({ id });
        setDestinoOpt(result);
        setError("Failed to fetch destino");
      } catch (error) {
        setError("An error occurred while fetching destino");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { getDestinoID, destinoIdOption, isLoading, error };
};
