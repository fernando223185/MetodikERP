import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Spinner } from 'react-bootstrap';
import TableReservas from './tables/tableReservas';
import TableReservasV2 from './tables/tableReservasV2';
import LmsStats from 'components/dashboards/lms/lms-stats/LmsStatItem';
import { useGetIndicadores } from '../../../hooks/useIndicadores';
import { useGetReservas } from '../../../hooks/Comercial/Reserva/useReserva';
import { useGetFiltroModulo } from '../../../hooks/useFiltros'; 
import { useLocation } from "react-router";
import ViewReservasCard from './sections/ViewReservasCard'

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
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [dataind, setDataInd] = useState([]);
  const [formview, setFormView] = useState(null);
  const location = useLocation();
  const { formView } = location.state || {};
  const [filter, setFilter] = useState({});


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = { Tipo: 'Reservas', EmpresaID: user.EmpresaID };

    getIndicadores({ data });
  }, [getIndicadores]);

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = { 
        EmpresaID: user.EmpresaID, 
        PersonaID: user.ID,
        EstatusID: filter.EstatusID ? filter.EstatusID : null,
        Movimiento: filter.Movimiento ? filter.Movimiento : null,
        FechaD: filter.FechaDesde ? filter.FechaDesde : null,
        FechaH: filter.FechaHasta ? filter.FechaHasta : null
      };

      getReservas({ data });
  }, [filter]);


  useEffect(() => {
    if (indicadores.data && indicadores.data.length > 0) {
      const transformedData = indicadores.data.map(i => ({
        //id:
        //
        title: i.Titulo,
        amount: i.Cantidad,
        decimal: false,
        icon: i.Icono,
        color: i.Color,
        badgeText: i.Porcentaje,
        className: i.Classname
      }));
      setDataInd(transformedData);
    }
  }, [indicadores]);

  useEffect(() => {

    const fetchMovimientos = async () => {
      const data = { Tipo: 'Movimientos', PersonaID: 1, Modulo: 'Reservas' };
      const result = await getFiltroModulo(data);
      setMovimientos(result); 
    };

    const fetchEstatus = async () => {
      const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Reservas' };
      const result = await getFiltroModulo(data);
      setEstatus(result); 
    }

    fetchEstatus();
    fetchMovimientos(); 
    setFormView(formView || 'view-table');
    console.log(formview)

  }, []);

  useEffect(() => {
    setFormView(formView || 'view-table');
    console.log(formview)
  }, [formView]);

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
      <Card className="mb-3">
        <Card.Body className="px-xxl-0 pt-4">
          <Row className="g-0">

            {dataind.length > 0 ? (
              dataind.map((stat) => (
                  <LmsStats stat={stat} style={{ flex: 1, minWidth: '10rem' }} />
              ))
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </Row>
        </Card.Body>
      </Card>
      </Row>
      <Row className="g-3 mb-3">
        <Col lg={12}>
         {/* <Card>
            <Card.Body>
              <TableReservas reservas={reservas} />
            </Card.Body>
          </Card> */}
          {formview === 'view-card' ? (
            <ViewReservasCard reservas={reservas} movimientos={movimientos} estatus={estatus} layout={formview}  />
          ) : (
            <TableReservasV2 reservas={reservas} movimientos={movimientos} estatus={estatus} layout={formview} setFilter={setFilter}/>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Reservas;
