import React, { useEffect } from 'react';
import ProfileBanner from './Banner';
import ProfileIntro from './ProfileIntro';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetAgenteById } from '../../../../hooks/Catalogos/Agentes/useAgente'
import { Spinner } from 'react-bootstrap';
import Empresas from '../../../Usuarios/pages/viewUser/Empresas.js'


const AgenteProfile = () => {
    const { id } = useParams(); 

    const { getAgenteById, agenteId, isLoading } = useGetAgenteById();

    useEffect(() => {
        if(id != null && id > 0) {
            getAgenteById({ id })
        }
    }, [id])

    console.log(agenteId);

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
            <ProfileBanner agenteId={agenteId}/>
            <Row className="g-3 mb-3">
                <Col lg={8}>
                    <ProfileIntro agenteId={agenteId}/>
                    {/*<Associations
            associations={associations.slice(0, 4)}
            colBreakpoints={{ sm: 6 }}
          />

          <ActivityLog className="mt-3" activities={activities.slice(5, 9)} />
          */}
                </Col>
                <Col lg={4}>
                    <div className="sticky-sidebar">
                        <Empresas />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AgenteProfile;
