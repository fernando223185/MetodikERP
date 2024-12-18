import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import { useGetConceptos } from 'hooks/Catalogos/Concepto/useConcepto';
import TableConceptos from './tables/TableConceptos';
import ViewConceptosCard from './tables/ViewConceptosCard';

const ConceptoHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Conceptos</h2>
            <span className="text-muted">Módulo de administración de Conceptos</span>
          </Col>
        </Row>
      </Container>
    );
};

const Conceptos = () => {

    const{getConceptos, conceptos, isLoading: isLoadingConceptos} = useGetConceptos();
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
        getConceptos({data});
    },[filter]);

    useEffect(() => {
        const fetchEstatus = async () => {
        const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Concepto' };
          const result = await getFiltroCatalogo(data);
            setEstatus(result);
        };
      
        fetchEstatus();
    },[]);

    useEffect(() => {
        setFormView(formView || 'view-table');
      }, [formView]);
    
      if (isLoadingConceptos || isLoadingConceptos) {
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
            <ConceptoHeader />
            <Row className='g-3 mb-3'>
              <Col lg={12}>
                  {formview === 'view-card' ? (
                  <ViewConceptosCard conceptos={conceptos} estatus={estatus} layout={formview} setFilter={setFilter}/>
                  ) : (
                  <TableConceptos conceptos={conceptos} estatus={estatus} layout={formview} setFilter={setFilter} filter={filter}/>
                  )}
              </Col>
            </Row>
        </>
    );
}

export default Conceptos;