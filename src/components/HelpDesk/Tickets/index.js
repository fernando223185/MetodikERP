import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Spinner } from 'react-bootstrap';
import LmsStats from 'components/dashboards/lms/lms-stats/LmsStatItem';
import { useGetIndicadores } from 'hooks/useIndicadores';
import { useGetTickets } from 'hooks/HelpDesk/Tickets/useTickets';
import { useGetFiltroModulo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import TableTickets from './Tables/TableTickets';
import ViewTicketsCard from './Tables/ViewTicketsCard';

const TicketsHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Tickets</h2>
            <span className="text-muted">Tablero de control</span>
          </Col>
        </Row>
      </Container>
    );
};

const Tickets = () => {
  const { getIndicadores, indicadores, isLoading: isLoadingIndicadores } = useGetIndicadores();
  const {getTickets,tickets,isLoading:isLoadingTickets} = useGetTickets();
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [estatus, setEstatus] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [prioridad, setPrioridad] = useState([]);
  const [dataind, setDataInd] = useState([]);
  const [formview, setFormView] = useState(null);
  const location = useLocation();
  const { formView } = location.state || {};
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = { Tipo: 'Tickets', EmpresaID: user.EmpresaID };

    getIndicadores({ data });
  }, [getIndicadores]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data ={
      EmpresaID: user.EmpresaID,
      EstatusID:filter.EstatusID || null,
      PersonaID: filter.PersonaID || null,
      AreaID: filter.AreaID || null,
      Prioridad: filter.Prioridad || null,
      FechaD: filter.FechaD || null,
      FechaH: filter.FechaH || null,
    };

    getTickets({ data });
  },[filter]);

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
    const fetchEstatus = async () => {
      const data = { Tipo: 'EstatusFiltro', PersonaID: 1, Modulo: 'Tickets' };
      const result = await getFiltroModulo(data);
      setEstatus(result); 
    }
    const fetchPersonas = async () => {
      const data = { Tipo: 'PersonasFiltro', PersonaID: 1, Modulo: 'Tickets' };
      const result = await getFiltroModulo(data);
      setPersonas(result);
    }
    const fetchAreas = async () => {
      const data = { Tipo: 'AreasFiltro', PersonaID: 1, Modulo: 'Tickets' };
      const result = await getFiltroModulo(data);
      setAreas(result);
    }
    const fetchPrioridad = async () => {
      const data = { Tipo: 'PrioridadFiltro', PersonaID: 1, Modulo: 'Tickets' };
      const result = await getFiltroModulo(data);
      setPrioridad(result);
    }
    fetchPersonas();
    fetchAreas();
    fetchPrioridad();
    fetchEstatus();
    setFormView(formView || 'view-table');
  },[]);

  useEffect(() => {
    setFormView(formView || 'view-table');
  }, [formView]);

  if (isLoadingTickets ||isLoadingIndicadores ) {
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
      <TicketsHeader />
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
          {formview === 'view-card' ? (
            <ViewTicketsCard tickets={tickets}  estatus={estatus} personas={personas} areas={areas} prioridad={prioridad} layout={formview} setFilter={setFilter}/>
          ) : (
            <TableTickets tickets={tickets}  estatus={estatus} personas={personas} areas={areas} prioridad={prioridad} layout={formview} setFilter={setFilter} filter={filter}/>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Tickets;