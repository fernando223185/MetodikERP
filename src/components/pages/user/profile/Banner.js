import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/2.jpg';
import Flex from 'components/common/Flex';
import VerifiedBadge from 'components/common/VerifiedBadge';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from '../ProfileBanner';
import IconButton from 'components/common/IconButton';


const Banner = () => {
  return (
    <ProfileBanner>
      <ProfileBanner.Header avatar={avatar} coverSrc={coverSrc} />
      <ProfileBanner.Body>
        <Row>
          <Col lg={8}>
            <h4 className="mb-1">
              Anthony Hopkins 
            </h4>
            <h5 className="fs-0 fw-normal">
              Senior Software Engineer at Technext Limited
            </h5>
            <p className="text-500">New York, USA</p>
            <IconButton
              variant="outline-primary" 
              className="rounded-pill me-1 mb-1"
              icon="edit"
              iconAlign="right" 
              onClick={() => {
                
              }}            
            >
              Editar Informacion
            </IconButton>
            <div className="border-dashed border-bottom my-4 d-lg-none" />
          </Col>
        </Row>
      </ProfileBanner.Body>
    </ProfileBanner>
  );
};

export default Banner;
