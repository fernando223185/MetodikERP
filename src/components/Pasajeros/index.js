import React,{useEffect,useState} from 'react'
import { Col, Row, Container, Card, Spinner } from 'react-bootstrap';
import { useGetPasajeros } from 'hooks/Catalogos/Pasajeros/usePasajeros';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useLocation } from 'react-router-dom';
import TablePasajeros from './tables/tablePasajeros';
import ViewPasajerosCard from './sections/ViewPasajerosCard';

const PasajerosHeader = () => {
    return (
        <Container fluid className="py-3 px-4 border-bottom mb-4">
            <Row className="align-items-center">
                <Col>
                    <h2 className="mb-0">Pasajeros</h2>
                    <span className="text-muted">Módulo de administración de Pasajeros</span>
                </Col>
            </Row>
        </Container>    
    );
};

const Pasajeros = () => {
    const { getPasajeros, pasajeros, isLoading: isLoadingPasajeros } = useGetPasajeros();
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [formview, setFormView] = useState('view-table'); // Valor inicial seguro
    const location = useLocation();
    const { formView } = location.state || {}; // obtener formView de la ubicación si existe
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            PersonaID: user.ID,
            EmpresaID: user.PersonaID,
            EstatusID: filter.EstatusID || null,
            Movimiento: filter.Movimiento || null,
            FechaD: filter.FechaDesde || null,
            FechaH: filter.FechaHasta || null,
            Situacion: filter.Situacion || null,
            Usuario: filter.Usuario || null
        };
        getPasajeros({ data });
    }, [filter]);

    useEffect(() => {
        const fetchEstatus = async () => {
            const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Pasajeros' };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        };

        fetchEstatus();
    }, []);

    // Establece el valor de formview si no se ha definido
    useEffect(() => {
        setFormView(formView || 'view-table');
    }, [formView]);

    if (isLoadingPasajeros) {
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
      <PasajerosHeader />
      <Row className='g-3 mb-3'>
          <Col lg={12}>
            {formview === 'view-card' ? (
                (console.log("Datos enviados a ViewPasajerosCard:", { pasajeros, estatus, layout: formview, setFilter }),
                <ViewPasajerosCard pasajeros={pasajeros} estatus={estatus} layout={formview} setFilter={setFilter} />)
            ) : (
                <TablePasajeros pasajeros={pasajeros} estatus={estatus} layout={formview} setFilter={setFilter} filter={filter} />
            )}
          </Col>
      </Row>
    </>
);

}


export default Pasajeros;
