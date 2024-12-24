import { useCallback, useState } from "react";
import { actDepartamentoAsync,getDepartamentosAsync,getDepartamentoIDAsync } from "api/catalogo/departamentos/Departamentos";

export const useGetDepartamentos = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDepartamentos = useCallback(async ({ data }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try {
            const result = await getDepartamentosAsync({ data });
            if (result.status === 200) {
                setDepartamentos(result);
            } else {
                setError('Failed to fetch departamentos');
            }
        } catch (error) {
            setError('An error occurred while fetching departamentos');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return{getDepartamentos, departamentos, isLoading, error};
}

export const useActDepartamentos = () => {
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const actDepartamento = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await actDepartamentoAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);

    return { actDepartamento, result, isLoading };
}

export const useGetDepartamentosID = () => {
    const [departamentoID, setDepartamento] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDepartamentoID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try {
            const result = await getDepartamentoIDAsync({ id });
            setDepartamento(result);
            setError(null);
        } catch (error) {
            setError('An error occurred while fetching departamento');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getDepartamentoID, departamentoID, isLoading, error };
}

export const useGetDepartamentosIDOption = () => {
    const [departamentoIDOption, setDepartamentoOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDepartamentoID = useCallback(async({id}) => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getDepartamentoIDAsync({id});
                setDepartamentoOpt(result);
        } catch(error){
            setError('An error occurred while fetching departamento')
        }finally{
            setIsLoading(false);
        }
    }, [isLoading])

    return { getDepartamentoID, departamentoIDOption, isLoading, error };
}