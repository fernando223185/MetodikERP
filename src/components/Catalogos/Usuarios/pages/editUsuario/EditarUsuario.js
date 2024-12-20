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
import { useActUsers, useGetUserById } from 'hooks/Catalogos/Usuarios/useUsuario';
import ProfileBanner from '../../sections/ProfileBanner';
import IconButton from 'components/common/IconButton';
import ProfileSettings from './ProfileSettings';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useNavigate } from 'react-router-dom';
import EditUsuariosHeader from '../../sections/EditUsuariosHeader';
import ChangePassword from 'components/Usuarios/pages/editUser/ChangePassword';
import AccountSettings from 'components/Usuarios/pages/editUser/AccountSettings';

const getInitialValues = (user) => {
    const usuarioForm = {
        PersonaID: 0,
        EmpresaID: 1,
        SucursalID: 0,
        EstatusID: 1,
        Nombre: '',
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        Contra: '',
        Contra2: '',
        MultiEmpresa: 0,
        Usuario: '',
        Correo:'',
        PerfilID: 1,
        Empresas: "",
    };
    return user ? _.merge({}, usuarioForm, user) : usuarioForm;
};


const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Required'),
})

const EditarUsuario = () => {
    const { id } = useParams();
    //const { getChoferID, chofer, isLoading } = useGetChoferID();
    const { getUserById , user, isLoading: isLoadingUser } = useGetUserById();
    const { actUsers, result: resultNew, isLoading: isLoadingNew  } = useActUsers();
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [ estatus, setEstatus ] = useState([]);
    const [ sucursal, setSucursal ] = useState([]);
    const [ empresa, setEmpresa ] = useState([]);
    const [ perfil, setPerfil ] = useState([]);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(user),
        validationSchema,
        enableReinitialize: true,
        onSubmit:  (values) => {
            console.log('values', values);
            actUsers({data: values});
            setTimeout(() => {
            navigate("/catalogo/usuarios");
            }, 600)
        },
    });

    useEffect(() => {
        if (id != null && id > 0) {
            getUserById({ id });
        }
    }, [id]);

    useEffect(() => {
        if (user) {
            formik.setValues(getInitialValues(user));
        }
    }, [user]);

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
        const fetchEmpresa = async () => {
            const data = { Tipo: 'Empresa', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setEmpresa(result);
        };
        
        const fetchPerfil = async () => {
            const data = { Tipo: 'Perfiles', PersonaID: 1, Modulo: 'Usuarios' };
            const result = await getFiltroCatalogo(data);
            setPerfil(result);
        };

        fetchPerfil();
        fetchEstatus();
        fetchEmpresa();
        fetchSucursal();
    }, []);

    if (isLoadingUser || isLoadingFiltro  || isLoadingNew || perfil.length === 0 || estatus.length === 0 || sucursal.length === 0 || empresa.length === 0) {
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
            <EditUsuariosHeader estado={'Nuevo Usuario'}/>
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
                        <Col lg={9}>
                            <ProfileSettings 
                            formik={formik} 
                            estatus={estatus} 
                            sucursal={sucursal}
                            empresa={empresa} 
                            perfil={perfil}
                            />
                        </Col>
                        <Col lg={3}>
                            <div className="sticky-sidebar">
                                <AccountSettings formik={formik}/>
                            </div>
                        </Col>
                    </Row>
                </form>
            </FormikProvider>
        </>
    );
};

export default EditarUsuario;