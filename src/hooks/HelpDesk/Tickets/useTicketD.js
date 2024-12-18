import { useCallback, useState } from 'react';
import { getTicketIDAsync, actTicketAsync,avanzaTicketAsync,reasignarTicketAsync,actComentarioAsync,getComentariosIDAsync, cancelarTicketAsync, subirArchivoAsync } from 'api/HelpDesk/Tickets/Tickets';

export const useGetTicketID = () => {
    const [ticketID, setTicket] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTicketID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        
        try{
            const result = await getTicketIDAsync({ id });
            setTicket(result);
        } catch (error) {
            setError('An error occurred while fetching ticket');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);
    
    return { getTicketID, ticketID, isLoading, error };
}

export const useGetComentariosID = () => {
    const [comentariosID, setComentarios] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getComentariosID = useCallback(async ({ data }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        
        try{
            const result = await getComentariosIDAsync({ data });
            setComentarios(result);
        } catch (error) {
            setError('An error occurred while fetching comments');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);
    
    return { getComentariosID, comentariosID, isLoading, error };
}

export const useGetTicketIDOption = () => {
    const [ticketIdOption, setTicketOpt] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTicketID = useCallback(async ({ id }) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        
        try{
            const result = await getTicketIDAsync({ id });
            setTicketOpt(result);
        } catch (error) {
            setError('An error occurred while fetching ticket options');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);
    
    return { getTicketID, ticketIdOption, isLoading, error };
}

export const useActTicketD = () => {
    const [result, setResult] = useState([]);    
    const [isLoading, setIsLoading] = useState(false)
    

    const actTicketD = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await actTicketAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);
    
    return { actTicketD, result, isLoading };
}

export const useAvanzaTicket = () => {
    const [result, setResult] = useState([]);    
    const [isLoading, setIsLoading] = useState(false)

    const avanzaTicket = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await avanzaTicketAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);
    
    return { avanzaTicket, result, isLoading };
}

export const useReasignarTicket = () => {
    const [result, setResult] = useState([]);    
    const [isLoading, setIsLoading] = useState(false)

    const reasignarTicket = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await reasignarTicketAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);
    
    return { reasignarTicket, result, isLoading };
}

export const useActComentario = () => {
    const [result, setResult] = useState([]);    
    const [isLoading, setIsLoading] = useState(false)

    const actComentario = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await actComentarioAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);

    return { actComentario, result, isLoading };
}

export const useCancelarTicket = () => {
    const [result, setResult] = useState([]);    
    const [isLoading, setIsLoading] = useState(false)

    const cancelarTicket = useCallback(async ({ data }) => {
        setIsLoading(true);
        const result = await cancelarTicketAsync({ data });
        setResult(result);
        setIsLoading(false);
    }, []);
    
    return { cancelarTicket, result, isLoading };
}

export const useSubirArchivo = () => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const subirArchivo = useCallback(async ({ file, tipo }) => {
        if (isLoading) return;  // Evitar llamadas en paralelo
        setIsLoading(true);
        setError(null);

        try {
            const response = await subirArchivoAsync({ file, tipo });
            setResult(response);
            return response; // Importante: retorna la respuesta
        } catch (err) {
            setError('Error al subir el archivo');
            console.error(err);
            // Retorna explícitamente null o lanza el error para controlarlo en el componente llamante
            return null; 
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { subirArchivo, result, isLoading, error };
};




