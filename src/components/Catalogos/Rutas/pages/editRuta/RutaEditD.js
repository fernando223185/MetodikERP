import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Card, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import IconButton from 'components/common/IconButton';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useActDescensoRuta, useActRuta, useDelDescensoRuta, useGetRutaID } from 'hooks/Catalogos/Rutas/useRutas';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import RutaEditForm from './RutaEditForm';
import TableEditDescensos from '../../tables/TableEditDescensos';

const getInitialValues = (ruta) => {
    const initialForm = {
        ID: 0,
        Ruta: '',
        Zona: '',
        Kms: 0.0,
        Costo: 0.0,
        SucursalID: 0,
        DestinoDID: 0,
        DestinoAID: 0,
        Observaciones: '',
        EstatusID: 1,
        Tiempo: 0.0
    };
    if(ruta) {
        return _.merge({}, initialForm, ruta);
    }
    return initialForm;
}

const getDescensosValues = (id) => {
    const initialForm = {
        RutaID: id,
        DestinoID: 0,
        Tiempo: 0,
        Kilometros: 0,
        PrecioNino: 0,
        PrecioAdulto: 0,
        PrecioInapam: 0
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Ruta: Yup.string().required("Nombre de ruta es obligatorio"),
});

const RutaHeader = () => {
    return (
        <>
            <Container fluid className="py-3 px-4 border-bottom mb-4">
                <Row className="align-items-center">
                <Col md={8}>
                    <h2 className="mb-0">Ruta Detalle</h2>
                    <span className="text-muted">Editar Ruta</span>
                </Col>
                    <Col md={4} className="text-end">
                    <div className="d-flex justify-content-end align-items-center mt-4">
                    <Link to={`/catalogo/rutas`}>
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
};

const RutaEditD = () => {
    const { id } = useParams();
    const { getRutaID, ruta, isLoading, error } = useGetRutaID();
    const { actRuta, result, isLoading: isLoadingActRuta } = useActRuta();
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const { delDescenso, result: resultDelDescenso, isLoading: isLoadingDelDescenso } = useDelDescensoRuta();
    const { actDescenso, result: resultActDescenso, isLoading: isLoadingActDescenso } = useActDescensoRuta();
    const [ estatus, setEstatus ] = useState([]);
    const [ sucursales, setSucursales ] = useState([]);
    const [ destinos, setDestinos ] = useState([]);
    const [ updateList, setUpdateList ] = useState(false);
    const [ descensos, setDescensos ] = useState([]);
    const navigate = useNavigate();

    const handleDeleteDescenso = (RenglonID, RutaID) => {
        setDescensos((prevDescensos) =>
            prevDescensos.filter((item) => item.RenglonID !== RenglonID)
        );
    
        delDescenso({ data: { RenglonID, RutaID } })
            .catch((error) => {
                console.error("Error al eliminar el descenso:", error);
                // Restaurar la lista de `descensos` en caso de error
                toast.error("Error al eliminar el descenso, intenta nuevamente.");
                setDescensos((prevDescensos) => [
                    ...prevDescensos,
                    prevDescensos.find((item) => item.RenglonID === RenglonID)
                ]);
            }
        );
    };

    useEffect(() => {
        if (resultDelDescenso && Object.keys(resultDelDescenso).length === 0) {
          } else if (resultDelDescenso && resultDelDescenso.status === 200) {
              toast.success(`${resultDelDescenso.data[0].Mensaje}`, {
                  theme: 'colored',
              });
          } else if (resultDelDescenso) {
              toast.error(`Error al crear el equipo`, {
                  theme: 'colored',
              });
          }
    }, [resultDelDescenso]);

    useEffect(() => {
        if (resultActDescenso && Object.keys(resultActDescenso).length === 0) {
          } else if (resultActDescenso && resultActDescenso.status === 200) {
              toast.success(`${resultActDescenso.data[0].Mensaje}`, {
                  theme: 'colored',
              });
              getRutaID({id});
          } else if (resultActDescenso) {
              toast.error(`Error al crear el descenso`, {
                  theme: 'colored',
              });
          }
    }, [resultActDescenso, id]);

    const formik = useFormik({
        initialValues: getInitialValues(ruta),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            actRuta({data: values});

            setTimeout(() => {
                navigate("/catalogo/rutas");
            }, 600);
        },
    });

    const formikDescensos = useFormik({
        initialValues: getDescensosValues(id),
        enableReinitialize: true,
        onSubmit: async (values, {resetForm}) => {
            actDescenso({data: values});
            resetForm();
        },
    });

    useEffect(() => {
        if (id != null && id > 0) {
            getRutaID({id});
        }
    }, [id]);

    useEffect(() => {
        if(ruta) {
            formik.setValues(getInitialValues(ruta));
            formikDescensos.setValues(getDescensosValues(id));
        }
    }, [ruta]);

    useEffect(() => {
        if (result && Object.keys(result).length === 0) {
          } else if (result && result.status === 200) {
              toast.success(`${result.data[0].Mensaje}`, {
                  theme: 'colored',
              });
          } else if (result) {
              toast.error(`Error al crear el equipo`, {
                  theme: 'colored',
              });
          }
    }, [result]);

    useEffect(() => {
        if (ruta && ruta.Descensos) {
            try {
                const parsedDescensos = JSON.parse(ruta.Descensos);
                const transformedData = parsedDescensos.map((item) => ({
                    ...item,
                    Acciones:
                        <>
                            {isLoadingDelDescenso ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                            <>
                                <div className="d-flex justify-content-center mt-2">
                                    <IconButton
                                        variant="falcon-danger"
                                        size="sm"
                                        icon={faTrash}
                                        title="Eliminar descenso"
                                        className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                                        onClick={() => handleDeleteDescenso(item.RenglonID, item.RutaID)}
                                    >
                                        Eliminar
                                    </IconButton>
                                </div>
                            </>
                        )}
                    </> 
                }))
                setDescensos(transformedData);
                setUpdateList((prev) => !prev);
            } catch (error) {
                console.error("Error parsing JSON descensos: ", error);
            }
        }
    }, [ruta]);

    useEffect(() => {
        const fetchEstatus = async () => {
            const dataEstatus = { Tipo: "Estatus", PersonaID: 1, Modulo: 'Rutas' };
            const resultEstatus = await getFiltroCatalogo(dataEstatus);
            setEstatus(resultEstatus);
        };
        const fetchSucursales = async () => {
            const dataSucursales = { Tipo: "Sucursales", PersonaID: 1, Modulo: "Rutas" };
            const resultSucursales = await getFiltroCatalogo(dataSucursales);
            setSucursales(resultSucursales);
        };
        const fetchDestinos = async () => {
            const dataDestinos = { Tipo: "Destinos", PersonaID: 1, Modulo: "Rutas" };
            const resultDestinos = await getFiltroCatalogo(dataDestinos);
            setDestinos(resultDestinos);
        };

        fetchEstatus();
        fetchSucursales();
        fetchDestinos();
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    };

    return (
        <>
            <RutaHeader/>
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <Card.Body>
                            <Row>
                                <FormikProvider value={formik}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <RutaEditForm 
                                            formik={formik}
                                            estatus={estatus}
                                            sucursales={sucursales}
                                            destinos={destinos}
                                        />
                                    </form>
                                </FormikProvider>
                                <FormikProvider value={formikDescensos}>
                                    <form onSubmit={formikDescensos.handleSubmit}>
                                        <TableEditDescensos formik={formikDescensos} descensos={descensos} setUpdateList={setUpdateList} destinos={destinos}/>
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

export default RutaEditD;