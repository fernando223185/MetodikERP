import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetClienteID } from 'hooks/Catalogos/Clientes/useClientes';
import { Spinner } from 'react-bootstrap';
import ProfileBanner from './Banner';
import ProfileIntro from './DatosGenerales';
import Empresas from 'components/Usuarios/pages/viewUser/Empresas';
import PreviewClientesHeader from '../../sections/PreviewClientesHeader';
import Direccion from './Direccion';
import DatosPersonales from './DatosPersonales';
import Facturacion from './Facturacion';
import ReglaNegocio from './ReglaNegocio';
import Banner from './Banner';

const ClienteProfile = () => {
    const { id } = useParams();
    const { getClienteID, cliente, isLoading, error } = useGetClienteID();

    useEffect(() => {
        if (id != null && id > 0) {
            getClienteID({ id });
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
        <>
            <PreviewClientesHeader cliente={cliente}/>
            <Banner cliente={cliente} isEditable={false}/>
            <Row className='g-3 mb-3'>
                <Col lg={8}>
                    <ProfileIntro cliente={cliente} />
                </Col>
                <Col lg={4}>
                    <div className='sticky-sidebar'>
                        <Empresas />
                    </div>
                </Col>
                <Col lg={12}>
                    <Direccion cliente={cliente} />
                </Col>
                <Col lg={12}>
                    <DatosPersonales cliente={cliente} />
                </Col>
                <Col lg={12}>
                    <Facturacion cliente={cliente} />
                </Col>
                <Col lg={12}>
                    <ReglaNegocio cliente={cliente} />
                </Col>
            </Row>
        </>
    );
};

export default ClienteProfile;