import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/2.jpg';
import Flex from 'components/common/Flex';
import VerifiedBadge from 'components/common/VerifiedBadge';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from '../../pages/user/ProfileBanner';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Banner = ({chofer}) => {
  console.log("chofer", chofer)
  return (
    <ProfileBanner>
      <ProfileBanner.Header avatar={avatar} coverSrc={coverSrc} />
      <ProfileBanner.Body>
        <Row>
          <Col lg={8}>
            <h4 className="mb-1">
              {chofer.Nombre}
            </h4>
            <h5 className="fs-0 fw-normal">
              Metodik ERP
            </h5>
            <p className="text-500">New York, USA</p>
            <Link
              to={`/configuration/choferes/edit/${chofer.ChoferID}`}  
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