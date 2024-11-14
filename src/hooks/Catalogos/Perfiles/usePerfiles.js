import { useCallback, useState } from "react";
import {
  getProfilesAsync,
  ActProfilerAsync,
  getPerfilesByIdAsync,
  getModulosAccesoAsync,
  actModulosAccesoAsync,
  getMenusAccesoAsync,
} from "api/catalogo/perfiles/perfiles";

export const useGetProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProfiles = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await getProfilesAsync({ data });

    setProfiles(result);
    setIsLoading(false);
  }, []);

  return { getProfiles, profiles, isLoading, setIsLoading };
};

export const useActProfil = () => {
  const [result, setResult] = useState({});
  const [isLoadingPerfil, setIsLoading] = useState(false);

  const actProfiles = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await ActProfilerAsync({ data });

    setTimeout(() => {
      setResult(result);
      setIsLoading(false);
    }, 1_000);
  }, []);

  return { actProfiles, result, isLoadingPerfil };
};

export const useGetPerfilID = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPerfilID = useCallback(async (id) => {
    setIsLoading(true);
    const result = await getPerfilesByIdAsync(id);

    setProfiles(result);
    setIsLoading(false);
  }, []);

  return { getPerfilID, profiles, isLoading, setIsLoading };
};

/*export const useGetModulosAcceso = () => {
  const [modulos, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getModulosAcceso = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await getModulosAccesoAsync({ data });
    setModules(result);

    setIsLoading(false);
  }, []);

  return { getModulosAcceso, modulos, isLoading, setIsLoading };
}; */

export const useGetModulosAcceso = () => {
  const [modulos, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getModulosAcceso = useCallback(async ({ data }) => {
    setIsLoading(true);
    try {
      const result = await getModulosAccesoAsync({ data });

      setModules(result.data);

    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getModulosAcceso, modulos, isLoading };
};

export const useActModulosAcceso = () => {
  const [response, setModules] = useState([]);
  const [isLoadingAcc, setIsLoading] = useState(false);
  const actModulosAcceso = useCallback(async ({ data }) => {
    setIsLoading(true);
    try {
      const result = await actModulosAccesoAsync({ data });
      setModules(result);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { actModulosAcceso, response, isLoadingAcc };
};

export const useCrearMenus = () => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const crearmenus = useCallback(async (id) => {
    setIsLoading(true);
    const result = await getMenusAccesoAsync(id);
    setRoutes(result.data);
    setIsLoading(false);
  }, []);

  return { crearmenus, routes, isLoading, setIsLoading };
};