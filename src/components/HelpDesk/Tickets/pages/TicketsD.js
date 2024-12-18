import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card, Spinner, Form } from 'react-bootstrap';
import InfoCard from '../sections/InfoCard';
import InfoDCard from '../sections/InfoDCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faReply, faBan,  faStar, faComment, faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAvanzaTicket, useGetTicketID, useReasignarTicket, useActComentario,useGetComentariosID, useCancelarTicket, useSubirArchivo } from 'hooks/HelpDesk/Tickets/useTicketD';
import { useParams } from 'react-router-dom';
import { useGetFiltroModulo } from '../../../../hooks/useFiltros'; 
import { toast } from 'react-toastify';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Button} from 'react-bootstrap';
import ComentariosCard from '../sections/ComentariosCard';

const TicketsHeader = ({ setHasFetched, ticketID, estatus }) => {
  const { id } = useParams();
  const { avanzaTicket, isLoading } = useAvanzaTicket();
  const { reasignarTicket, isLoading: isLoadingReasignar } = useReasignarTicket();
  const { actComentario, isLoading: isLoadingComentario } = useActComentario();
  const { cancelarTicket, isLoading: cancelacion } = useCancelarTicket();
  const { subirArchivo, isLoading: isUploading } = useSubirArchivo();

  const navigate = useNavigate();

  const [showModalAsignar, setShowModalAsignar] = useState(false);
  const [showModalComentario, setShowModalComentario] = useState(false); 
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [selectedPersona, setSelectedPersona] = useState(false);
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  const [comentarios, setComentarios] = useState('');
  const [RutaArchivo, setRutaArchivo] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const handleIniciarTicket = async () => {
    const data = {
      ID: id,
      EstatusID: ticketID.EstatusID,
      PersonaID: user.PersonaID
    };
    try {
      avanzaTicket({ data });
      toast.success('Estatus Actualizado Correctamente');
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (error) {
      toast.error('Error al guardar el concepto');
      console.error("error al guardar los datos ", error);
    }
  };

  const handleAfectarTicket = async () => {
    const data = {
      ID: id,
      EstatusID: ticketID.EstatusID,
      PersonaID: user.PersonaID
    };
    try {
      avanzaTicket({ data });
      toast.success('TICKET AFECTADO Correctamente');
      navigate('/HelpDesk/tickets');
    } catch (error) {
      toast.error('Error al guardar el concepto');
      console.error("error al guardar los datos ", error);
    }
  };

  const handleFileUpload = async () => {
    if (RutaArchivo && RutaArchivo instanceof File) {
      try {
        const response = await subirArchivo({ file: RutaArchivo, tipo: "Comentario" });
        console.log("Respuesta de subirArchivo:", response);

        if (response && response.path) {
          return response.path;
        } else {
          toast.error('Error al subir el archivo');
          return null;
        }
      } catch (error) {
        toast.error('Error al subir el archivo');
        console.error("Error al subir archivo: ", error);
        return null;
      }
    }
    return RutaArchivo; // Si ya es una ruta o está vacío, retornar tal cual.
  };

  const handleactComentario = async () => {
    let finalPath = RutaArchivo;
  
    // Si RutaArchivo es un File, primero subirlo
    if (RutaArchivo && RutaArchivo instanceof File) {
      finalPath = await handleFileUpload();
      if (!finalPath) {
        // Error al subir archivo, salimos de la función
        return;
      }
    }
  
    const data = {
      ID: null,
      Comentario: comentarios,
      TicketID: id,
      RutaArchivo: finalPath || '',
      PersonaID: user.PersonaID,
      EmpresaID: user.EmpresaID
    };
  
    try {
      // Aquí llamamos directamente actComentario sin usar setTimeout
      await actComentario({ data });
      toast.success('Comentario Agregado Correctamente');
      setShowModalComentario(false);
      // Después de que se ejecute correctamente la acción, refrescamos la página
      window.location.reload();
    } catch (error) {
      toast.error('Error al agregar el comentario');
      console.error("error al agregar el comentario ", error);
    }
  };
  

  const handleReasignarTicket = async () => {
    const data = {
      ID: id,
      PersonaID: selectedPersona,
    };
    try {
      reasignarTicket({ data });
      toast.success('Ticket Reasignado Correctamente');
      setShowModalAsignar(false);
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (error) {
      toast.error('Error al reasignar el ticket');
      console.error("error al reasignar el ticket ", error);
    }
  };

  const handleCancelTicket = async () => {
    const data = {
      ID: id,
      PersonaID: user.PersonaID,
    };
    try {
      cancelarTicket({ data });
      toast.success('Ticket Cancelado Correctamente');
      navigate('/HelpDesk/tickets');
    } catch (error) {
      toast.error('Error al cancelar el ticket');
      console.error("error al cancelar el ticket ", error);
    }
  };

  const handleAsignarClick = async () => {
    const data = { Tipo: 'Personas', PersonaID: 1, Modulo: 'Tickets' };
    const resultFiltro = await getFiltroModulo(data);
    setPersonasAsignadas(resultFiltro);
    setShowModalAsignar(true);
  };

  const handleComentarioClick = async () => {
    setShowModalComentario(true);
  };

  const handleModalCloseAsignar = () => setShowModalAsignar(false);
  const handleModalCloseComentario = () => setShowModalComentario(false);

  return (
    <>
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Tickets Detalle</h2>
            <span className="text-muted">Detalle del Ticket</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={'/HelpDesk/tickets'}>
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                  title="Regresar"
                >
                  <FontAwesomeIcon icon={faReply} className="me-1" /> Regresar
                </IconButton>
              </Link>
              {isLoading ? (
                <Spinner animation="border" role="status" className="me-1">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <>
                  {ticketID.Estatus === 'PENDIENTE' && (
                    <IconButton
                      variant="falcon-default"
                      size="sm"
                      className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                      title="Iniciar ticket"
                      onClick={handleIniciarTicket}
                    >
                      <FontAwesomeIcon icon={faStar} className="me-1" /> Iniciar
                    </IconButton>
                  )}

                  {ticketID.Estatus === 'EN PROCESO' && (
                    <IconButton
                      variant="falcon-primary"
                      size="sm"
                      className="mb-2 mb-sm-0 me-2 d-flex align-items-center" 
                      title="Afectar"
                      onClick={handleAfectarTicket}
                    >
                      <FontAwesomeIcon icon={faPlay} className="me-1" /> Afectar
                    </IconButton>
                  )}
                  {(ticketID.Estatus === 'PENDIENTE' || ticketID.Estatus === 'EN PROCESO') && (
                    <IconButton
                      variant="falcon-primary"
                      size="sm"
                      className="mb-2 mb-sm-0 me-2 d-flex align-items-center" 
                      title="Re-Asignar"
                      onClick={handleAsignarClick}
                    >
                      <FontAwesomeIcon icon={faStar} className="me-1" />ReAsignar
                    </IconButton>
                  )}
                  {ticketID.Estatus === 'EN PROCESO' && (
                    <IconButton
                      variant="falcon-primary"
                      size="sm"
                      className="mb-2 mb-sm-0 me-2 d-flex align-items-center" 
                      title="Agregar Comentarios"
                      onClick={handleComentarioClick}
                    >
                      <FontAwesomeIcon icon={faComment} className="me-1" />Comentario
                    </IconButton>
                  )}
                  {(ticketID.Estatus === 'PENDIENTE' || ticketID.Estatus === 'EN PROCESO') && (
                    <IconButton
                      variant="falcon-danger"
                      size="sm"
                      className="mb-2 mb-sm-0 d-flex align-items-center" 
                      title="Cancelar"
                      onClick={handleCancelTicket}
                    >
                      <FontAwesomeIcon icon={faBan} className="me-1" /> Cancelar
                    </IconButton>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModalAsignar} onHide={handleModalCloseAsignar}>
        <Modal.Header closeButton>
          <Modal.Title>Re-Asignar</Modal.Title>
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
                <Form.Label>Seleccione una Persona</Form.Label>
                <Select
                  classNamePrefix="react-select"
                  options={personasAsignadas.map((item) => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={(option) => setSelectedPersona(option.value)} 
                  isLoading={isLoading}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-secondary rounded-pill me-1 mb-1 btn-sm"
            onClick={handleModalCloseAsignar}
          >
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
          <button onClick={handleReasignarTicket} className="btn btn-outline-primary rounded-pill btn-sm">
            <FontAwesomeIcon icon={faSave} />
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalComentario} onHide={handleModalCloseComentario}>
        <Modal.Header closeButton>
          <Modal.Title>Comentario</Modal.Title>
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
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  type="text"
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="formArchivo" className="mt-3">
                <Form.Label>Archivo</Form.Label>
                <InputGroup>
                  {!RutaArchivo || (RutaArchivo instanceof File) ? (
                    <Form.Control
                      type="file"
                      placeholder="Seleccione un archivo"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if(file) setRutaArchivo(file);
                      }}
                    />
                  ) : (
                    // Si RutaArchivo es un string (ya subido)
                    <div className="d-flex align-items-center">
                      <span className="me-3">{RutaArchivo}</span>
                      <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => {
                          document.querySelector('#formArchivo input[type="file"]').click();
                        }}
                      >
                        Cambiar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setRutaArchivo('');
                        }}
                      >
                        Quitar archivo
                      </Button>
                    </div>
                  )}
                </InputGroup>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-secondary rounded-pill me-1 mb-1 btn-sm"
            onClick={handleModalCloseComentario}
          >
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
          <button onClick={handleactComentario} className="btn btn-outline-primary rounded-pill btn-sm">
            <FontAwesomeIcon icon={faSave} />
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const TicketsD = () => {
    const { id } = useParams();
    const {getTicketID, ticketID, isLoading, error} = useGetTicketID();
    const {getComentariosID, comentariosID, isLoading:isLoadingComentarios, error:errorcomentarios} = useGetComentariosID();


    const [hasFetched, setHasFetched] = useState(false); 


    const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
    const [estatus, setEstatus] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [areas, setAreas] = useState([]);
    const [prioridad, setPrioridad] = useState([]);
    const [conceptos, setConceptos] = useState([]);

    useEffect(() => {
        const fetchTicketID = async () => {
            if (id!= null && id>0) {
              await getTicketID({id})
            }
        };
        fetchTicketID();
    },[id, hasFetched])

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const data ={
        ID: id,
        EmpresaID: user.EmpresaID
      };

      getComentariosID({data});
    },[]);


    useEffect(() => {
        const fetchEstatus = async () => {
        const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Tickets' };
        const result = await getFiltroModulo(data);
        setEstatus(result); 
        }
        const fetchAreas = async () => {
        const data = { Tipo: 'Areas', PersonaID: 1, Modulo: 'Tickets' };
        const result = await getFiltroModulo(data);
        setAreas(result);
        }
        const fetchPrioridad = async () => {
        const data = { Tipo: 'Prioridad', PersonaID: 1, Modulo: 'Tickets' };
        const result = await getFiltroModulo(data);
        setPrioridad(result);
        }
        const fetchConceptos = async () => {
            const data = { Tipo: 'Conceptos', PersonaID: 1, Modulo: 'Tickets' };
            const result = await getFiltroModulo(data);
            setConceptos(result);
        }
        const fetchPersonas = async () => {
          const data = { Tipo: 'Personas', PersonaID: 1, Modulo: 'Tickets' };
          const result = await getFiltroModulo(data);
          setPersonas(result);
        }
        fetchPersonas();
        fetchConceptos();
        fetchAreas();
        fetchPrioridad();
        fetchEstatus();
    },[]);

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
          <TicketsHeader 
          setHasFetched={setHasFetched}
          ticketID={ticketID}
          personas={personas}
          />
          <Row className="g-3 mb-3">
            <Col lg={12}>
              <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <InfoCard ticketID={ticketID}/>
                        </Col>
                        <Col md={8}>
                            <InfoDCard
                              ticketID={ticketID}
                              isLoading={isLoading}
                              setHasFetched={setHasFetched} 
                              estatus={estatus}
                              personas={personas}
                              areas={areas}
                              prioridad={prioridad}
                              conceptos={conceptos}
                            />
                        </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ComentariosCard
                          comentariosID={comentariosID}
                        />
                      </Col>
                    </Row>
                </Card.Body>
              </Card>        
            </Col>
          </Row>
    
        </>
      );

}
export default TicketsD;