import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';
import TableRutas from './table/tableRutas';
import { useGetRutas,useGetHorarios } from '../../hooks/Catalogos/Rutas/useRutas' 
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { Spinner } from 'react-bootstrap';
//import ModalUser from './modalUser';

const RutasHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Rutas</h2>
          <span className="text-muted">Modúlo de configuration de Rutas</span>
        </Col>
      </Row>
    </Container>
  );
};

const Rutas = () => {
  
  // Llamadas al api
  const { getRutas, rutas, isLoading: loadingRutas} = useGetRutas();
  const { getFiltroCatalogo, isLoading: loadingFiltros } = useGetFiltroCatalogo();
  const { getHorarios, horarios, isLoading: loadingHorarios } = useGetHorarios();
  
  const [sucursales, setSucursales] = useState([]);
  const [destinos, setDestinos] = useState([]);

  // Funcion para obtener las sucursales
  const fetchSucursales = async () => {
    const data = { Tipo: "Sucursales", PersonaID:1, Modulo : "Rutas"};
    const result = await getFiltroCatalogo(data);
    setSucursales(result);
    return result;
  };
  

  // Funcion para obtener los destinos y origenes,los cuales son los mismos
  const fetchDestinos = async () => {
    const data = { Tipo: "Destinos", PersonaID:1, Modulo : "Rutas"};
    const result = await getFiltroCatalogo(data);
    setDestinos(result);
    return result;
  };

  // Funcion para llamar todas las promesas 
  const fetchData = async () => {
    const result = await Promise.all([fetchSucursales(), fetchDestinos(),getRutas(),getHorarios()]);
    return result;
  }

  useEffect(() => {
    fetchData();
  },[]);

  if(loadingFiltros || loadingRutas || loadingHorarios)
  {
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
      <RutasHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <TableRutas rutas={rutas} sucursales={sucursales} destinos={destinos} horarios={horarios} />
            </Card.Body>
          </Card>        
        </Col>
      </Row>
    </>
  );
};

export default Rutas;
