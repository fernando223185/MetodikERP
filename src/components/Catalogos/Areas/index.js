import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import { useGetAreas } from 'hooks/Catalogos/Areas/useAreas';
import TableAreas from './Tables/TableAreas';
import ViewAreasCard from './Tables/ViewAreasCard';

const AreasHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Areas</h2>
            <span className="text-muted">Módulo de administración de Areas</span>
          </Col>
        </Row>
      </Container>
    );
};

const Areas = () => {
    const {getAreas, areas, isLoading: isLoadingAreas} = useGetAreas();
    const {getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([])
    const [formview, setFormView] = useState('view-table'); 
    const location = useLocation();
    const { formView } = location.state || {}; 
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            PersonaID: user.PersonaID,
            EmpresaID: user.EmpresaID,
            EstatusID: filter.EstatusID || null,
            FechaD: filter.FechaDesde || null,
            FechaH: filter.FechaHasta || null,
        };
        getAreas({data});
    },[filter]);

    useEffect(() => {
        const fetchEstatus = async () => {
        const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Areas' };
          const result = await getFiltroCatalogo(data);
            setEstatus(result);
        };
      
        fetchEstatus();
    },[]);

    useEffect(() => {
        setFormView(formView || 'view-table');
      }, [formView]);
    
      if (isLoadingAreas || isLoadingFiltro) {
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
            <AreasHeader />
            <Row className='g-3 mb-3'>
              <Col lg={12}>
                  {formview === 'view-card' ? (
                  <ViewAreasCard areas={areas} estatus={estatus} layout={formview} setFilter={setFilter}/>
                  ) : (
                  <TableAreas areas={areas} estatus={estatus} layout={formview} setFilter={setFilter} filter={filter}/>
                  )}
              </Col>
            </Row>
        </>
    );
}

export default Areas;
