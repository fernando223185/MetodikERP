import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetUserById } from 'hooks/Catalogos/Usuarios/useUsuario';
import { Spinner } from 'react-bootstrap';
import ProfileBanner from './Banner';
import ProfileIntro from './UsuarioProfileIntro';
import Empresas from 'components/Usuarios/pages/viewUser/Empresas';
import PreviewUsuariosHeader from '../../sections/PreviewUsuariosHeader';

const UsuarioProfile = () => {
    const { id } = useParams();
    const { getUserById, user, isLoading, error } = useGetUserById();

    useEffect(() => {
        if (id != null && id > 0) {
            getUserById({ id });
        }

    }, [id]);
    
    if(isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
        );
    }

    return (
        console.log(user),
        <>
            <PreviewUsuariosHeader usuario={user} id={id}/>
            <ProfileBanner usuario={user}/>
            <Row className='g-3 mb-3'>
                <Col lg={8}>
                    <ProfileIntro usuario={user} />
                </Col>
                <Col lg={4}>
                    <div className='sticky-sidebar'>
                        <Empresas />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default UsuarioProfile;