import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card, Spinner } from 'react-bootstrap';
import InfoCard from '../sections/InfoCard'
import InfoDCard from '../sections/InfoDCard'
import DetalleViajeCard from '../sections/DetalleViajeCard'
import RutaIda from '../sections/RutaIda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faReply, faBan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useGetReservaID, useGetRutaIda, useGetRutaVuelta, useGetReservaD, useCancelarReserva } from '../../../../hooks/Comercial/Reserva/useReservaD';
import { useParams } from 'react-router-dom';
import { useGetFiltroModulo } from '../../../../hooks/useFiltros'; 
import RutaVuelta from '../sections/RutaVuelta'
import { toast } from 'react-toastify';

const ReservasHeader = ({setHasFetched}) => {
  const { id } = useParams();
  const { cancelarReserva, result, isLoading } = useCancelarReserva();
  const user = JSON.parse(localStorage.getItem('user'));


  const handleCancel = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID
    }
    
    await cancelarReserva({ data })
  }

  const handleAfectar = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID
    }
    
    await cancelarReserva({ data })
  }

  useEffect(() => {
    if (result && Object.keys(result).length === 0) {
      console.log("result es un array vacío:", result);
    } else if (result && result.status === 200) {
        toast[result.data[0].Tipo](`${result.data[0].Mensaje}`, {
            theme: 'colored',
            position: result.data[0].Posicion
        });
        setTimeout(() => {
          setHasFetched((prev) => !prev); 
        }, 1000)
    } else if (result) {
        toast.error(`Error al guardar`, {
            theme: 'colored',
            position: 'top-right'
        });
    }  
  }, [result])

    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Reservas Detalle</h2>
            <span className="text-muted">Detalle del Movimiento</span>
          </Col>
            <Col md={4} className="text-end">
                <Link
                    to={`/comercial/reservas`}  
                    className="btn btn-outline-primary rounded-pill me-1 btn-sm"
                >
                    <FontAwesomeIcon icon={faReply} />
                </Link>
                {isLoading ? (
                  <Spinner animation="border" role="status" className="me-1">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    <button onClick={handleAfectar} className="btn btn-outline-primary rounded-pill btn-sm me-1">
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <button onClick={handleCancel} className="btn btn-outline-primary rounded-pill btn-sm">
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  </>
                )}

            </Col>
        </Row>
      </Container>
    );
};

const ReservasD = () => {
  const { id } = useParams();
  const { getReservaID, reservaId, isLoading, error } = useGetReservaID();
  const [hasFetched, setHasFetched] = useState(false); 
  const [showRutas, setUpdtRutas] = useState(false); 
  const [updateList, setUpdateList] = useState(false); 

  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const { getRutaIda, rutaIda, isLoading: isLoadingRutas } = useGetRutaIda();
  const { getRutaVuelta, rutaVuelta, isLoading: isLoadingRutasV } = useGetRutaVuelta();
  const { getReservaD, reservaD, isLoading: isLoadingD } = useGetReservaD();
  const [showDateRegreso, setShowDateRegreso] = useState(true);


  useEffect(() =>{
    if (id != null && id > 0) {
      getReservaID({ id })
    }
  }, [id, hasFetched])

  useEffect(() => {
    if (showRutas) {
      getRutaIda({ id });
      if (showDateRegreso) {
        getRutaVuelta({ id });
      }
    }
  }, [id, showRutas, showDateRegreso]);

  useEffect(() => {
    getReservaD({ id })
  }, [id, updateList])

  useEffect(() => {

    const fetchMovimientos = async () => {
      const data = { Tipo: 'Movimientos', PersonaID: 1, Modulo: 'Reservas' };
      const result = await getFiltroModulo(data);
      setMovimientos(result); 
    };

    const fetchOrigenes = async () => {
      const data = { Tipo: 'Destinos', PersonaID: 1, Modulo: 'Reservas' };
      const result = await getFiltroModulo(data);
      setOrigenes(result);
    };

    fetchMovimientos(); 
    fetchOrigenes();  
  }, []);


  if (isLoading && !showRutas) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <ReservasHeader 
      setHasFetched={setHasFetched}
      />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <InfoCard reservaId={reservaId}/>
                    </Col>
                    <Col md={8}>
                        <InfoDCard
                          reservaId={reservaId}
                          movimientos={movimientos}
                          isLoading={isLoadingFiltro}
                          origenes={origenes}
                          setHasFetched={setHasFetched} 
                          setUpdtRutas={setUpdtRutas}
                          setShowDateRegreso={setShowDateRegreso}
                          showDateRegreso={showDateRegreso}
                        />
                    </Col>
                </Row>
                {showRutas && (
                <>
                  <Row>
                    <Col>
                      <RutaIda
                        rutaIda={rutaIda}
                        setUpdateList={setUpdateList}
                      />
                    </Col>
                  </Row>
                  { showDateRegreso && !isLoadingRutasV &&(                  
                  <Row>
                    <Col>
                      <RutaVuelta
                        rutaVuelta={rutaVuelta}
                        setUpdateList={setUpdateList}
                      />
                    </Col>
                  </Row>
                  )}

                </>
              )}
                <Row className='mt-4'>
                  <Col>
                      <DetalleViajeCard 
                        reservaD={reservaD}
                        setUpdateList={setUpdateList}
                      />
                  </Col>
                </Row>
            </Card.Body>
          </Card>        
        </Col>
      </Row>

    </>
  );
};

export default ReservasD;
