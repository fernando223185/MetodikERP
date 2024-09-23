import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, FormikProvider } from 'formik';
import { Button, Row, Col, Spinner, Card } from 'react-bootstrap';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import ComisionSettings from './ComisionSettings.js'
//import ChangePassword from './ChangePassword';
import coverSrc from 'assets/img/illustrations/BannerUser.jpeg';
import ProfileBanner from '../../../Usuarios/ProfileBanner';
import avatar from 'assets/img/illustrations/user.jpeg';
import { useGetAgenteById } from '../../../../hooks/Catalogos/Agentes/useAgente';
import * as Yup from 'yup';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useActAgentes } from '../../../../hooks/Catalogos/Agentes/useAgente'
import { toast } from 'react-toastify';


const getInitialValues = (agenteId) => {
    const AgenteForm = {
        ID: 0,
        EmpresaID: 1,
        Estatus: 1,
        Nombre: '',
        Correo: '',
        TipoID: '',
        TipoComisionID: '',
        PorcentajeComision: '',
        Cuota: '',
        PorcentajeCuota: '',
        SucursalID: '',
        Telefono: '',
        Puesto: '',
        Notas: ''
    }

    if(agenteId){
        return _.merge({}, AgenteForm, agenteId)
    }
    return AgenteForm
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Required'),
    Puesto: Yup.string().required('Required'),
    Correo: Yup.string().email('Invalid email').required('Required'),
})


const EditarAgente = () => {
    const { id } = useParams();
    const { getAgenteById, agenteId, isLoading } = useGetAgenteById();
    const { actAgentes, result: resultNew, isLoading: isLoadingNew  } = useActAgentes();

    const formik = useFormik({
        initialValues: getInitialValues(agenteId),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            actAgentes({ data: values })
        }
    });

    useEffect(() => {
        if (id != null && id > 0) {
            getAgenteById({ id });
        }
    }, [id]);

    useEffect(() => {
        if (agenteId) {
            formik.setValues(getInitialValues(agenteId));
        }
    }, [agenteId]);

    useEffect(() => {
        if (resultNew && Object.keys(resultNew).length === 0) {
            console.log("resultNew es un array vacío:", resultNew);
        } else if (resultNew && resultNew.status === 200) {
            toast.success(`${resultNew.data[0].Mensaje}`, {
                theme: 'colored',
            });
        } else if (resultNew) {
            toast.error(`Error al crear el agente`, {
                theme: 'colored',
            });
        }
    }, [resultNew]);


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

            <ProfileBanner>
                <ProfileBanner.Header
                    coverSrc={coverSrc}
                    avatar={avatar}
                    className="mb-8"
                />
            </ProfileBanner>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Card className="mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-end">

                                {isLoadingNew ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                        <div>
                                            <Link
                                                to={`/configuration/agentes`}  
                                                className="btn btn-secondary rounded-pill me-1"
                                            >
                                                <FontAwesomeIcon icon={faReply} />
                                            </Link>
                                            <Button variant="primary" type="submit" className="rounded-pill">
                                                <FontAwesomeIcon icon={faSave} />
                                            </Button>
                                        </div>
                                    )}
                            </div>
                        </Card.Body>
                    </Card>
                    <Row className="g-3">
                        <Col lg={8}>
                            <ProfileSettings formik={formik}/>
                        </Col>
                        <Col lg={4}>
                            <div className="sticky-sidebar">
                                <AccountSettings formik={formik} />
                                <ComisionSettings formik={formik} />
                            </div>
                        </Col>
                    </Row>
                </form>
            </FormikProvider>        
        </>
    );
};


export default EditarAgente;
