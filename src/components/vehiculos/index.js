import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Card, Spinner } from 'react-bootstrap';
import { useGetVehiculos } from 'hooks/Catalogos/Vehiculos/useVehiculo';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import TableVehiculos from './tables/tableVehiculos';
import ViewVehiculosCard from './sections/ViewVehiculosCard';



const VehiculosHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Vehiculos</h2>
            <span className="text-muted">Módulo de administración de vehiculos</span>
          </Col>
        </Row>
      </Container>
    );
  };
  
const Vehiculos = () => {
  const {getVehiculos, vehiculos, isLoading:isLoadingVehiculos} = useGetVehiculos();
  const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
  const [estatus, setEstatus] = useState([]);
  const [tipovehiculo, setTipoVehiculo] = useState ([]);
  const [formview, setFormView] = useState('view-table'); 
  const location = useLocation();
  const { formView } = location.state || {}; 
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      PersonaID: user.ID,
      EmpresaID: user.PersonaID,
      EstatusID: filter.EstatusID || null,
      FechaD: filter.FechaDesde || null,
      FechaH: filter.FechaHasta || null,
      UsuarioID: filter.Usuario || null
    };
    getVehiculos({ data });
  },[filter]);

  useEffect(() => {
    const fetchEstatus = async () => {
    const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Vehiculos' };
            const result = await getFiltroCatalogo(data);
              setEstatus(result);
    };

    const fetchTipoVehiculo = async () => {
      const data = { Tipo: 'TipoVehiculo', PersonaID: 1, Modulo: 'Vehiculos' };
              const result = await getFiltroCatalogo(data);
                setTipoVehiculo(result);
      };

    fetchTipoVehiculo();
    fetchEstatus();
  },[]);

  useEffect(() => {
    setFormView(formView || 'view-table');
  }, [formView]);

  if (isLoadingVehiculos) {
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
        <VehiculosHeader />
        <Row className="g-3 mb-3">
            <Col lg={12}>
                {formview === 'view-card' ? (
                <ViewVehiculosCard vehiculos={vehiculos} estatus={estatus} tipovehiculo={tipovehiculo} layout={formview} setFilter={setFilter}/>
              ) : (
                <TableVehiculos vehiculos={vehiculos} estatus={estatus} tipovehiculo={tipovehiculo} layout={formview} setFilter={setFilter} filter={filter}/>
              )}
            </Col>
        </Row>
      </>
  );
}

export default Vehiculos;
