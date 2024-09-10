import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';
import TableProfiles from './tables/tableProfiles';
//import ModalUser from './modalUser';



const ProfilerHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Perfiles</h2>
          <span className="text-muted">Configuracion de Perfiles</span>
        </Col>
      </Row>
    </Container>
  );
};

const Profiles = () => {
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
      <ProfilerHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <TableProfiles onEditClick={handleEditClick} />
            </Card.Body>
          </Card>        
        </Col>
      </Row>
    </>
  );
};

export default Profiles;
