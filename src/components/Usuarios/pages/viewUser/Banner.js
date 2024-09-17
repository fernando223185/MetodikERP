import coverSrc from 'assets/img/illustrations/LogoMetodik_transparent_resized.png';
import avatar from 'assets/img/illustrations/Mo.png';
import Flex from 'components/common/Flex';
import VerifiedBadge from 'components/common/VerifiedBadge';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from '../../ProfileBanner';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Banner = ({userId}) => {
  return (
    <ProfileBanner>
      <ProfileBanner.Header avatar={avatar} coverSrc={coverSrc} />
      <ProfileBanner.Body>
        <Row>
          <Col lg={8}>
            <h4 className="mb-1">
              {userId.Nombre} {userId.ApellidoPaterno} {userId.ApellidoMaterno}
            </h4>
            <h5 className="fs-0 fw-normal">
              {userId.Usuario}
            </h5>
            <p className="text-500">New York, USA</p>
            <Link
              to={`/configuration/users/edit/${userId.ID}`}  
              className="btn btn-outline-primary rounded-pill me-2 mb-1"
            >   
              <FontAwesomeIcon icon="edit" />
            </Link>
            <div className="border-dashed border-bottom my-4 d-lg-none" />
          </Col>
        </Row>
      </ProfileBanner.Body>
    </ProfileBanner>
  );
};

export default Banner;
