import { useCallback, useState } from 'react';
import { getProfilesAsync, ActUsersAsync, getUsersByIdAsync } from 'api/catalogo/perfiles/perfiles';


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

export const useActUsers = () => {
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(false)
  
    const actUsers= useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await ActUsersAsync({ data });
  
      setTimeout(() => {
        setResult(result);
        setIsLoading(false);
      }, 1_000);
    }, [])
  
    return { actUsers, result, isLoading };
};

export const useGetUserById = () => {
    const [userId, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const getUserById = useCallback(async ({ id }) => {
      setIsLoading(true);
      const result = await getUsersByIdAsync({ id });
        console.log("result", result)
      setUsers(result);
      setIsLoading(false);
    }, []);
  
    return { getUserById, userId, isLoading, setIsLoading };
};

