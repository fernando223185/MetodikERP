import { useCallback, useState } from "react";
import {
  getExploradorRutas,
  getExploradorRutasID,
  getParadasRutasExp,
  getExploradorRutasPasajeros,
  getModulosAccesoAsync,
} from "api/Exploradores/Rutas/rutas";

export const useGetExploradorRutas = () => {
  const [rutes, setRutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProfiles = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await getExploradorRutas({ data });

    setRutes(result);
    setIsLoading(false);
  }, []);

  return { getProfiles, rutes, isLoading, setIsLoading };
};

export const useGetExploradorRutasID = (ID) => {
  const [rutesID, setRutesID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(ID);
  const getRutesID = useCallback(async () => {
    setIsLoading(true);
    const result = await getExploradorRutasID(ID);

    setRutesID(result);
    setIsLoading(false);
  }, []);

  return { getRutesID, rutesID, isLoading, setIsLoading };
};

export const useGetParadasRutasExp = (ID) => {
  const [rutes, setRutesID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getParadasRutes = useCallback(async () => {
    setIsLoading(true);
    const result = await getParadasRutasExp(ID);

    setRutesID(result);
    setIsLoading(false);
  }, []);

  return { getParadasRutes, rutes, isLoading, setIsLoading };
};

export const useGetPasajerosRutasExp = (RutaID, ParadaID) => {
  const [rutes, setRutesID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPasajerosRutes = useCallback(async () => {
    setIsLoading(true);
    const result = await getExploradorRutasPasajeros(RutaID, ParadaID);

    setRutesID(result);
    setIsLoading(false);
  }, []);

  return { getPasajerosRutes, rutes, isLoading, setIsLoading };
};

