import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';
import TableExploradorRutas from './tables/tableRutas';



const ProfilerHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Rutas</h2>
          <span className="text-muted">Explorador de rutas</span>
        </Col>
      </Row>
    </Container>
  );
};

const ExploradorRutas = () => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formToShow, setFormToShow] = useState(''); 


  const handleEditClick = (user, formType) => {
    setSelectedUser(user);
    setFormToShow(formType); 
    setLgShow(true);
  };


  return (
    <>
      <ProfilerHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <TableExploradorRutas onEditClick={handleEditClick} />
            </Card.Body>
          </Card>        
        </Col>
      </Row>

    </>
  );
};

export default ExploradorRutas;
