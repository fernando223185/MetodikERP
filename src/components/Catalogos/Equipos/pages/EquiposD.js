import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card, Spinner, Form, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faReply, faBan, faSave, faChevronLeft, faStar, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetFiltroCatalogo } from '../../../../hooks/useFiltros'; 
import { toast } from 'react-toastify';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { useDelEquipo, useGetEquipoID } from 'hooks/Catalogos/Equipos/useEquipos';
import InfoEquipoDCard from '../sections/infoEquipoDCard';


const EquiposHeader = ({setHasFetched}) => {
    const { id } = useParams();
    const { delEquipo, result, isLoading } = useDelEquipo();
    const navigate = useNavigate();

    const handleCancel = async () => {
        await delEquipo({ id: id });
    }

    useEffect(() => {
        if (result && Object.keys(result).length === 0) {
          console.log("result es un array vacío:", result);
        } else if (result && result.status === 200) {
            console.log(result.data[0].Tipo)
            console.log(result.data[0].Mensaje)
            console.log(result.data[0].Posicion)
            const tipoToast = result.data[0].Tipo;

            if (tipoToast === 'success') {
                toast.success(result.data[0].Mensaje, {
                    theme: 'colored',
                    position: result.data[0].Posicion,
                    icon: <FontAwesomeIcon icon={faCheckCircle} />
                });
            } else if (tipoToast === 'error') {
                toast.error(result.data[0].Mensaje, {
                    theme: 'colored',
                    position: result.data[0].Posicion,
                    icon: <FontAwesomeIcon icon={faExclamationTriangle} />
                });
            } else {
                toast.info(result.data[0].Mensaje, {
                    theme: 'colored',
                    position: result.data[0].Posicion,
                    icon: <FontAwesomeIcon icon={faInfoCircle} />
                });
            }
            setTimeout(() => {
              setHasFetched((prev) => !prev);
              navigate("/catalogo/equipos");
            }, 1000)
        } else if (result) {
            toast.error(`Error al guardar`, {
                theme: 'colored',
                position: 'top-right'
            });
        }
    }, [result])


    return (
        <>
            <Container fluid className="py-3 px-4 border-bottom mb-4">
                <Row className="align-items-center">
                <Col md={8}>
                    <h2 className="mb-0">Equipos Detalle</h2>
                    <span className="text-muted">Editar Equipo</span>
                </Col>
                    <Col md={4} className="text-end">
                    <div className="d-flex justify-content-end align-items-center mt-4">
                    <Link to={`/catalogo/equipos`}>
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
                            <IconButton
                                variant="falcon-danger"
                                size="sm"
                                className="mb-2 mb-sm-0 d-flex align-items-center" 
                                title="Cancelar"
                                onClick={handleCancel}
                            >
                                <FontAwesomeIcon icon={faBan} className="me-1" /> Eliminar
                            </IconButton>
                        </>
                        )}
                    </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


const EquiposD = () => {
    const { id } = useParams();
    const { getEquipoID, equipoId, isLoading, error } = useGetEquipoID();
    const [hasFetched, setHasFetched] = useState(false); 
    const { getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
    const [updateList, setUpdateList] = useState(false); 
    const [estatus, setEstatus] = useState([]);
    const [integrantes, setIntegrantes] = useState([]);

    useEffect(() => {
        const fetchEquipoID = async () => {
            if (id != null && id > 0) {
                await getEquipoID({ id });
            }
        };
        fetchEquipoID();
    }, [id, hasFetched, updateList]);

    console.log(id)

    useEffect(() => {
        const fetchFiltros = async () => {
            const dataEstatus = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Equipos' };
            const resultEstatus = await getFiltroCatalogo(dataEstatus);
            setEstatus(resultEstatus);

            const dataIntegrantes = { Tipo: 'Integrantes', PersonaID: 1, Modulo: 'Equipos' };
            const resultIntegrantes = await getFiltroCatalogo(dataIntegrantes);
            setIntegrantes(resultIntegrantes);
        };
        fetchFiltros();
    }, []);

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
            <EquiposHeader  setHasFetched={setHasFetched}/>
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <Card.Body>
                            <Row>
                                <InfoEquipoDCard equipoID={equipoId} setHasFetched={setHasFetched} estatus={estatus} integrantes={integrantes}/>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default EquiposD;