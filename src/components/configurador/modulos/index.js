import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { useGetFiltroModulo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import { useGetModulos } from 'hooks/Configurador/useModulo';
import TableModulos from './tables/TableModulos';
import ViewModulosCard from './Profile/ViewModulosCard';

const ModulosHeader = () => (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
            <Col>
                <h2 className="mb-0">Configurador de Modulos</h2>
                <span className="text-muted">Módulo de Configuración de Rutas</span>
            </Col>
        </Row>
    </Container>
);

const Modulos = () => {
    const { getModulos, modulos, isLoading: isLoadingModulos } = useGetModulos();
    const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
    const [formview, setFormView] = useState('view-table'); 
    const location = useLocation();
    const { formView } = location.state || {};
    const [filter, setFilter] = useState({
        EstatusID: 1,
        Tipo: null,
        FechaDesde: null,
        FechaHasta: null,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            PersonaID: user.PersonaID,
            EstatusID: filter.EstatusID,
            Tipo: filter.Tipo,
            FechaD: filter.FechaDesde,
            FechaH: filter.FechaHasta,
        };
        getModulos({ data });        
    }, [filter]);

    useEffect(() => {
        if (location.state && location.state.formView) {
            setFormView(location.state.formView);
        }
    }, [location.state]);

    if (isLoadingFiltro || isLoadingModulos) {
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
            <ModulosHeader />
            <Row className="g-3 mb-3">
                <Col lg={12}>
                    {formview === 'view-card' ? (
                        <ViewModulosCard modulos={modulos} layout={formview} setFilter={setFilter} />
                    ) : (
                        <TableModulos modulos={modulos} layout={formview} setFilter={setFilter} filter={filter} />
                    )}
                </Col>
            </Row>
        </>
    );
};

export default Modulos;
