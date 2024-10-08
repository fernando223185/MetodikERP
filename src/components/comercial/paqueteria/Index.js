import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Spinner } from 'react-bootstrap';
import TablePaqueteria from './tables/tablePaqueteria';
import LmsStats from 'components/dashboards/lms/lms-stats/LmsStatItem';
import { useGetIndicadores } from '../../../hooks/useIndicadores';
import { useGetPaqueteria } from '../../../hooks/Comercial/Paqueteria/usePaqueteria';
import { useGetFiltroModulo } from '../../../hooks/useFiltros'; 
import { useLocation } from "react-router";
import ViewReservasCard from '../reservas/sections/ViewReservasCard'

const PaqueteriaHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Paqueteria</h2>
          <span className="text-muted">Tablero de control</span>
        </Col>
      </Row>
    </Container>
  );
};

const Paqueteria = () => {
  const { getIndicadores, indicadores, isLoading: isLoadingIndicadores } = useGetIndicadores();
  const { getPaqueteria, paqueteria, isLoading: isLoadingPaqueteria} = useGetPaqueteria();
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [situaciones, setSituacion] = useState([]);
  const [dataind, setDataInd] = useState([]);
  const [formview, setFormView] = useState(null);
  const location = useLocation();
  const { formView } = location.state || {};
  const [filter, setFilter] = useState({});


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = { Tipo: 'Paqueteria', EmpresaID: user.EmpresaID };

    getIndicadores({ data });
  }, [getIndicadores]);

  useEffect(() => {
      getPaqueteria();
  }, []);


  useEffect(() => {
    if (indicadores.data && indicadores.data.length > 0) {
      const transformedData = indicadores.data.map(i => ({
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

    const fetchSituaciones = async () => {
      const data = { Tipo: 'Situaciones', PersonaID: 1, Modulo: 'Reservas' };
      const result = await getFiltroModulo(data);
      setSituacion(result); 
    }

    const fetchUsuarios = async () => {
      const data = { Tipo: 'Usuarios', PersonaID: 1, Modulo: 'Reservas' };
      const result = await getFiltroModulo(data);
      setUsuarios(result); 
    }

    fetchUsuarios();
    fetchSituaciones();
    fetchEstatus();
    fetchMovimientos(); 
    setFormView(formView || 'view-table');
  }, []);

  useEffect(() => {
    setFormView(formView || 'view-table');
  }, [formView]);

  if (isLoadingIndicadores || isLoadingPaqueteria) {
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
      <PaqueteriaHeader />
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
            <ViewReservasCard reservas={paqueteria} movimientos={movimientos} estatus={estatus} layout={formview}  />
          ) : (
            <TablePaqueteria paqueteria={paqueteria} movimientos={movimientos} estatus={estatus} layout={formview} setFilter={setFilter} situaciones={situaciones} usuarios={usuarios}/>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Paqueteria;
