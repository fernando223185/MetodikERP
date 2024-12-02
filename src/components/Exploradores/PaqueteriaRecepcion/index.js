import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { useGetFiltroModulo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import { useGetPaqueteriaR } from 'hooks/Exploradores/PaqueteriaRecepcion/usePaqueteriaRecepcion';
import TablePaqueteriaR from './tables/tablePaqueteriaR';
import ViewPaqueteriaRCard from './tables/ViewPaqueteriaRCard';


const PaqueteriaRHeader = () => {
    return (
        <Container fluid className="py-3 px-4 border-bottom mb-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-0">Paqueteria Recepcion</h2>
              <span className="text-muted">Módulo de Explorador de Paqueteria Recepcion</span>
            </Col>
          </Row>
        </Container>
    );
};

const ExploradorPaqueteriaRecepcion = () => {

    const {getPaqueteriaR, paqueteriaR, isLoading:isLoadingPaqueteriaR} = useGetPaqueteriaR();
    const { getFiltroModulo, isLoading:isLoadingModulo} = useGetFiltroModulo();
    const [cliente, setCliente] = useState([])
    const [destino, setDestino] = useState([])
    const [movimiento, setMovimiento] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [formview, setFormView] = useState('view-table'); 
    const location = useLocation();
    const { formView } = location.state || {}; 
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            EmpresaID: user.EmpresaID,
            PersonaID: user.PersonaID,
            ClienteID: filter.ClienteID || null,
            DestinoID: filter.DestinoID || null,
            Movimiento: filter.Movimiento || null,
            FechaD: filter.FechaDesde || null,
            FechaH: filter.FechaHasta || null,
        };
        getPaqueteriaR({ data });
    },[filter]);

    useEffect(() => {
        const fetchCliente = async () => {
            const data = {Tipo: 'Cliente',PersonaID: 1, Modulo: 'Paqueteria'};
                const result = await getFiltroModulo(data);
                    setCliente(result);
        };
        const fetchDestino = async () => {
            const data = {Tipo: 'Destino',PersonaID: 1, Modulo: 'Paqueteria'};
                const result = await getFiltroModulo(data);
                    setDestino(result);
        };
        const fetchMovimiento = async () => {
            const data = {Tipo: 'Movimientos',PersonaID: 1, Modulo: 'Paqueteria'};
                const result = await getFiltroModulo(data);
                    setMovimiento(result);
        };
        const fetchUsuarios = async () => {
            const data = {Tipo: 'Usuarios', PersonaID: 1, Modulo: 'Paqueteria'};
                const result = await getFiltroModulo(data);
                    setUsuarios(result);
        };
        
        fetchCliente();
        fetchDestino();
        fetchMovimiento();
        fetchUsuarios();
    },[]);

    console.log(paqueteriaR)

    useEffect(() => {
        setFormView(formView || 'view-table');
    }, [formView]);

    if (isLoadingPaqueteriaR) {
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
          <PaqueteriaRHeader /> 
          <Row className='g-3 mb-3'>
            <Col lg={12}>
            {formview === 'view-card' ? (
                <ViewPaqueteriaRCard paqueteriaR={paqueteriaR} cliente={cliente} destino={destino} movimiento={movimiento} usuarios={usuarios} layout={formview} setFilter={setFilter}/>
            ) : (
                <TablePaqueteriaR paqueteriaR={paqueteriaR} cliente={cliente} destino={destino} movimiento={movimiento} usuarios={usuarios} layout={formview} setFilter={setFilter} filter={filter}/>
            )}
            </Col>
          </Row>
        </>
    )
}

export default ExploradorPaqueteriaRecepcion;