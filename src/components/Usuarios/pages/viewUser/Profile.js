import React, { useEffect } from 'react';
import ProfileBanner from './Banner';
import ProfileIntro from './ProfileIntro';
import { Col, Row } from 'react-bootstrap';
import Empresas from './Empresas';
import { useParams } from 'react-router-dom';
import { useGetUserById } from '../../../../hooks/Catalogos/Usuarios/useUsuario'
import { Spinner } from 'react-bootstrap';


const UserProfile = () => {
  const { id } = useParams(); 

  const { getUserById, userId, isLoading } = useGetUserById();
  
  useEffect(() => {
    if(id != null && id > 0)
    {
      getUserById({ id })
    }
  }, [id])

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
      <ProfileBanner userId={userId}/>
      <Row className="g-3 mb-3">
        <Col lg={8}>
          <ProfileIntro userId={userId}/>
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

export default UserProfile;
