import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, FormikProvider } from 'formik';
import { Button, Row, Col, Spinner, Card } from 'react-bootstrap';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import ChangePassword from './ChangePassword';
import coverSrc from 'assets/img/illustrations/LogoMetodik_transparent_resized.png';
import ProfileBanner from '../../ProfileBanner';
import avatar from 'assets/img/illustrations/Mo.png';
import { useGetUserById } from '../../../../hooks/Catalogos/Usuarios/useUsuario';
import * as Yup from 'yup';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useActUsers } from '../../../../hooks/Catalogos/Usuarios/useUsuario'
import { toast } from 'react-toastify';


const getInitialValues = (userId) => {
  const UserForm = {
    ID: 0,
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Estatus: 1,
    Usuario: '',
    Correo: '',
    Contra: '',
    Notas: '',
    MultiEmpresa: false,
    LoginUsuario: '',
    EmpresaID: 1,
    Sucursales: '',
    Almacenes: '',
    PerfilID: 1,
    PersonalID: 1,
    ClienteID: 0
  }

  if(userId){
    return _.merge({}, UserForm, userId)
  }
  return UserForm
}


const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Required'),
    ApellidoPaterno: Yup.string().required('Required'),
    Correo: Yup.string().email('Invalid email').required('Required'),
})

const EditarUsuario = () => {
  const { id } = useParams();
  const { getUserById, userId, isLoading } = useGetUserById();
  const { actUsers, result: resultNew, isLoading: isLoadingNew  } = useActUsers();

  const formik = useFormik({
    initialValues: getInitialValues(userId),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      actUsers({ data: values })
    }
  });

  useEffect(() => {
    if (id != null && id > 0) {
      getUserById({ id });
    }
  }, [id]);

  useEffect(() => {
    if (userId) {
      formik.setValues(getInitialValues(userId));
    }
  }, [userId]);

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
                        to={`/configuration/users`}  
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
                <AccountSettings />
                <ChangePassword formik={formik}/>
              </div>
            </Col>
          </Row>
        </form>
      </FormikProvider>
    </>
  );
};

export default EditarUsuario;
