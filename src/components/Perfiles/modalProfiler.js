import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import FalconCloseButton from 'components/common/FalconCloseButton';
import FormProfilerEdit from './modal/FormProfilerEdit'; 
import FormProfilerAdd from './modal/FormProfilerAdd'

export default function ModalProfiler({ id, EmpresaID, warehouseID, formToShow, openModal, handleCloseModal, selectedUser, setSelectedUser, handleSaveChanges }) {
    console.log({ id, warehouseID, formToShow, openModal, selectedUser });
    return (
    <>
      {openModal && (
        <Modal
          size="lg"
          show={openModal}
          onHide={handleCloseModal}
          aria-labelledby="modal-form-label"
          aria-describedby="modal-form-description"
          sx={{ '& .MuiPaper-root:focus': { outline: 'none' } }}
        >
          <Modal.Header>
            <Modal.Title id="modal-form-label">
              {formToShow === 'EditUser' ? 'Editar Perfil' :  'Nuevo Perfil'}
            </Modal.Title>
            <FalconCloseButton onClick={handleCloseModal}/>
          </Modal.Header>
          <Modal.Body>
            {formToShow === 'NewUser' ? (
              <FormProfilerAdd id={Number(id)} handleCloseModal={handleCloseModal} warehouseId={Number(warehouseID)} EmpresaID={Number(EmpresaID)}/>
            ) : formToShow === 'EditUser' ? (
              <FormProfilerEdit 
                selectedUser={selectedUser}
                handleCloseModal={handleCloseModal}
                handleSaveChanges={handleSaveChanges}
                setSelectedUser={setSelectedUser}
              />
            ) : (
              <div>No se encontró el formulario adecuado.</div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

ModalProfiler.propTypes = {
  id: PropTypes.number,
  warehouseID: PropTypes.number,
  formToShow: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired
};
