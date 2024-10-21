import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Modal,
  Card,
  Spinner,
  Form,
  Dropdown,
} from "react-bootstrap";
import InfoCard from "../sections/InfoCard";
import InfoDCard from "../sections/InfoDCard";
import DetalleRutasCard from "../sections/DetalleRutasCard";
import RutasDisponibles from "../sections/RutasDisponibles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faReply,
  faBan,
  faSave,
  faChevronLeft,
  faStar,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  useGetRutaID,
  useGetRutaD,
  useGetRutaDisp,
  useAfectarRuta /*, useCancelarReserva, useAfectarReserva, useAgregarFormaPago, useCambiarSituaciones*/,
} from "../../../../hooks/Logistica/Ruta/useRutaD";
import { useParams } from "react-router-dom";
import { useGetFiltroModulo } from "../../../../hooks/useFiltros";
import RutaVuelta from "../sections/RutaVuelta";
import { toast } from "react-toastify";
import Select from "react-select";
import ArtDisponible from "../sections/ArtDisponible";
import DetalleCard from "../sections/DetalleCard";
import IconButton from "components/common/IconButton";

const RutasHeader = ({ setHasFetched, estatus, showFormMov }) => {
  const { id } = useParams();
  //const { cancelarReserva, result, isLoading } = useCancelarReserva();
  const {
    afectarRuta,
    result: resultAfect,
    isLoading: isLoadingAfec,
  } = useAfectarRuta();
  //const { agregarFormaPago, result: pago, isLoading: isLoadingPago } = useAgregarFormaPago();
  //const { cambiarSituaciones, result: situacion, isLoading: isLoadingSit } = useCambiarSituaciones();

  const [showModal, setShowModal] = useState(false);
  const [showModalSituacion, setShowModalSituacion] = useState(false);
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [formasPago, setFormasPago] = useState([]);
  const [referencia, setReferencia] = useState("");
  const [situaciones, setSituaciones] = useState([]);
  const [selectedSituacion, setSelectedSituacion] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleCancel = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID,
    };

    //await cancelarReserva({ data })
  };

  const handleAfectar = async () => {
    const data = {
      ID: id,
      UsuarioID: user.ID,
    };

    await afectarRuta({ data });
  };

  const handlePlayClick = async () => {
    handleAfectar();
  };
  useEffect(() => {
    if (resultAfect && Object.keys(resultAfect).length === 0) {
      console.log("resultAfect es un array vacío:", resultAfect);
    } else if (resultAfect && resultAfect.status === 200) {
      toast[resultAfect.data[0].Tipo](`${resultAfect.data[0].Mensaje}`, {
        theme: "colored",
        position: resultAfect.data[0].Posicion,
        icon:
          resultAfect.data[0].Tipo === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : resultAfect.data[0].Tipo === "error" ? (
            <FontAwesomeIcon icon={faExclamationTriangle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          ),
      });
      setTimeout(() => {
        setHasFetched((prev) => !prev);
      }, 1000);
    } else if (resultAfect) {
      toast.error(`Error al afectar`, {
        theme: "colored",
        position: "top-right",
      });
    }
  }, [resultAfect]);

  const handleSituacionClick = async () => {
    const data = { Tipo: "Situaciones", PersonaID: 1, Modulo: "Reservas" };
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
      Referencia: referencia,
    };
    //await agregarFormaPago({data})
  };
  const handleModalSaveSituacion = async () => {
    const data = {
      ID: id,
      Situacion: selectedSituacion,
    };

    //await cambiarSituaciones({data})
  };

  /*
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
  */

  /*
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
  */

  /*
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
  */

  /*
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
  */

  return (
    <>
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Rutas Detalle</h2>
            <span className="text-muted">Detalle del Movimiento</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/logistica/rutas`}>
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                  title="Regresar"
                >
                  <FontAwesomeIcon icon={faReply} className="me-1" /> Regresar
                </IconButton>
              </Link>
              {isLoadingFiltro ? (
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
                    className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                    title="Cancelar"
                    onClick={handleCancel}
                  >
                    <FontAwesomeIcon icon={faBan} className="me-1" /> Cancelar
                  </IconButton>

                  {/* Botón de los tres puntitos con menú desplegable */}
                  <Dropdown
                    align="end"
                    className="btn-reveal-trigger d-inline-block"
                  >
                    <Dropdown.Toggle
                      split
                      variant="falcon-default"
                      size="sm"
                      className="me-2"
                    >
                      <FontAwesomeIcon icon="ellipsis-h" className="fs--2" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="border py-0">
                      <div className="py-2">
                        <Dropdown.Item>Copiar</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">
                          Eliminar
                        </Dropdown.Item>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </div>
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
                  //isLoading={isLoading}
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
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={handleModalSave}
            className="btn btn-outline-primary rounded-pill btn-sm"
          >
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
                  //isLoading={isLoading}
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
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={handleModalSaveSituacion}
            className="btn btn-outline-primary rounded-pill btn-sm"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const RutasD = () => {
  const { id } = useParams();
  const { getRutaID, rutaId, isLoading } = useGetRutaID();
  const [hasFetched, setHasFetched] = useState(false);
  const [showRutas, setUpdtRutas] = useState(false);
  const [showArts, setUpdtArts] = useState(false);

  const [updateList, setUpdateList] = useState(false);

  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [equipos, setEquipo] = useState([]);

  const {
    getRutaDisp,
    rutasDisponibles,
    isLoading: isLoadingRutas,
  } = useGetRutaDisp();
  //const { getRutaVuelta, rutaVuelta, isLoading: isLoadingRutasV } = useGetRutaVuelta();
  const { getRutaD, rutaD, isLoading: isLoadingD } = useGetRutaD();
  const [showDateRegreso, setShowDateRegreso] = useState(true);
  const [showFormMov, setFormMov] = useState(false);

  useEffect(() => {
    const fetchRutaID = async () => {
      if (id != null && id > 0) {
        await getRutaID({ id });
      }
    };
    fetchRutaID();
  }, [id, hasFetched, updateList]);

  useEffect(() => {
    const fetchRutaD = async () => {
      await getRutaD({ id });
    };
    fetchRutaD();
  }, [id, updateList]);

  useEffect(() => {
    const fetchFiltros = async () => {
      const dataMovimientos = {
        Tipo: "Movimientos",
        PersonaID: 1,
        Modulo: "Rutas",
      };
      const resultMovimientos = await getFiltroModulo(dataMovimientos);
      setMovimientos(resultMovimientos);

      const dataVehiculo = { Tipo: "Vehiculos", PersonaID: 1, Modulo: "Rutas" };
      const resultVehiculo = await getFiltroModulo(dataVehiculo);
      setVehiculos(resultVehiculo);

      const dataRutas = { Tipo: "Ruta", PersonaID: 1, Modulo: "Rutas" };
      const resultRutas = await getFiltroModulo(dataRutas);
      setRutas(resultRutas);

      const dataEquipo = { Tipo: "Equipos", PersonaID: 1, Modulo: "Rutas" };
      const resultEquipo = await getFiltroModulo(dataEquipo);
      setEquipo(resultEquipo);
    };
    fetchFiltros();
  }, []);

  useEffect(() => {
    const fetchRutas = async () => {
      if (showRutas && rutaId.Ruta > 0) {
        await getRutaDisp({ id: rutaId.Ruta });
      }
    };
    fetchRutas();
  }, [showRutas, hasFetched]);

  if (isLoading && !showRutas) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          marginTop: "100px",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <RutasHeader
        setHasFetched={setHasFetched}
        estatus={rutaId.Estatus}
        showFormMov={showFormMov}
      />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card style={{ backgroundColor: "transparent", border: "none" }}>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <InfoCard reservaId={rutaId} />
                </Col>
                <Col md={8}>
                  <InfoDCard
                    rutaId={rutaId}
                    movimientos={movimientos}
                    isLoading={isLoadingFiltro}
                    vehiculos={vehiculos}
                    equipos={equipos}
                    setHasFetched={setHasFetched}
                    setUpdtRutas={setUpdtRutas}
                    setShowDateRegreso={setShowDateRegreso}
                    showDateRegreso={showDateRegreso}
                    rutas={rutas}
                    setFormMov={setFormMov}
                    showFormMov={showFormMov}
                    setUpdtArts={setUpdtArts}
                  />
                </Col>
              </Row>
              {showRutas && (
                <>
                  <Row>
                    <Col>
                      <RutasDisponibles
                        rutasDisponibles={rutasDisponibles}
                        setUpdateList={setUpdateList}
                        id={id}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <Row className="mt-4">
                <Col>
                  <DetalleRutasCard
                    rutaD={rutaD}
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

export default RutasD;
