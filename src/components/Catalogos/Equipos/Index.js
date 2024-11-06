import React, {useState, useEffect} from 'react';
import { Col, Row, Container, Card, Spinner, Tab } from 'react-bootstrap';
import TableEquipos from './tables/tableEquipos';
import { useGetEquipos } from '../../../hooks/Catalogos/Equipos/useEquipos';
import { useLocation } from "react-router";
import { useGetFiltroCatalogo } from 'hooks/useFiltros';


const EquiposHeader = () => {
    return (
        <Container fluid className="py-3 px-4 border-bottom mb-4">
            <Row className="align-items-center">
                <Col>
                    <h2 className="mb-0">Equipos</h2>
                    <span className="text-muted">Tablero de control</span>
                </Col>
            </Row>
        </Container>
    );
};

const Equipos = () => {
    const { getEquipos, equipos, isLoading: isLoadingEquipos } = useGetEquipos();
    const [formview, setFormView] = useState(null);
    const location = useLocation();
    const { formView } = location.state || {};
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [ estatus, setEstatus ] = useState([]);
    const [ filter, setFilter ] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            EmpresaID: user.EmpresaID,
            EstatusID: filter.EstatusID ? filter.EstatusID : null,
            FechaD: filter.FechaD ? filter.FechaD : null,
            FechaH: filter.FechaH ? filter.FechaH : null
        };

        getEquipos({ data });
    }, [filter]);


    useEffect(() => {
        const fetchEstatus = async () => {
            const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Equipos' };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        }

        fetchEstatus();
        setFormView(formView || 'view-table');
    }, []);

    useEffect(() => {
        setFormView(formView || 'view-table');
    }, [formView]);


    if (isLoadingEquipos) {
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
            <EquiposHeader />
            <Row className="g-3 mb-3">
                <Col lg={12}>
                    <TableEquipos equipos={equipos} estatus={estatus} setFilter={setFilter} layout={formview} filter={filter} />
                </Col>
            </Row> 
        </>
    );
};

export default Equipos;