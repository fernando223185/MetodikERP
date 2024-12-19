import React, {useState, useEffect} from 'react';
import { Col, Row, Container, Card, Spinner, Tab } from 'react-bootstrap';
import { useGetClientes } from 'hooks/Catalogos/Clientes/useClientes';
import { useLocation } from "react-router";
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import TableClientes from './tables/tableClientes';
import ViewClientesCard from './sections/ViewClientesCard';


const ClientesHeader = () => {
    return (
        <Container fluid className='py-3 px-4 border-bottom mb-4'>
            <Row className='align-items-center'>
                <Col>
                    <h2 className='mb-0'>Clientes</h2>
                    <span className='text-muted'>Tablero de control</span>
                </Col>
            </Row>
        </Container>
    );
};

const Clientes = () => {
    const { getClientes, clientes, isLoading: isLoadingClientes } = useGetClientes();
    const [formview, setFormView] = useState(null);
    const location = useLocation();
    const { formView } = location.state || {};
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [ filter, setFilter ] = useState({});


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            EstatusID: filter.EstatusID ? filter.EstatusID : null,
            EmpresaID: filter.EmpresaID ? filter.EmpresaID : user.EmpresaID,
        };

        getClientes({data});
    }, [filter]);

    useEffect(() => {
        const fecthEstatus = async () => {
            const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Clientes' };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        }

        const fetchEmpresa = async () => {
            const data = { Tipo: 'Empresa', PersonaID: 1, Modulo: 'Clientes' };
            const result = await getFiltroCatalogo(data);
            setEmpresa(result);
        }

        fecthEstatus();
        fetchEmpresa();
        setFormView(formView || 'view-table');
    }, []);

    useEffect(() => {
        setFormView(formView || 'view-table');
    }, [formView]);

    if (isLoadingClientes) {
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
            <ClientesHeader />
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    {formview === 'view-card' ? (
                        <ViewClientesCard clientes={clientes} estatus={estatus} empresa={empresa} layout={formview} setFilter={setFilter} />
                    ) : (
                        <TableClientes clientes={clientes} estatus={estatus} empresa={empresa} layout={formview} filter={filter} setFilter={setFilter} />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Clientes;