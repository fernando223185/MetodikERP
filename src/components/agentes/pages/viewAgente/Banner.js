import coverSrc from 'assets/img/illustrations/BannerUser.jpeg';
import avatar from 'assets/img/illustrations/user.jpeg';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from '../../../Usuarios/ProfileBanner.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Banner = ({agenteId}) => {
  return (
    <ProfileBanner>
      <ProfileBanner.Header avatar={avatar} coverSrc={coverSrc} />
      <ProfileBanner.Body>
        <Row>
          <Col lg={8}>
            <h4 className="mb-1">
              {agenteId.Nombre}
            </h4>
            <h5 className="fs-0 fw-normal">
              {agenteId.Correo}
            </h5>
            <Link
              to={`/configuration/agentes/edit/${agenteId.ID}`}  
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
