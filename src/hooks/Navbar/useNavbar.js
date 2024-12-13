import { useCallback, useState } from "react";
import { getEmpresasUsuarioAsync } from "api/navbar/navbar";


export const useGetEmpresasUsuario = () => {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEmpresasUsuario = useCallback(async (PersonaID) => {
    setIsLoading(true);
    const result = await getEmpresasUsuarioAsync(PersonaID);
    setEmpresas(result);
    setIsLoading(false);
  }, []);

  return { getEmpresasUsuario, empresas, isLoading, setIsLoading };
};
