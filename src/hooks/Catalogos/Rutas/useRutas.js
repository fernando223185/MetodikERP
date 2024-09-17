import { useCallback, useState } from 'react';
import { getRutasAsync } from 'api/catalogo/rutas/rutas';
import { getRutasResumen } from 'api/catalogo/rutas/rutas';
import { getHorariosAsync } from 'api/catalogo/rutas/rutas';
import { getHorariosRutasAsync } from 'api/catalogo/rutas/rutas';

export const useGetRutas = () => {
    const [rutas, setRutas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getRutas = useCallback(async () => {
      setIsLoading(true);
      const result = await getRutasAsync();
  
      setRutas(result);
      setIsLoading(false);
    }, []);
  
    return { getRutas, rutas, isLoading, setIsLoading };
}

export const useGetRutasResumen = () => {
    const [rutasResumen, setRutasResumen] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const getResumen = useCallback(async (id) => {
      setIsLoading(true);
      const result = await getRutasResumen(id);
      console.log(result);
      setRutasResumen(result.data[0]);
      setIsLoading(false);
    }, []);
  
    return { getResumen, rutasResumen, isLoading, setIsLoading };
}

export const useGetHorarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHorarios = useCallback(async () => {
      setIsLoading(true);
      try {
          const result = await getHorariosAsync(); // La llamada a la API devuelve dos arrays
          const allHorarios = result.data[0].concat(result.data[1]); // Combina ambos arrays en uno solo
          setHorarios(allHorarios); // Almacena los horarios combinados en el estado
      } catch (error) {
          console.error('Error fetching horarios:', error);
      } finally {
          setIsLoading(false);
      }
  }, []);

  return { getHorarios, horarios, isLoading };
};

export const useGetHorariosRutas = () => {
  const [horariosRutas, setHorariosRutas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHorariosRutas = useCallback(async (id) => {
      setIsLoading(true);
      try {
          const result = await getHorariosRutasAsync(id);
          setHorariosRutas(result.data);
      } catch (error) {
          console.error('Error fetching horarios:', error);
      } finally {
          setIsLoading(false);
      }
  }, []);

  return { getHorariosRutas, horariosRutas, isLoading };
  
}