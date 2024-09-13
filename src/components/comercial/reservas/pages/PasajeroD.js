import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card, Spinner } from 'react-bootstrap';
import InfoCard from '../sections/InfoCard'
import InfoDCard from '../sections/InfoDCard'
import DetalleViajeCard from '../sections/DetalleViajeCard'
import RutaIda from '../sections/RutaIda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faReply, faBan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useGetPersonasReserva } from '../../../../hooks/Comercial/Reserva/useReservaD';
import { useParams } from 'react-router-dom';
import PasajeroInfo from '../sections/PasajeroForm'
import { useLocation } from 'react-router-dom';


const PasajerosHeader = () => {

    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Datos Pasajero</h2>
            <span className="text-muted">Informacion del pasajero</span>
          </Col>
        </Row>
      </Container>
    );
  };

const PasajeroD = () => {
  const { id } = useParams();
  const pasajeros = [
    { nombre: 'Luis', edad: 28, email: 'luis@example.com' },
    { nombre: 'Ana', edad: 25, email: 'ana@example.com' },
  ];
  const location = useLocation();
  const { getPersonasReserva, personas, isLoading, error } = useGetPersonasReserva();

  useEffect(() => {
    const data = {
        ID: id,
        HorarioRutaID: location.state.HorarioRutaID,
        RenglonID: location.state.RenglonID
    }
    getPersonasReserva({ data })
  },[])


  return (
    <>
      <PasajerosHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Card.Body>
            {personas.map((personas, index) => (
                <PasajeroInfo key={index} index={index} pasajero={personas} />
            ))}
            </Card.Body>
          </Card>        
        </Col>
      </Row>

    </>
  );
};

export default PasajeroD;
