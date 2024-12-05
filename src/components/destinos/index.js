import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import { useGetDestinos } from 'hooks/Catalogos/Destinos/useDestino';
import TableDestinos from './tables/tableDestinos';
import ViewDestinosCard from './sections/ViewDestinosCard';


const DestinosHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Destinos</h2>
            <span className="text-muted">Módulo de administración de destinos</span>
          </Col>
        </Row>
      </Container>
    );
  };
  
const Destinos = () => {
  
const {getDestinos, destinos, isLoading:isLoadingDestinos} = useGetDestinos();
const {getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
const [estatus, setEstatus] = useState([])
const [formview, setFormView] = useState('view-table'); 
const location = useLocation();
const { formView } = location.state || {}; 
const [filter, setFilter] = useState({});

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  const data = {
    PersonaID: user.ID,
    EmpresaID: user.EmpresaID,
    EstatusID: filter.EstatusID || null,
    FechaD: filter.FechaDesde || null,
    FechaH: filter.FechaHasta || null,
  };
  getDestinos({ data });
},[filter]);

useEffect(() => {
  const fetchEstatus = async () => {
  const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Destinos' };
          const result = await getFiltroCatalogo(data);
            setEstatus(result);
  };

  fetchEstatus();
},[]);

useEffect(() => {
  setFormView(formView || 'view-table');
}, [formView]);

if (isLoadingDestinos) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

  return(
    <>
      <DestinosHeader />
      <Row className='g-3 mb-3'>
        <Col lg={12}>
          {formview === 'view-card' ? (
            <ViewDestinosCard destinos={destinos} estatus={estatus} layout={formview} setFilter={setFilter}/>
          ) : (
            <TableDestinos destinos={destinos} estatus={estatus} layout={formview} setFilter={setFilter} filter={filter}/>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Destinos;
