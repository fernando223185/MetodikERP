import { useCallback, useState } from "react";
import {
  getRutaIDAsync,
  getRutaDAsync,
  avanzarRutaAsync,
  getRutaDisAsync,
  agregarParadaDAsync,
  actParadaDAsync,
  delRowAsync,
  afectarRutaAsync
} from "api/logistica/ruta/rutas";

export const useGetRutaID = () => {
  const [rutaId, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRutaID = useCallback(
    async ({ id }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await getRutaIDAsync({ id });
        setRuta(result);
        setError("Failed to fetch ruta");
      } catch (error) {
        setError("An error occurred while fetching ruta");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { getRutaID, rutaId, isLoading, error };
};

export const useGetRutaD = () => {
  const [rutaD, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRutaD = useCallback(
    async ({ id }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await getRutaDAsync({ id });
        setRuta(result);
        setError("Failed to fetch ruta");
      } catch (error) {
        setError("An error occurred while fetching ruta");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { getRutaD, rutaD, isLoading, error };
};

export const useAvanzaRuta = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const avanzarRuta = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await avanzarRutaAsync({ data });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { avanzarRuta, result, isLoading };
};

export const useGetRutaDisp = () => {
  const [rutasDisponibles, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRutaDisp = useCallback(
    async ({ id }) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await getRutaDisAsync({ id });
        setRuta(result);
        setError("Failed to fetch ruta");
      } catch (error) {
        setError("An error occurred while fetching ruta");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { getRutaDisp, rutasDisponibles, isLoading, error };
};
export const useAgregarParadaD = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const agregarParada = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await agregarParadaDAsync({ data });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { agregarParada, result, isLoading };
};

export const useActParadaD = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const actParadaD = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await actParadaDAsync({ data });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { actParadaD, result, isLoading };
};

export const useDelRowParadaD = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const delRowParadaD = useCallback(async ({ id, RowID, UsuarioID }) => {
    setIsLoading(true);
    const result = await delRowAsync({ id, RowID, UsuarioID });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { delRowParadaD, result, isLoading };
};
export const useAfectarRuta = () => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const afectarRuta = useCallback(async ({ data }) => {
    setIsLoading(true);
    const result = await afectarRutaAsync({ data });
    setResult(result);
    setIsLoading(false);
  }, []);

  return { afectarRuta, result, isLoading };
};
/*

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

export const useVerPDF = () => {
  const [result, setResult] = useState({})    
  const [isLoading, setIsLoading] = useState(false)
  
  const verPDF = useCallback(async ({ data }) => {
      setIsLoading(true);
      const result = await verPDFAsync({ data });
      setResult(result);
      setIsLoading(false);
    }, [])
  
    return { verPDF, result, isLoading };
}

*/
