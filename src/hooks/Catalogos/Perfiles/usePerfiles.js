import { useCallback, useState } from 'react';
import { getProfilesAsync, ActProfilerAsync, getPerfilesByIdAsync } from 'api/catalogo/perfiles/perfiles';


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
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(false)
  
    const actProfiles= useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await ActProfilerAsync({ data });
  
      setTimeout(() => {
        setResult(result);
        setIsLoading(false);
      }, 1_000);
    }, [])
  
    return { actProfiles, result, isLoading };
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
