import { useCallback, useState } from 'react';
import { getUsersAsync } from 'api/catalogo/usuarios/usuarios';


export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getUsers = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await getUsersAsync({ data });
  
      setUsers(result);
      setIsLoading(false);
    }, []);
  
    return { getUsers, users, isLoading, setIsLoading };
};
  