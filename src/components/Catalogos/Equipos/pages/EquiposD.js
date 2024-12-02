import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Card, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetFiltroCatalogo } from '../../../../hooks/useFiltros'; 
import IconButton from 'components/common/IconButton';
import InfoEquipoDCard from '../sections/infoEquipoDCard';
import { useActEquipoD, useGetEquipoID } from 'hooks/Catalogos/Equipos/useEquipos';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const getInitialValues = (equipoID) => {
    const initialForm = {
        ID: 0,
        EmpresaID: 1,
        EstatusID: 1,
        Nombre: '',
        Descripcion: '',
        Integrantes: ''
    };

    if(equipoID) {
        return _.merge({}, initialForm, equipoID)
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es obligatorio'),
});

const EquiposHeader = () => {
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
    const { actEquipoD, result: resultNew, isLoading: isLoadingActEquipo } = useActEquipoD();
    const { getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [integrantes, setIntegrantes] = useState([]);
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: getInitialValues(equipoId),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            actEquipoD({data: values});

            setTimeout(() => {
                navigate("/catalogo/equipos");
            }, 600);
        },
    });

    useEffect(() => {
        if (id != null && id > 0) {
            getEquipoID({ id });
        }
    }, [id]);

    useEffect(() => {
        if(equipoId) {
            formik.setValues(getInitialValues(equipoId));
        }
    }, [equipoId]);

    useEffect(() => {
        if (resultNew && Object.keys(resultNew).length === 0) {
            console.log("resultNew es un array vacío:", resultNew);
          } else if (resultNew && resultNew.status === 200) {
              toast.success(`${resultNew.data[0].Mensaje}`, {
                  theme: 'colored',
              });
          } else if (resultNew) {
              toast.error(`Error al crear el equipo`, {
                  theme: 'colored',
              });
          }
    }, [resultNew]);

    useEffect(() => {
        const fetchEstatus = async () => {
            const dataEstatus = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Equipos' };
            const resultEstatus = await getFiltroCatalogo(dataEstatus);
            setEstatus(resultEstatus);
        };

        const fetchIntegrantes = async () => {
            const dataIntegrantes = { Tipo: 'Integrantes', PersonaID: 1, Modulo: 'Equipos' };
            const resultIntegrantes = await getFiltroCatalogo(dataIntegrantes);
            setIntegrantes(resultIntegrantes);
        };

        fetchEstatus();
        fetchIntegrantes();
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
            <EquiposHeader/>
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <Card.Body>
                            <Row>
                                <FormikProvider value={formik}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <InfoEquipoDCard 
                                        formik={formik} 
                                        estatus={estatus} 
                                        integrantes={integrantes}
                                        />
                                    </form>
                                </FormikProvider>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default EquiposD;