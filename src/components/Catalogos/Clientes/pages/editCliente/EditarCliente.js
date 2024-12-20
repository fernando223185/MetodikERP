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
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useNavigate } from 'react-router-dom';
import EditClientesHeader from '../../sections/EditClientesHeader';
import DatosGenerales from './DatosGenerales';
import Direccion from './Direccion';
import DatosPersonales from './DatosPersonales';
import Facturacion from './Facturacion';
import ReglaNegocio from './ReglaNegocio';
import Banner from '../viewCliente/Banner';

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
        Estado: "", //drop
        Pais: "", //drop
        RFC: "",
        CURP: "",
        Telefonos: "",
        Sexo: "", // drop R
        Email: "",
        FechaNacimiento: "",
        usoCFDI: "", //drop
        FormaPago: 1, //drop
        MetodoPago: 1, //drop
        RegimenFiscal: "", //drop R
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
        EmpresaID: 1,
        RutaImagenPerfil: cliente?.RutaImagenPerfil || "",
        RutaImagenBanner: cliente?.RutaImagenBanner || "",
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
    const [ regimenFiscal, setRegimenFiscal ] = useState([]);
    const [ sexo, setSexo ] = useState([]);
    const [ formaPago, setFormaPago ] = useState([]);
    const [ cfdi, setCfdi ] = useState([]);
    const [ metodoPago, setMetodoPago ] = useState([]);
    const [ pais, setPais ] = useState([]);
    const [ condicion, setCondicion ] = useState([]);
    const [ bloquearM, setBloquearM ] = useState([]);
    const [ estados, setEstados ] = useState([]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(cliente),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log('Valores enviados:', values); // Debug para verificar los datos
            actClienteD({ data: values });
        
            setTimeout(() => {
                navigate("/catalogo/clientes");
            }, 600);
        },
    });

    useEffect(() => {
        if (id != null && id > 0) {
            getClienteID({ id });
        }
        if (id) {
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
        const fecthRegimenFiscal = async () => {
            const data = { Tipo: 'RegimenFiscal', PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setRegimenFiscal(result);
        }
        const fetchSexo = async () => {
            const data = { Tipo: "Sexo", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setSexo(result);
        }
        const fecthFormaPago = async () => {
            const data = { Tipo: "FormaPago", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setFormaPago(result);
        }
        const fetchCfdi = async () => {
            const data = { Tipo: "CFDI", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setCfdi(result);
        }
        const fetchMetodoPago = async () => {
            const data = { Tipo: "MetodoPago", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setMetodoPago(result);
        }
        const fetchPais = async () => {
            const data = { Tipo: "Pais", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setPais(result);
        }
        const fetchCondicion = async () => {
            const data = { Tipo: "Condicion", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setCondicion(result);
        }
        const fetchBloquearM = async () => {
            const data = { Tipo: "BloquearMor", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setBloquearM(result)
        }
        const fetchEstados = async () => {
            const data = { Tipo: "Estados", PersonaID: 1, Modulo: "Choferes" };
            const result = await getFiltroCatalogo(data);
            setEstados(result);
        }

        fetchEstatus();
        fetchSucursal();
        fecthRegimenFiscal();
        fetchSexo();
        fecthFormaPago();
        fetchCfdi();
        fetchMetodoPago();
        fetchPais();
        fetchCondicion();
        fetchBloquearM();
        fetchEstados();
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
            <Banner 
                cliente={{
                    ...formik.values,
                    RutaImagenPerfil: cliente.RutaImagenPerfil, // Ya debe ser una URL completa
                    RutaImagenBanner: cliente.RutaImagenBanner,
                }} 
                isEditable={true} 
                onBannerUpload={(ruta) => {
                    formik.setFieldValue('RutaImagenBanner', ruta);
                    console.log('RutaImagenBanner actualizada:', ruta); // Debug para confirmar la actualización
                }} 
                onProfileUpload={(ruta) => {
                    formik.setFieldValue('RutaImagenPerfil', ruta);
                    console.log('RutaImagenPerfil actualizada:', ruta); // Debug para confirmar la actualización
                }} 
            />
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
                                pais={pais}
                                estados={estados}
                            />
                        </Col>
                        <Col lg={12}>
                            <DatosPersonales 
                                formik={formik}
                                sexo={sexo}
                            />
                        </Col>
                        <Col lg={12}>
                            <Facturacion 
                                formik={formik}
                                regimen={regimenFiscal}
                                formaPago={formaPago}
                                metodoPago={metodoPago}
                                cfdi={cfdi}
                            />
                        </Col>
                        <Col lg={12}>
                            <ReglaNegocio 
                                formik={formik}
                                condicion={condicion}
                                bloquearM={bloquearM}
                                sucursal={sucursal}
                            />
                        </Col>
                    </Row>
                </form>
            </FormikProvider>
        </>
    );
};

export default EditarCliente;