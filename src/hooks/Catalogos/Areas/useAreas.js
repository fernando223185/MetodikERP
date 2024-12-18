import { useCallback, useState } from "react";
import { actAreaAsync, getAreasAsync, getAreaIDAsync } from "api/catalogo/areas/areas";

export const useGetAreas = () => {
    const [areas, setAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAreas = useCallback(async ({ data }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try{
            const result = await getAreasAsync({ data });
            if(result.status === 200){
                setAreas(result);
            } else {
                setError('Failed to fetch areas')
            }
        }catch(error){
            setError('An error occurred while fetching areas')
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getAreas, areas, isLoading, error };
}

export const useActAreas = () => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const actArea = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await actAreaAsync({data});
        setResult(result);
        setIsLoading(false);
    },[]);

    return { actArea, result, isLoading };
}

export const useGetAreaID = () => {
    const [areaID, setArea] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAreaID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        
        try{
            const result = await getAreaIDAsync({ id });
            setArea(result);
            setError(null);
        }catch(error){
            setError('An error occurred while fetching area')
        }finally{
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getAreaID, areaID, isLoading, error };
}

export const useGetAreaIDOption = () => {
    const [areaIdOption, setAreaOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAreaID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try{
            const result = await getAreaIDAsync({ id });
            setAreaOpt(result);
        } catch(error){
            setError('An error occurred while fetching area')
        }finally{
            setIsLoading(false);
        }
    }, [isLoading]);

    return { getAreaID, areaIdOption, isLoading, error };
}