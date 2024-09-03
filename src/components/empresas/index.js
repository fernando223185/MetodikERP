import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import TableUsers from './tables/tableEmpresas';



const EmpresasHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Empresas</h2>
            <span className="text-muted">Módulo de administración de empresas</span>
          </Col>
        </Row>
      </Container>
    );
  };
  
const Empresas = () => {

    return (
        <>
            <EmpresasHeader />
            <Row className="g-3 mb-3">
                <Col lg={12}>
                    <TableUsers />
                </Col>
            </Row>
        </>
    );
}

export default Empresas;