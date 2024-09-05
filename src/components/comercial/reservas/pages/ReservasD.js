import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card, Button } from 'react-bootstrap';
import InfoCard from '../sections/InfoCard'
import InfoDCard from '../sections/InfoDCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faReply, faBan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ReservasHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Reservas Detalle</h2>
            <span className="text-muted">Detalle del Movimiento</span>
          </Col>
            <Col md={4} className="text-end">
                <Link
                    to={`/comercial/reservas`}  
                    className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
                >
                    <FontAwesomeIcon icon={faReply} />
                </Link>
                <button type="submit" className="btn btn-outline-primary rounded-pill btn-sm me-1">
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button type="submit" className="btn btn-outline-primary rounded-pill btn-sm">
                    <FontAwesomeIcon icon={faBan}  />
                </button>
            </Col>
        </Row>
      </Container>
    );
  };

const ReservasD = () => {

  return (
    <>
      <ReservasHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <InfoCard/>
                    </Col>
                    <Col md={8}>
                        <InfoDCard/>
                    </Col>
                </Row>
            </Card.Body>
          </Card>        
        </Col>
      </Row>
    </>
  );
};

export default ReservasD;
