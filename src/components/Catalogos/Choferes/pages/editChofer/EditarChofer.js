import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, FormikProvider } from 'formik';
import { Button, Row, Col, Spinner, Card } from 'react-bootstrap';
import coverSrc from 'assets/img/illustrations/BannerUser.jpeg';
import avatar from 'assets/img/illustrations/user.jpeg';
import * as Yup from 'yup';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply, faTrash, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useActChoferD, useDelChofer, useGetChoferID } from 'hooks/Catalogos/Choferes/useChoferes';
import ProfileBanner from 'components/Usuarios/ProfileBanner';
import IconButton from 'components/common/IconButton';
import ProfileSettings from './ProfileSettings';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useNavigate } from 'react-router-dom';
import EditChoferesHeader from '../../sections/EditChoferesHeader';

const getInitialValues = (chofer) => {
    const ChoferForm = {
        ID: 0,
        EmpresaID: 1,
        SucursalID: 0,
        EstatusID: 1,
        Nombre: '',
        ProveedorID: 0,
        Observaciones: '',
        VehiculoID: 0
    }

    if (chofer) {
        return _.merge({}, ChoferForm, chofer);
    }
    return ChoferForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Required'),
})

const EditarChofer = () => {
    const { id } = useParams();
    const { getChoferID, chofer, isLoading } = useGetChoferID();
    const { actChoferD, result: resultNew, isLoading: isLoadingNew } = useActChoferD();
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [ estatus, setEstatus ] = useState([]);
    const [ sucursal, setSucursal ] = useState([]);
    const [ vehiculo, setVehiculo ] = useState([]);
    const [ empresa, setEmpresa ] = useState([]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(chofer),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            actChoferD({data: values});

            setTimeout(() => {
                navigate("/catalogo/choferes");
            }, 600)
        },
    });

    useEffect(() => {
        if (id != null && id > 0) {
            getChoferID({ id });
        }
    }, [id]);

    useEffect(() => {
        if (chofer) {
            formik.setValues(getInitialValues(chofer));
        }
    }, [chofer]);

    useEffect(() => {
        if (resultNew && Object.keys(resultNew).length === 0) {
            console.log("resultNew es un array vacío:", resultNew);
          } else if (resultNew && resultNew.status === 200) {
              toast.success(`${resultNew.data[0].Mensaje}`, {
                  theme: 'colored',
              });
          } else if (resultNew) {
              toast.error(`Error al crear el cliente`, {
                  theme: 'colored',
              });
          }
    }, [resultNew]);

    useEffect(() => {
        const fetchEstatus = async () => {
            const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        };
        const fetchVehiculo = async () => {
            const data = { Tipo: 'Vehiculo', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setVehiculo(result);
        };
        const fetchSucursal = async () => {
            const data = { Tipo: 'Sucursal', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setSucursal(result);
        };
        const fetchEmpresa = async () => {
            const data = { Tipo: 'Empresa', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setEmpresa(result);
        };

        fetchEstatus();
        fetchEmpresa();
        fetchSucursal();
        fetchVehiculo();
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

    return(
        <>
            <EditChoferesHeader />
            <ProfileBanner>
                <ProfileBanner.Header
                    coverSrc={coverSrc}
                    avatar={avatar}
                    className='mb-8'
                />
            </ProfileBanner>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Row className='g-3'>
                        <Col lg={12}>
                            <ProfileSettings 
                            formik={formik} 
                            estatus={estatus} 
                            sucursal={sucursal} 
                            vehiculo={vehiculo} 
                            empresa={empresa} 
                            />
                        </Col>
                    </Row>
                </form>
            </FormikProvider>
        </>
    );
};

export default EditarChofer;