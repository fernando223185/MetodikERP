import PropTypes from 'prop-types';
import { Modal, Spinner, Button } from 'react-bootstrap';
import FormSprinter from './FormSprinter'; 
import FormCamion from './FormCamion';
import { useGetAsientos, useAgregarAsiento } from '../../../../hooks/Comercial/Reserva/useReservaD';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { toast } from 'react-toastify';

export default function ModalAsientos({ show, selectedItem, handleClose, setUpdateList }) {
    const { getAsientos, asientos, isLoading } = useGetAsientos();
    const { agregarAsiento, result, isLoading: isLoadingAdd } = useAgregarAsiento();

    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatSelection = (selectedSeats) => {
        setSelectedSeats(selectedSeats);
    };

    const handleConfirm = async () => {
        const selectedSeatsString = selectedSeats.join(', ');
        
        const data = {
            ID: selectedItem.ID,
            HorarioRutaID: selectedItem.HorarioRutaID,
            RenglonID: selectedItem.RenglonID,
            Asientos: selectedSeatsString
        };
        await agregarAsiento({ data })
    };

    useEffect(() => {
        if (selectedItem) {
            const data = {
                ID: selectedItem.ID,
                HorarioRutaID: selectedItem.HorarioRutaID,
                RenglonID: selectedItem.RenglonID
            };
            getAsientos({ data });
        }
    }, [selectedItem]);

    useEffect(() =>{
        if (result && Object.keys(result).length === 0) {
            console.log("result es un array vacío:", result);
        } else if (result && result.status === 200) {
            toast[result.data[0].Tipo](`${result.data[0].Mensaje}`, {
                theme: 'colored',
                position: result.data[0].Posicion
            });
            setTimeout(() => {
                setUpdateList((prev) => !prev); 
                handleClose();
            }, 1000)
        } else if (result) {
            toast.error(`Error al guardar`, {
                theme: 'colored',
                position: 'top-right'
            });
        } 
    },[result]);

    if (isLoading) {
        return (
            <>
                {show && (
                    <Modal
                        size="lg"
                        show={show}
                        onHide={handleClose}
                        aria-labelledby="modal-form-label"
                        aria-describedby="modal-form-description"
                    >
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </Modal>
                )}
            </>
        );
    }

    if (!asientos || asientos.length === 0) {
        return null; 
    }

    return (
        <>
            {show && (
                <Modal
                    size="lg"
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="modal-form-label"
                    aria-describedby="modal-form-description"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Selecciona tus asientos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {asientos[0].TipoCamion === "Sprinter" ? (
                            <FormSprinter asientos={asientos} onConfirm={handleSeatSelection} />
                        ) : asientos[0].TipoCamion === "Camion" ? (
                            <FormCamion totalSeats={asientos[0].NoAsientos} onConfirm={handleSeatSelection} />
                        ) : (
                            <div>No se encontró el formulario adecuado.</div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {isLoadingAdd ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <>
                                <button
                                    className="btn btn-outline-secondary rounded-pill me-1 mb-1 btn-sm"
                                    onClick={handleClose} 
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button
                                    className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
                                    onClick={handleConfirm}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

ModalAsientos.propTypes = {
    show: PropTypes.bool.isRequired,
    selectedItem: PropTypes.object,
    handleClose: PropTypes.func.isRequired  
};
