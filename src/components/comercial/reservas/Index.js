import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Spinner } from 'react-bootstrap';
import TableReservas from './tables/tableReservas';
import StatisticsCard from 'components/dashboards/saas/stats-cards/StatisticsCard';
import { useGetIndicadores } from '../../../hooks/useIndicadores';
import { useGetReservas } from '../../../hooks/Comercial/Reserva/useReserva';

const ReservasHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Reservas</h2>
          <span className="text-muted">Tablero de control</span>
        </Col>
      </Row>
    </Container>
  );
};

const Reservas = () => {
  const { getIndicadores, indicadores, isLoading: isLoadingIndicadores } = useGetIndicadores();
  const { getReservas, reservas, isLoading: isLoadingReservas } = useGetReservas();
  const [dataind, setDataInd] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = { Tipo: 'Reservas', EmpresaID: user.EmpresaID };

    getIndicadores({ data });
  }, [getIndicadores]);

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = { 
        EmpresaID: user.EmpresaID, 
        PersonaID: user.ID 
      };

      getReservas({ data });
  }, []);

  useEffect(() => {
    if (indicadores.data && indicadores.data.length > 0) {
      const transformedData = indicadores.data.map(i => ({
        title: i.Titulo,
        value: i.Cantidad,
        decimal: false,
        suffix: '',
        prefix: '',
        badgeBg: i.Color,
        badgeText: i.Porcentaje,
      }));
      setDataInd(transformedData);
    }
  }, [indicadores]);

  if (isLoadingIndicadores || isLoadingReservas) {
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
      <ReservasHeader />
      <Row className="g-3 mb-3">
        {dataind.length > 0 ? (
          dataind.map((stat) => (
            <Col key={stat.title} xs={6} sm={6} md={3} className="d-flex">
              <StatisticsCard stat={stat} style={{ flex: 1, minWidth: '10rem' }} />
            </Col>
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </Row>
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <TableReservas reservas={reservas} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Reservas;
