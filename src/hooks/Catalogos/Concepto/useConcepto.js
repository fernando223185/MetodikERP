import { useCallback, useState } from "react";
import { actConceptosAsync, getConceptosAsync, getConceptoIDAsync } from "api/catalogo/Concepto/concepto";

export const useGetConceptos = () => {
    const [conceptos, setConceptos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getConceptos = useCallback(async ({ data }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try {
            const result = await getConceptosAsync({ data });
            if (result.status === 200) {
                setConceptos(result);
            } else {
                setError("Failed to fetch Conceptos");
            }
        } catch (error) {
            setError("an error ocurred while fetching Conceptos");
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getConceptos, conceptos, isLoading, error}
};

export const useActConcepto = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const actConcepto = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await actConceptosAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);

    return{actConcepto, result, isLoading};
}

export const useGetConceptoID = () => {
    const [conceptoID, setConcepto] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getConceptoID = useCallback(async ({ id }) => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getConceptoIDAsync({ id });
            setConcepto(result);
            setError("Failed to fetch concepto");
        }catch(error){
            setError("An error occurred while fetching concepto");
        }finally{
            setIsLoading(false);
        }
    }, [isLoading]);
    
    return { getConceptoID, conceptoID, isLoading, error };
}

export const useGetConceptoIDOption = () => {
    const [conceptoIdOption, setConceptoOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getConceptoID = useCallback(async({id}) => {
        if(isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getConceptoIDAsync({id});
            setConceptoOpt(result);
        } catch(error){
            setError("An error occurred while fetching concepto");
        }finally{
            setIsLoading(false);
        }
    },[isLoading]);

    return { getConceptoID, conceptoIdOption, isLoading, error };
}