import { useCallback, useState } from 'react';
import { getReservaIDAsync, 
        avanzarReservaAsync, 
        getRutaIdaAsync, 
        getRutaVueltaAsync, 
        actReservaDAsync, 
        getReservaDAsync, 
        delRowAsync, 
        getAsientosAsync, 
        agregarAsientoAsync, 
        getPersonaReservaAsync, 
        guardarDatosPersonaAsync, 
        cancelarReservaAsync,
        afectarReservaAsync,
        agregarFormaPagoAsync,
        cambiarSituacionesAsync,
        agregarEquipajeDAsync,
        getEquipajeDAsync,
        actEquipajeDetalleAsync,
        delRowEquipajeAsync } from 'api/comercial/reservas/reservas';

export const useGetReservaID = () => {
  const [reservaId, setReserva] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getReservaID = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getReservaIDAsync({ id });
        setReserva(result); 
        setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getReservaID, reservaId, isLoading, error };
};

export const useAvanzaReserva = () =>{
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const avanzarReserva = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await avanzarReservaAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { avanzarReserva, result, isLoading };
}

export const useGetRutaIda = () => {
  const [rutaIda, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getRutaIda = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getRutaIdaAsync({ id });
      setRuta(result); 
        setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getRutaIda, rutaIda, isLoading, error };
};

export const useGetRutaVuelta = () => {
  const [rutaVuelta, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getRutaVuelta = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getRutaVueltaAsync({ id });
      setRuta(result); 
        setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getRutaVuelta, rutaVuelta, isLoading, error };
};

export const useActReservaD = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const actReservaD = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await actReservaDAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { actReservaD, result, isLoading };
}

export const useGetReservaD = () => {
  const [reservaD, setReserva] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getReservaD = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getReservaDAsync({ id });
      setReserva(result); 
      setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getReservaD, reservaD, isLoading, error };
};

export const useDelRowReservaD = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const delRowReservaD = useCallback(async ({ id, RowID }) => {
      setIsLoading(true);
      const result = await delRowAsync({ id, RowID });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { delRowReservaD, result, isLoading };
} 

export const useGetAsientos = () => {
  const [asientos, setAsientos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getAsientos = useCallback(async ({ data }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getAsientosAsync({ data });
      setAsientos(result); 
      setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getAsientos, asientos, isLoading, error };
};

export const useAgregarAsiento = () =>{
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const agregarAsiento = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await agregarAsientoAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { agregarAsiento, result, isLoading };
}

export const useGetPersonasReserva = () => {
  const [personas, setPersonas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getPersonasReserva = useCallback(async ({ data }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getPersonaReservaAsync({ data });
      setPersonas(result); 
      setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getPersonasReserva, personas, isLoading, error };
};

export const useActDatosPasajero= () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const actDatosAsync = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await guardarDatosPersonaAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { actDatosAsync, result, isLoading };
}

export const useCancelarReserva = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const cancelarReserva = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await cancelarReservaAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { cancelarReserva, result, isLoading };
}

export const useAfectarReserva = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const afectarReserva = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await afectarReservaAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { afectarReserva, result, isLoading };
}

export const useAgregarFormaPago = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const agregarFormaPago = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await agregarFormaPagoAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { agregarFormaPago, result, isLoading };
}

export const useCambiarSituaciones = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const cambiarSituaciones = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await cambiarSituacionesAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { cambiarSituaciones, result, isLoading };
}

export const useGetReservaIDOption = () => {
  const [reservaIdOpti, setReservaOpt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getReservaID = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getReservaIDAsync({ id });
        setReservaOpt(result); 
        setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getReservaID, reservaIdOpti, isLoading, error };
};

export const useAgregarEquipajeD = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const agregarPaqueteriaD = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await agregarEquipajeDAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { agregarPaqueteriaD, result, isLoading };
}

export const useGetEquipajeD = () => {
  const [equipajeD, setReserva] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  
  const getEquipajeD = useCallback(async ({ id }) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); 
    try {
      const result = await getEquipajeDAsync({ id });
      setReserva(result); 
      setError('Failed to fetch reservas');
    } catch (error) {
      setError('An error occurred while fetching reservas');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); 

  return { getEquipajeD, equipajeD, isLoading, error };
};

export const useActEquipajeDetalle = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const actPaqueteriaD = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await actEquipajeDetalleAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { actPaqueteriaD, result, isLoading };
}

export const useDelRowEquipajeD = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const delRowEquipajeD = useCallback(async ({ id, RowID }) => {
      setIsLoading(true);
      const result = await delRowEquipajeAsync({ id, RowID });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { delRowEquipajeD, result, isLoading };
}

