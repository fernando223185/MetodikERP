import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import { useGetProyectos } from 'hooks/Catalogos/Proyectos/useProyectos';
import TableProyectos from './Tables/TableProyectos';

const ProyectosHeader = () => {
    return (
        <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
            <Col>
            <h2 className="mb-0">Proyectos</h2>
            <span className="text-muted">Módulo de administración de Proyectos</span>
            </Col>
        </Row>
        </Container>
    );
}

const Proyectos = () => {
    const {getProyectos, proyectos, isLoading:isLoadingProyectos} = useGetProyectos();
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
            EstatusID: filter.estatus || null,
            FechaD: filter.FechaD || null,
            FechaH: filter.FechaH || null,
        };
        getProyectos({data});
    },[filter]);

    useEffect(() => {
        const fetchEstatus = async () => {
        const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Proyectos' };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        };
        
        fetchEstatus();
    },[]);

    useEffect(() => {
        setFormView(formView || 'view-table');
    },[formView])
    
    if (isLoadingProyectos || isLoadingFiltro) {
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
            <ProyectosHeader />
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    {formview === 'view-card' ? (
                    <div>ola</div>
                    ) : (
                    <TableProyectos proyectos={proyectos} estatus={estatus} layout={formview} setFilter={setFilter} filter={filter}/>
                    )}
                </Col>
            </Row>
        </>
    );

}
export default Proyectos;