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


const CreateSucursal = () => {

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
              <ProfileSettings mode = 'create'/>
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

export default CreateSucursal;
