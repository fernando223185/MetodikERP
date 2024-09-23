import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';


const CustomerHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Clientes</h2>
          <span className="text-muted">Módulo de administración de clientes</span>
        </Col>
      </Row>
    </Container>
  );
};

const Customers = () => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formToShow, setFormToShow] = useState(''); 


  const handleEditClick = (user, formType) => {
    setSelectedUser(user);
    setFormToShow(formType); 
    setLgShow(true);
  };

  const handleCloseModal = () => {
    setLgShow(false);
    setSelectedUser(null);
  };

  const handleSaveChanges = () => {
    console.log('Usuario actualizado:', selectedUser);
    setLgShow(false);
  };

  return (
    <>
      <CustomerHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>

            </Card.Body>
          </Card>        
        </Col>
      </Row>


    </>
  );
};

export default Customers;
