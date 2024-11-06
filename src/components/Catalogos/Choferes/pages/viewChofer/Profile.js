import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetChoferID } from 'hooks/Catalogos/Choferes/useChoferes';
import { Spinner } from 'react-bootstrap';
import ProfileBanner from './Banner';
import ProfileIntro from './ProfileIntro';
import Empresas from 'components/Usuarios/pages/viewUser/Empresas';

const ChoferProfile = () => {
    const { id } = useParams();
    const { getChoferID, chofer, isLoading, error } = useGetChoferID();

    useEffect(() => {
        if (id != null && id > 0) {
            getChoferID({ id });
        }
    }, [id]);

    console.log(chofer);

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
            <ProfileBanner chofer={chofer}/>
            <Row className='g-3 mb-3'>
                <Col lg={8}>
                    <ProfileIntro chofer={chofer} />
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

export default ChoferProfile;