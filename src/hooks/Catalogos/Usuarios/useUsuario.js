import { useCallback, useState } from 'react';
import { getUsuariosAsync, ActUsersAsync, getUsersByIdAsync } from 'api/catalogo/usuarios/usuarios';


export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getUsers = useCallback(async (data) => {
      setIsLoading(true);
      const result = await getUsuariosAsync(data);
      setUsers(result);
      setIsLoading(false);
    }, []);
  
    return { getUsers, users, isLoading, setIsLoading };
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
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const getUserById = useCallback(async ({ id }) => {
      setIsLoading(true);
      const result = await getUsersByIdAsync({ id });
        console.log("result", result)
      setUser(result);
      setIsLoading(false);
    }, []);
  
    return { getUserById, user, isLoading, setIsLoading };
};

