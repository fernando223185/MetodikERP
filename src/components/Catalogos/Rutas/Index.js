import { useGetRutas } from "hooks/Catalogos/Rutas/useRutas";
import { useGetFiltroCatalogo } from "hooks/useFiltros";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TableCardRutas from "./tables/TableCardRutas";
import TableRutas from "./tables/TableRutas";

const RutasHeader = () => {
    return (
        <Container fluid className="py-3 px-4 border-bottom mb-4">
            <Row className="align-items-center">
                <Col>
                    <h2 className='mb-0'>Rutas</h2>
                    <span className='text-muted'>Tablero de control</span>
                </Col>
            </Row>
        </Container>
    );
};

const Rutas = () => {
    const { getRutas, rutas, isLoading, error } = useGetRutas();
    const [formview, setFormView] = useState(null);
    const location = useLocation();
    const { formView } = location.state || {};
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [sucursal, setSucursal] = useState([]);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const data = {
            EstatusID: filter.EstatusID ? filter.EstatusID : null,
            SucursalID: filter.SucursalID ? filter.SucursalID : null
        };

        getRutas({data});
    }, [filter]);

    useEffect(() => {
        const fecthEstatus = async () => {
            const data = { Tipo: "Estatus", PersonaID: 1, Modulo: "Rutas" };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        };

        const fetchSucursal = async () => {
            const data = { Tipo: "Sucursales", PersonaID: 1, Modulo: "Rutas" };
            const result = await getFiltroCatalogo(data);
            setSucursal(result);
        };

        fecthEstatus();
        fetchSucursal();
        setFormView(formView || 'view-table');
    }, []);

    useEffect(() => {
        setFormView(formView || 'view-table');
    }, [formView])

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
        );
    };

    return (
        <>
            <RutasHeader />
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                {formview === 'view-card' ? (
                    <TableCardRutas rutas={rutas} estatus={estatus} sucursal={sucursal} layout={formview} setFilter={setFilter} />
                ) : (
                    <TableRutas rutas={rutas} estatus={estatus} sucursal={sucursal} layout={formview} filter={filter} setFilter={setFilter} />
                )}
                </Col>
            </Row>
        </>
    );
}

export default Rutas;