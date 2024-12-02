import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faReply, faSave } from '@fortawesome/free-solid-svg-icons';

const ModalDescensos = ({ show, handleClose, formik, destinos }) => {
    const { values, handleChange, handleBlur, handleSubmit, setValues, resetForm } = formik;
    const [ selectedDestino, setSelectedDestino ] = useState([]);

    useEffect(() => {
        if (destinos.length > 0 && values.DestinoID) {
            const currentDestino = destinos.find(item => item.Valor === values.DestinoID.toString());
            setSelectedDestino(currentDestino ? { value: currentDestino.Valor, label: currentDestino.Dato } : null);
        };
    }, [destinos, values]);

    const handleDestinoChange = (option) => {
        setSelectedDestino(option);
        setValues({...values, DestinoID: option ? option.value : null });
        console.log(values.DestinoDID)
    };

    // const handleSave = () => {
    //     handleSubmit();

    //     setTimeout(() => {
    //         resetForm();
    //         setSelectedDestino(null);
    //     }, 200);
    // };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Descenso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="rutaID">
                        <Form.Label>RutaID</Form.Label>
                        <Form.Control
                            type="number"
                            name="RutaID"
                            value={values.RutaID || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Origen</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            options={destinos.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                            }))}
                            placeholder="Selecciona un destino"
                            onChange={handleDestinoChange}
                            value={selectedDestino}
                        />
                        </Form.Group>

                    <Form.Group controlId="tiempo">
                        <Form.Label>Tiempo</Form.Label>
                        <Form.Control
                            type="number"
                            name="Tiempo"
                            value={values.Tiempo || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="kilometros">
                        <Form.Label>Kilómetros</Form.Label>
                        <Form.Control
                            type="number"
                            name="Kilometros"
                            value={values.Kilometros || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="precioNino">
                        <Form.Label>Precio Niño</Form.Label>
                        <Form.Control
                            type="number"
                            name="PrecioNino"
                            value={values.PrecioNino || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="precioAdulto">
                        <Form.Label>Precio Adulto</Form.Label>
                        <Form.Control
                            type="number"
                            name="PrecioAdulto"
                            value={values.PrecioAdulto || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="precioInapam">
                        <Form.Label>Precio Inapam</Form.Label>
                        <Form.Control
                            type="number"
                            name="PrecioInapam"
                            value={values.PrecioInapam || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end mt-3">
                        <IconButton
                            variant="falcon-default"
                            size="sm"
                            icon={faReply}
                            className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                            onClick={handleClose}
                        >
                        Regresar
                        </IconButton>
                        <IconButton
                            variant="falcon-primary"
                            size="sm"
                            icon={faSave}
                            className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                            onClick={handleSubmit}
                        >
                        Guardar
                        </IconButton>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDescensos;