import React, { useEffect } from 'react';
import Banner from './Banner';
import ProfileInfo from './ProfileIntro';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useGetChoferById } from '../../../hooks/Catalogos/Choferes/useChoferes'; 
import Empresas from '../../Usuarios/pages/viewUser/Empresas';

const ViewProfile = () => {

    const { id } = useParams();

    const { getChofer, chofer, isLoading } = useGetChoferById();

    useEffect(() => {
        getChofer(id);
    },[id,getChofer]);

    console.log(chofer);

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
    <Banner chofer={chofer} />
      <Row className="g-3">
        <Col lg={8}>
          <ProfileInfo chofer={chofer} />
        </Col>
        <Col lg={4}>
         <Empresas />
        </Col>
      </Row>
    </>
  )
};

export default ViewProfile;