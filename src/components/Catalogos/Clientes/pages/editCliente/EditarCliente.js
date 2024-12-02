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
import { useActCliente, useGetClienteID } from 'hooks/Catalogos/Clientes/useClientes';
import ProfileBanner from 'components/Usuarios/ProfileBanner';
import IconButton from 'components/common/IconButton';
// import ProfileSettings from './ProfileSettings';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useNavigate } from 'react-router-dom';
import EditClientesHeader from '../../sections/EditClientesHeader';
import DatosGenerales from './DatosGenerales';
import Direccion from './Direccion';
import DatosPersonales from './DatosPersonales';
import Facturacion from './Facturacion';
import ReglaNegocio from './ReglaNegocio';

const getInitialValues = (cliente) => {
    const clienteForm = {
        ID: 0,
        EstatusID: 1,
        Cliente: "",
        Nombre: "",
        NombreCorto: "",
        Observaciones: "",
        CodigoPostal: "",
        Direccion: "",
        DireccionNumero: "",
        DireccionNumeroInt: "",
        Delegacion: "",
        Colonia: "",
        Poblacion: "",
        Estado: "",
        Pais: "",
        RFC: "",
        CURP: "",
        Telefonos: "",
        Sexo: "", // drop
        Email: "",
        FechaNacimiento: "",
        usoCFDI: "", //drop
        FormaPago: 1, //drop
        MetodoPago: 1, //drop
        RegimenFiscal: "", //drop
        CreditoLimite: 0.00,
        CreditoCondiciones: "", //drop
        BloquearMorosos: "", //drop
        Descuento: "", //drop
        SucursalEmpresa: 1, // drop
        PedirTono: false,
        PedidosParciales: false,
        VtasConsignacion: false,
        Conciliar: false,
        CreditoEspecial: false,
        CreditoConLimite: false,
        CreditoConDias: false,
        CreditoConCondiciones: false,
        EmpresaID: 1
      };

    if (cliente) {
        return _.merge({}, clienteForm, cliente);
    }
    return clienteForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Required'),
})

const EditarCliente = () => {
    const { id } = useParams();
    const { getClienteID, cliente, isLoading } = useGetClienteID();
    const { actClienteD, result: resultNew, isLoading: isLoadingNew } = useActCliente();
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [ estatus, setEstatus ] = useState([]);
    const [ sucursal, setSucursal ] = useState([]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(cliente),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            actClienteD({data: values});

            setTimeout(() => {
                navigate("/catalogo/clientes");
            }, 600)
        },
    });

    useEffect(() => {
        if (id != null && id > 0) {
            getClienteID({ id });
        }
    }, [id]);

    useEffect(() => {
        if (cliente) {
            formik.setValues(getInitialValues(cliente));
        }
    }, [cliente]);

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
        const fetchSucursal = async () => {
            const data = { Tipo: 'Sucursal', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setSucursal(result);
        };

        fetchEstatus();
        fetchSucursal();
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
            <EditClientesHeader />
            <ProfileBanner>
                <ProfileBanner.Header
                    coverSrc={coverSrc}
                    avatar={avatar}
                    className='mb-8'
                />
            </ProfileBanner>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Row className='g-3 mb-3'>
                        <Col lg={12}>
                            <DatosGenerales 
                                formik={formik}
                                estatus={estatus}
                            />
                        </Col>
                        <Col lg={12}>
                            <Direccion 
                                formik={formik}
                            />
                        </Col>
                        <Col lg={12}>
                            <DatosPersonales 
                                formik={formik}
                            />
                        </Col>
                        <Col lg={12}>
                            <Facturacion 
                                formik={formik}
                            />
                        </Col>
                        <Col lg={12}>
                            <ReglaNegocio 
                                formik={formik}
                            />
                        </Col>
                    </Row>
                </form>
            </FormikProvider>
        </>
    );
};

export default EditarCliente;