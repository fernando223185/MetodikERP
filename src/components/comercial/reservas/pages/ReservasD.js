import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card, Spinner, Form } from 'react-bootstrap';
import InfoCard from '../sections/InfoCard'
import InfoDCard from '../sections/InfoDCard'
import DetalleViajeCard from '../sections/DetalleViajeCard'
import RutaIda from '../sections/RutaIda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faReply, faBan, faSave, faChevronLeft, faStar, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useGetReservaID, useGetRutaIda, useGetRutaVuelta, useGetReservaD, useCancelarReserva, useAfectarReserva, useAgregarFormaPago, useCambiarSituaciones, useGetEquipajeD } from '../../../../hooks/Comercial/Reserva/useReservaD';
import { useParams } from 'react-router-dom';
import { useGetFiltroModulo } from '../../../../hooks/useFiltros'; 
import RutaVuelta from '../sections/RutaVuelta'
import { toast } from 'react-toastify';
import Select from 'react-select';
import ArtDisponible from '../sections/ArtDisponible'
import DetalleCard from '../sections/DetalleCard'; 
import { useGetArtDisponible } from 'hooks/Comercial/Paqueteria/usePaqueteriaD'


const ReservasHeader = ({setHasFetched, estatus}) => {
  const { id } = useParams();
  const { cancelarReserva, result, isLoading } = useCancelarReserva();
  const { afectarReserva, result: resultAfect, isLoading: isLoadingAfec } = useAfectarReserva();
  const { agregarFormaPago, result: pago, isLoading: isLoadingPago } = useAgregarFormaPago();
  const { cambiarSituaciones, result: situacion, isLoading: isLoadingSit } = useCambiarSituaciones();

  const [showModal, setShowModal] = useState(false);
  const [showModalSituacion, setShowModalSituacion] = useState(false); 
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [formasPago, setFormasPago] = useState([]); 
  const [referencia, setReferencia] = useState('');
  const [situaciones, setSituaciones] = useState([]); 
  const [selectedSituacion, setSelectedSituacion] = useState(null);

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
    
    await afectarReserva({ data })
  }

  const handlePlayClick = async () => {
    if (estatus === 'PENDIENTE') {
      const data = { Tipo: 'FormaDePago', PersonaID: 1, Modulo: 'Reservas' };
      const resultFiltro = await getFiltroModulo(data); 
      setFormasPago(resultFiltro)
      setShowModal(true); 
    } else {
      handleAfectar(); 
    }
  };

  const handleSituacionClick = async () => {
    const data = { Tipo: 'Situaciones', PersonaID: 1, Modulo: 'Reservas' };
    const resultFiltro = await getFiltroModulo(data); 
    setSituaciones(resultFiltro); 
    setShowModalSituacion(true); 
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalCloseSituacion = () => setShowModalSituacion(false);

  const handleModalSave = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID,
      FormaPagoID: selectedFormaPago,
      Referencia: referencia
    }
    await agregarFormaPago({data})
  };
  const handleModalSaveSituacion = async () => {
    const data = {
      ID: id,
      Situacion: selectedSituacion
    }

    await cambiarSituaciones({data})
  };

  useEffect(() => {
    if (pago && Object.keys(pago).length === 0) {
      console.log("pago es un array vacío:", pago);
    } else if (pago && pago.status === 200) {
        toast[pago.data[0].Tipo](`${pago.data[0].Mensaje}`, {
            theme: 'colored',
            position: pago.data[0].Posicion,
            icon: pago.data[0].Tipo === 'success' ? 
            <FontAwesomeIcon icon={faCheckCircle} /> : 
            pago.data[0].Tipo === 'error' ? 
            <FontAwesomeIcon icon={faExclamationTriangle} /> : 
            <FontAwesomeIcon icon={faInfoCircle} />
        });
        setTimeout(() => {
          setShowModal(false);
          handleAfectar();
        }, 1000)
    } else if (pago) {
        toast.error(`Error al guardar`, {
            theme: 'colored',
            position: 'top-right'
        });
    }
  },[pago])

  useEffect(() => {
    if (situacion && Object.keys(situacion).length === 0) {
      console.log("situacion es un array vacío:", situacion);
    } else if (situacion && situacion.status === 200) {
        toast[situacion.data[0].Tipo](`${situacion.data[0].Mensaje}`, {
            theme: 'colored',
            position: situacion.data[0].Posicion,
            icon: situacion.data[0].Tipo === 'success' ? 
            <FontAwesomeIcon icon={faCheckCircle} /> : 
            situacion.data[0].Tipo === 'error' ? 
            <FontAwesomeIcon icon={faExclamationTriangle} /> : 
            <FontAwesomeIcon icon={faInfoCircle} />
        });
        setTimeout(() => {
          handleModalCloseSituacion(false);
          setHasFetched((prev) => !prev); 
        }, 1000)
    } else if (situacion) {
        toast.error(`Error al guardar`, {
            theme: 'colored',
            position: 'top-right'
        });
    }
  },[situacion])

  useEffect(() => {
    if (result && Object.keys(result).length === 0) {
      console.log("result es un array vacío:", result);
    } else if (result && result.status === 200) {
        toast[result.data[0].Tipo](`${result.data[0].Mensaje}`, {
            theme: 'colored',
            position: result.data[0].Posicion,
            icon: result.data[0].Tipo === 'success' ? 
            <FontAwesomeIcon icon={faCheckCircle} /> : 
            result.data[0].Tipo === 'error' ? 
            <FontAwesomeIcon icon={faExclamationTriangle} /> : 
            <FontAwesomeIcon icon={faInfoCircle} />
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

  useEffect(() => {
    if (resultAfect && Object.keys(resultAfect).length === 0) {
      console.log("resultAfect es un array vacío:", resultAfect);
    } else if (resultAfect && resultAfect.status === 200) {
        toast[resultAfect.data[0].Tipo](`${resultAfect.data[0].Mensaje}`, {
            theme: 'colored',
            position: resultAfect.data[0].Posicion,
            icon: resultAfect.data[0].Tipo === 'success' ? 
            <FontAwesomeIcon icon={faCheckCircle} /> : 
            resultAfect.data[0].Tipo === 'error' ? 
            <FontAwesomeIcon icon={faExclamationTriangle} /> : 
            <FontAwesomeIcon icon={faInfoCircle} />
        });
        setTimeout(() => {
          setHasFetched((prev) => !prev); 
        }, 1000)
    } else if (resultAfect) {
        toast.error(`Error al guardar`, {
            theme: 'colored',
            position: 'top-right'
        });
    }  
  }, [resultAfect])

    return (
    <>
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
                {isLoading || isLoadingAfec ? (
                  <Spinner animation="border" role="status" className="me-1">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    <button
                      onClick={handleSituacionClick}
                      className="btn btn-outline-primary rounded-pill btn-sm me-1"
                      title='Cambiar situacion'
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </button>
                    <button
                      onClick={handlePlayClick}
                      className="btn btn-outline-primary rounded-pill btn-sm me-1"
                      title='Afectar'
                    >
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline-primary rounded-pill btn-sm"
                      title='Cancelar'
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  </>
                )}

            </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Formas de Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {isLoadingFiltro ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          ) : (
            <Form>
              <Form.Group>
                <Form.Label>Seleccione una forma de pago</Form.Label>
                <Select
                  classNamePrefix="react-select"
                  options={formasPago.map((item) => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={(option) => setSelectedFormaPago(option.value)} 
                  isLoading={isLoading}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Referencia</Form.Label>
                <Form.Control
                  type="text"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)} 
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      <Modal.Footer>
        <button
            className="btn btn-outline-secondary rounded-pill me-1 mb-1 btn-sm"
            onClick={handleModalClose}
        >
            <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
        <button onClick={handleModalSave} className="btn btn-outline-primary rounded-pill btn-sm">
          <FontAwesomeIcon icon={faSave} />
        </button>
      </Modal.Footer>
      </Modal>
      <Modal show={showModalSituacion} onHide={handleModalCloseSituacion}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Situación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoadingFiltro ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          ) : (
            <Form>
              <Form.Group>
                <Form.Label>Seleccione una situación</Form.Label>
                <Select
                  classNamePrefix="react-select"
                  options={situaciones.map((item) => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={(option) => setSelectedSituacion(option.value)} 
                  isLoading={isLoading}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-secondary rounded-pill me-1 mb-1 btn-sm"
            onClick={handleModalCloseSituacion}
          >
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
          <button onClick={handleModalSaveSituacion} className="btn btn-outline-primary rounded-pill btn-sm">
            <FontAwesomeIcon icon={faSave} />
          </button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

const ReservasD = () => {
  const { id } = useParams();
  const { getReservaID, reservaId, isLoading, error } = useGetReservaID();
  const [hasFetched, setHasFetched] = useState(false); 
  const [showRutas, setUpdtRutas] = useState(false); 
  const [showArts, setUpdtArts] = useState(false); 

  const [updateList, setUpdateList] = useState(false); 

  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const [rutas, setRutas] = useState([]);
  const { getRutaIda, rutaIda, isLoading: isLoadingRutas } = useGetRutaIda();
  const { getRutaVuelta, rutaVuelta, isLoading: isLoadingRutasV } = useGetRutaVuelta();
  const { getReservaD, reservaD, isLoading: isLoadingD } = useGetReservaD();
  const [showDateRegreso, setShowDateRegreso] = useState(true);
  const [showFormMov, setFormMov] = useState(false)
  const { getArtDisponible, Art, isLoading: isLoadingArt } = useGetArtDisponible();
  const { getEquipajeD, equipajeD, isLoading: isLoadingEquipaje } = useGetEquipajeD();

  useEffect(() => {
    const fetchReservaID = async () => {
      if (id != null && id > 0) {
        await getReservaID({ id });
      }
    };
    fetchReservaID();
  }, [id, hasFetched, updateList]);


  useEffect(() => {
    const fetchArtAndEquipaje = async () => {
      if (showFormMov) {
        await getArtDisponible({ EmpresaID: 1 });

        const dataReservas = { Tipo: 'Reservas', PersonaID: 1, Modulo: 'Reservas' };
        const resultReservas = await getFiltroModulo(dataReservas);
        setReservas(resultReservas);

        await getEquipajeD({ id });
      }
    };
    fetchArtAndEquipaje();
  }, [showFormMov, updateList]);

  useEffect(() => {
    const fetchRutas = async () => {
      if (showRutas) {
        await getRutaIda({ id });
        if (showDateRegreso) {
          await getRutaVuelta({ id });
        }
      }
    };
    fetchRutas();
  }, [id, showRutas, showDateRegreso, hasFetched]);

  useEffect(() => {
    const fetchReservaD = async () => {
      if(reservaId.Movimiento != "Equipaje")
      {
        await getReservaD({ id });
      }
    };
    fetchReservaD();
  }, [id, updateList]);

  useEffect(() => {
    const fetchFiltros = async () => {
      const dataMovimientos = { Tipo: 'Movimientos', PersonaID: 1, Modulo: 'Reservas' };
      const resultMovimientos = await getFiltroModulo(dataMovimientos);
      setMovimientos(resultMovimientos);

      const dataOrigenes = { Tipo: 'Destinos', PersonaID: 1, Modulo: 'Reservas' };
      const resultOrigenes = await getFiltroModulo(dataOrigenes);
      setOrigenes(resultOrigenes);

      const dataRutas = { Tipo: 'Rutas', PersonaID: 1, Modulo: 'Reservas' };
      const resultRutas = await getFiltroModulo(dataRutas);
      setRutas(resultRutas);
    };
    fetchFiltros();
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
      estatus={reservaId.Estatus}
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
                          rutas={rutas}
                          setFormMov={setFormMov}
                          showFormMov={showFormMov}
                          reservas={reservas}
                          setUpdtArts={setUpdtArts}
                        />
                    </Col>
                </Row>
              {!showFormMov && (
                <>
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
                    {showDateRegreso && !isLoadingRutasV && (
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
                  <Row className="mt-4">
                    <Col>
                      <DetalleViajeCard
                        reservaD={reservaD}
                        setUpdateList={setUpdateList}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {showFormMov && (
                <>
                {showArts && (
                  <>
                    <Row className='mt-4'>
                      <Col>
                        <ArtDisponible
                          Art={Art}
                          setUpdateList={setUpdateList}
                          id={id}
                        />
                      </Col>
                    </Row>
                  </>
                )}
                  <Row>
                    <Col>
                      {isLoadingEquipaje  ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                          </Spinner>
                        </div>
                      ) : (
                        <DetalleCard 
                          equipajeD={equipajeD}
                          setUpdateList={setUpdateList}
                        />
                      )}
                    </Col>
                  </Row>
                </>
              )}
            </Card.Body>
          </Card>        
        </Col>
      </Row>

    </>
  );
};

export default ReservasD;
