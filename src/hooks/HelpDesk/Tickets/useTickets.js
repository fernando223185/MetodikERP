import { useCallback, useState } from 'react';
import { getTicketsAsync, actTicketAsync } from 'api/HelpDesk/Tickets/Tickets';

export const useGetTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTickets = useCallback(async ({data}) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        
        try{
            const result = await getTicketsAsync({data});
            if (result.status === 200){
                setTickets(result);
            }else{
                setError('Failed to fetch tickets');
            }
        } catch(error) {
            setError('An error occurred while fetching tickets');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return {getTickets,tickets,isLoading,error}
};

export const useActTicket = () => {
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const actTicket = useCallback(async ({data}) => {
        if (isLoading) return;
        const result = await actTicketAsync({data});
        setResult(result)
        setIsLoading(false);
    }, []);
    
    return {actTicket, result, isLoading}
}