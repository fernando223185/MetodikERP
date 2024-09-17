import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';
import TableChoferes from './tableChoferes';
//import ModalUser from './modalUser';

const ChoferesHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Choferes</h2>
          <span className="text-muted">Modúlo de configuration de Choferes</span>
        </Col>
      </Row>
    </Container>
  );
};

const Choferes = () => {
  
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
    // Lógica para guardar los cambios
    console.log('Usuario actualizado:', selectedUser);
    setLgShow(false);
  };

  return (
    <>
      <ChoferesHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <TableChoferes />
            </Card.Body>
          </Card>        
        </Col>
      </Row>
    </>
  );
};

export default Choferes;