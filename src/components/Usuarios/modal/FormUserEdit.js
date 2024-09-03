import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal  } from 'react-bootstrap';


const FormUserEdit = ({ selectedUser, handleCloseModal, handleSaveChanges, setSelectedUser }) => {
  return (
    <>
      <Form>
        <Form.Group controlId="formUserName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={selectedUser.Nombre}
            onChange={(e) => setSelectedUser({ ...selectedUser, Nombre: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formApellidoPat">
          <Form.Label>Apellido Paterno</Form.Label>
          <Form.Control
            type="text"
            value={selectedUser.ApellidoPaterno}
            onChange={(e) => setSelectedUser({ ...selectedUser, ApellidoPaterno: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formApellidoMat">
          <Form.Label>Apellido Materno</Form.Label>
          <Form.Control
            type="text"
            value={selectedUser.ApellidoMaterno}
            onChange={(e) => setSelectedUser({ ...selectedUser, ApellidoMaterno: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formUserEmail">
          <Form.Label>Usuario (Correo)</Form.Label>
          <Form.Control
            type="email"
            value={selectedUser.Correo}
            onChange={(e) => setSelectedUser({ ...selectedUser, Correo: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formUserStatus">
          <Form.Label>Estatus</Form.Label>
          <Form.Control
            as="select"
            value={selectedUser.EstatusID}
            onChange={(e) => setSelectedUser({ ...selectedUser, EstatusID: e.target.value })}
          >
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </>
  );
};

FormUserEdit.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired
};

export default FormUserEdit;
