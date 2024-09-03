import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';
import TableUsers from './tables/tableUsers';
import ModalUser from './modalUser';



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
      <UsersHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <TableUsers onEditClick={handleEditClick} />
            </Card.Body>
          </Card>        
        </Col>
      </Row>

      <ModalUser
        id={selectedUser ? selectedUser.id : null}
        formToShow={formToShow}
        openModal={lgShow}
        handleCloseModal={handleCloseModal}
        warehouseID={null}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default Users;
