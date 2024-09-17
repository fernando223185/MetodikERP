import { useCallback, useState } from "react";
import {
  getExploradorRutas,
  getExploradorRutasID,
} from "api/Exploradores/Rutas/rutas";

export const useGetExploradorRutas = () => {
  const [rutes, setRutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProfiles = useCallback(async () => {
    setIsLoading(true);
    const result = await getExploradorRutas();

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
