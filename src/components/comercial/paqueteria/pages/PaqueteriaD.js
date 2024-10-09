import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card, Spinner, Form } from 'react-bootstrap';
import InfoCard from '../sections/InfoCard';
import InfoDCard from '../sections/InfoDCard'
import ArtDisponible from '../sections/ArtDisponible'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faReply, faBan, faSave, faChevronLeft, faStar, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetFiltroModulo } from '../../../../hooks/useFiltros'; 
import { toast } from 'react-toastify';
import { useGetPaqueteriaID, useGetArtDisponible, useGetPaqueteriaD, useAfectarPaqueteria, useCancelarPaqueteria, useCambiarSituaciones } from 'hooks/Comercial/Paqueteria/usePaqueteriaD'
import DetalleCard from '../sections/DetalleCard'
import IconButton from 'components/common/IconButton';
import Select from 'react-select';


const PaqueteriaHeader = ({setHasFetched, estatus}) => {
  const { id } = useParams();
  const [showModalSituacion, setShowModalSituacion] = useState(false); 
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [situaciones, setSituaciones] = useState([]); 
  const [selectedSituacion, setSelectedSituacion] = useState(null);
  const { afectarPaqueteria, result: resultAfect, isLoading  } = useAfectarPaqueteria();
  const { cancelarPaqueteria, result, isLoading: isLoadingCancel  } = useCancelarPaqueteria();
  const { cambiarSituaciones, result: situacion, isLoading: isLoadingSit } = useCambiarSituaciones();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleAfectar = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID
    }
    await afectarPaqueteria({ data })
  }

  const handleCancel = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID
    }
    
    await cancelarPaqueteria({ data })
  }

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

  const handleModalCloseSituacion = () => setShowModalSituacion(false);

  const handleSituacionClick = async () => {
    const data = { Tipo: 'Situaciones', PersonaID: 1, Modulo: 'Paqueteria', ModuloID: id};
    const resultFiltro = await getFiltroModulo(data); 
    setSituaciones(resultFiltro); 
    setShowModalSituacion(true); 
  };

  const handleModalSaveSituacion = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID,
      Situacion: selectedSituacion
    }

    await cambiarSituaciones({data})
  };

  const handlePlayClick = async () => {
    handleAfectar(); 
  };

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

  return (
    <>
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Paqueteria Detalle</h2>
            <span className="text-muted">Detalle del Movimiento</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/comercial/paqueteria`}>
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                  title="Regresar"
                >
                  <FontAwesomeIcon icon={faReply} className="me-1" /> Regresar
                </IconButton>
              </Link>
                {isLoading || isLoadingCancel ? (
                  <Spinner animation="border" role="status" className="me-1">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    <IconButton
                        variant="falcon-default"
                        size="sm"
                        className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                        title="Cambiar situación"
                        onClick={handleSituacionClick}
                    >
                        <FontAwesomeIcon icon={faStar} className="me-1" /> Situación
                    </IconButton>

                    <IconButton
                        variant="falcon-primary"
                        size="sm"
                        className="mb-2 mb-sm-0 me-2 d-flex align-items-center" 
                        title="Afectar"
                        onClick={handlePlayClick}
                    >
                        <FontAwesomeIcon icon={faPlay} className="me-1" /> Afectar
                    </IconButton>

                    <IconButton
                        variant="falcon-danger"
                        size="sm"
                        className="mb-2 mb-sm-0 d-flex align-items-center" 
                        title="Cancelar"
                        onClick={handleCancel}
                    >
                        <FontAwesomeIcon icon={faBan} className="me-1" /> Cancelar
                    </IconButton>
                    </>
                )}
            </div>
          </Col>
        </Row>
      </Container>
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

const PaqueteriaD = () => {
  const { id } = useParams();
  const { getPaqueteriaID, paqueteriaId, isLoading, error } = useGetPaqueteriaID();
  const [showArt, setUpdtArt] = useState(false); 
  const [hasFetched, setHasFetched] = useState(false); 
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [clientes, setCte] = useState([]);
  const [formaPago, setFormaPago] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const [rutas, setRutas] = useState([]);
  const { getArtDisponible, Art, isLoading: isLoadingArt } = useGetArtDisponible();
  const { getPaqueteriaD, paqueteriaD, isLoading: isLoadingD } = useGetPaqueteriaD();
  const [updateList, setUpdateList] = useState(false); 


  useEffect(() => {
    if (id != null && id > 0) {
        getPaqueteriaID({ id })
    }
    if(showArt){
        getArtDisponible({ EmpresaID: 1})
    }
  }, [id, hasFetched, showArt, updateList])

  useEffect(() => {

    const fetchMovimientos = async () => {
      const data = { Tipo: 'Movimientos', PersonaID: 1, Modulo: 'Paqueteria' };
      const result = await getFiltroModulo(data);
      setMovimientos(result); 
    };

    const fetchOrigenes = async () => {
      const data = { Tipo: 'Terminales', PersonaID: 1, Modulo: 'Paqueteria' };
      const result = await getFiltroModulo(data);
      setOrigenes(result);
    };

    const fetchRutas = async () => {
      const data = { Tipo: 'Rutas', PersonaID: 1, Modulo: 'Paqueteria' };
      const result = await getFiltroModulo(data);
      setRutas(result);
    };

    const fetchClientes = async () => {
        const data = { Tipo: 'Cliente', PersonaID: 1, Modulo: 'Paqueteria' }
        const result = await getFiltroModulo(data);
        setCte(result);
    }

    const fetchFormaPago = async () => {
        const data = { Tipo: 'FormaDePago', PersonaID: 1, Modulo: 'Paqueteria' }
        const result = await getFiltroModulo(data);
        setFormaPago(result);
    }

    fetchMovimientos(); 
    fetchOrigenes(); 
    fetchClientes();
    fetchFormaPago();
 
  }, []);

  useEffect(() => {
    setTimeout(() => {
        getPaqueteriaD({ id })
      }, 2000)
  }, [id, updateList])

  if (isLoading) {
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
      <PaqueteriaHeader 
      setHasFetched={setHasFetched}
      />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <InfoCard paqueteriaId={paqueteriaId} />
                    </Col>
                    <Col md={8}>
                        <InfoDCard
                          paqueteriaId={paqueteriaId}
                          movimientos={movimientos}
                          isLoading={isLoadingFiltro}
                          origenes={origenes}
                          setHasFetched={setHasFetched} 
                          rutas={rutas}
                          clientes={clientes}
                          formasPago={formaPago}
                          setUpdtArt={setUpdtArt}

                        />
                    </Col>
                </Row>
                {showArt && (
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
                        <DetalleCard
                            paqueteriaD={paqueteriaD}
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

export default PaqueteriaD;
