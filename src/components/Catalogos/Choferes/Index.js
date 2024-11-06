import React, {useState, useEffect} from 'react';
import { Col, Row, Container, Card, Spinner, Tab } from 'react-bootstrap';
import { useGetChoferes } from 'hooks/Catalogos/Choferes/useChoferes';
import { useLocation } from "react-router";
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import TableChoferes from './tables/tableChoferes';
import ViewChoferesCard from './sections/ViewChoferesCard';


const ChoferesHeader = () => {
    return (
        <Container fluid className='py-3 px-4 border-bottom mb-4'>
            <Row className='align-items-center'>
                <Col>
                    <h2 className='mb-0'>Choferes</h2>
                    <span className='text-muted'>Tablero de control</span>
                </Col>
            </Row>
        </Container>
    );
};

const Choferes = () => {
    const { getChoferes, choferes, isLoading: isLoadingChoferes } = useGetChoferes();
    const [formview, setFormView] = useState(null);
    const location = useLocation();
    const { formView } = location.state || {};
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [sucursal, setSucursal] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [vehiculo, setVehiculo] = useState([]);
    const [ filter, setFilter ] = useState({});


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            EstatusID: filter.EstatusID ? filter.EstatusID : null,
            EmpresaID: filter.EmpresaID ? filter.EmpresaID : user.EmpresaID,
            VehiculoID: filter.VehiculoID ? filter.VehiculoID : null,
            SucursalID: filter.SucursalID ? filter.SucursalID : null
        };

        getChoferes({data});
    }, [filter]);

    useEffect(() => {
        const fecthEstatus = async () => {
            const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        }

        const fetchSucursal = async () => {
            const data = { Tipo: 'Sucursal', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setSucursal(result);
        }

        const fetchEmpresa = async () => {
            const data = { Tipo: 'Empresa', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setEmpresa(result);
        }

        fecthEstatus();
        fetchEmpresa();
        fetchSucursal();
        setFormView(formView || 'view-table');
    }, []);

    useEffect(() => {
        setFormView(formView || 'view-table');
    }, [formView]);

    if (isLoadingChoferes) {
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
            <ChoferesHeader />
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    {formview === 'view-card' ? (
                        <ViewChoferesCard choferes={choferes} estatus={estatus} sucursal={sucursal} empresa={empresa} layout={formview} setFilter={setFilter} />
                    ) : (
                        <TableChoferes choferes={choferes} estatus={estatus} sucursal={sucursal} empresa={empresa} layout={formview} filter={filter} setFilter={setFilter} />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Choferes;