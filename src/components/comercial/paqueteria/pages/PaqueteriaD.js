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
import { useGetPaqueteriaID, useGetArtDisponible, useGetPaqueteriaD } from 'hooks/Comercial/Paqueteria/usePaqueteriaD'
import DetalleCard from '../sections/DetalleCard'


const PaqueteriaHeader = ({setHasFetched, estatus}) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showModalSituacion, setShowModalSituacion] = useState(false); 
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [formasPago, setFormasPago] = useState([]); 
  const [referencia, setReferencia] = useState('');
  const [situaciones, setSituaciones] = useState([]); 
  const [selectedSituacion, setSelectedSituacion] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));



    return (
    <>
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Paqueteria Detalle</h2>
            <span className="text-muted">Detalle del Movimiento</span>
          </Col>
            <Col md={4} className="text-end">
                <Link
                    to={`/comercial/reservas`}  
                    className="btn btn-outline-primary rounded-pill me-1 btn-sm"
                >
                    <FontAwesomeIcon icon={faReply} />
                </Link>

                <button
                    className="btn btn-outline-primary rounded-pill btn-sm me-1"
                    title='Cambiar situacion'
                >
                    <FontAwesomeIcon icon={faStar} />
                </button>
                <button
                    className="btn btn-outline-primary rounded-pill btn-sm me-1"
                    title='Afectar'
                >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button
                    className="btn btn-outline-primary rounded-pill btn-sm"
                    title='Cancelar'
                >
                    <FontAwesomeIcon icon={faBan} />
                </button>

            </Col>
        </Row>
      </Container>

    </>
    );
};

const PaqueteriaD = () => {
  const { id } = useParams();
  const { getPaqueteriaID, paqueteriaId, isLoading, error } = useGetPaqueteriaID();
  const [hasFetched, setHasFetched] = useState(false); 

  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [clientes, setCte] = useState([]);
  const [formaPago, setFormaPago] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [showDateRegreso, setShowDateRegreso] = useState(true);
  const { getArtDisponible, Art, isLoading: isLoadingArt } = useGetArtDisponible();
  const { getPaqueteriaD, paqueteriaD, isLoading: isLoadingD } = useGetPaqueteriaD();
  const [updateList, setUpdateList] = useState(false); 


  useEffect(() => {
    if (id != null && id > 0) {
        getPaqueteriaID({ id })
    }
    getArtDisponible({ EmpresaID: 1})
  }, [id, hasFetched])



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
                        />
                    </Col>
                </Row>

                <Row className='mt-4'>
                  <Col>
                      <ArtDisponible 
                        Art={Art}
                        setUpdateList={setUpdateList}
                        id={id}
                      />
                  </Col>
                </Row> 
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
