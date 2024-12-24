import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import { useGetDepartamentos } from 'hooks/Catalogos/Departamentos/useDepartamentos';
import TableDepartamentos from './tables/TableDepartamentos';
import ViewDepartamentosCard from './tables/ViewDepartamentosCard';

const DepartamentosHeader = () => {
    return (
        <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
            <Col>
            <h2 className="mb-0">Departamentos</h2>
            <span className="text-muted">Módulo de administración de Departamentos</span>
            </Col>
        </Row>
        </Container>
    );
}

const Departamentos = () => {
    const {getDepartamentos, departamentos, isLoading:isLoadingDepa} = useGetDepartamentos();
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
        getDepartamentos({data});
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

    if (isLoadingDepa || isLoadingFiltro) {
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
            <DepartamentosHeader />
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    {formview === 'view-card' ? (
                    <ViewDepartamentosCard departamentos={departamentos} estatus={estatus} layout={formview} setFilter={setFilter}/>
                    ) : (
                    <TableDepartamentos departamentos={departamentos} estatus={estatus} layout={formview} setFilter={setFilter} filter={filter}/>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Departamentos;