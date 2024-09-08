import { useGetVehiculoResumen } from '../../../hooks/Catalogos/Vehiculos/useVehiculo' 
import React from 'react';
import ProfileBanner from '../../pages/user/ProfileBanner';
import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/2.jpg';
import { Col, Row } from 'react-bootstrap';
import ProfileSettings from '../../pages/user/settings/ProfileSettings';
import ExperiencesSettings from '../../pages/user/settings/ExperiencesSettings';
import EducationSettings from '../../pages/user/settings/EducationSettings';
import AccountSettings from '../../pages/user/settings/AccountSettings';
import BillingSettings from '../../pages/user/settings/BillingSettings';
import ChangePassword from '../../pages/user/settings/ChangePassword';
import DangerZone from '../../pages/user/settings/DangerZone';
import { useParams } from 'react-router-dom';
import { useEffect }  from 'react';
import { Spinner } from 'react-bootstrap';

const VehiculosSettings = () => {  

    const { id } = useParams();

    const { getResumen, vehiculoResumen, isLoading } = useGetVehiculoResumen();

    useEffect(() => {
      const data = {
        ID: id,
      }
      getResumen({ data });
    },[id,getResumen]);

    useEffect(() => {
      if(vehiculoResumen.status === 200){
       console.log(vehiculoResumen.data);
      }
    },[vehiculoResumen]);
    
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
        <Row className="g-3">
          <Col lg={8}>
            <ProfileSettings mode = 'update' initialData = {vehiculoResumen.data}/>
            <ExperiencesSettings />
            <EducationSettings />
          </Col>
          <Col lg={4}>
            <div className="sticky-sidebar">
              <AccountSettings />
              <BillingSettings />
              <ChangePassword />
              <DangerZone />
            </div>
          </Col>
        </Row>
      </>
    );
  };

export default VehiculosSettings;
