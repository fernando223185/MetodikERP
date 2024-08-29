import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import TableUsers from './tables/tableUsers';


const UsersHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Usuarios</h2>
          <span className="text-muted">Módulo de administración de usuarios</span>
        </Col>
      </Row>
    </Container>
  );
};

const Users = () => {
  return (
    <>
      <UsersHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <TableUsers />
        </Col>
      </Row>
    </>
  );
};

export default Users;
