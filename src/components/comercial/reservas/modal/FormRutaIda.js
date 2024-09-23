import React, {  useEffect  } from 'react';
import { Modal, Button, Row, Col, InputGroup, Form } from 'react-bootstrap';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faChevronLeft, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import { useParams } from 'react-router-dom';
import { useActReservaD } from '../../../../hooks/Comercial/Reserva/useReservaD'
import { toast } from 'react-toastify';



const FormRutaIda = ({ show, handleClose, selectedItem, setUpdateList }) => {
  const { id } = useParams();
  const { actReservaD, result: resultNew, isLoading } = useActReservaD();


  const formik = useFormik({
    initialValues: {
        ID: id,
        HorarioRutaID: selectedItem ? selectedItem.HRutaID : 0,
        Precio: selectedItem ? selectedItem.Precio : 0,
        descripcion: selectedItem ? selectedItem.Descripcion : '',
        Cantidad: 0 ,
        TipoViaje: selectedItem ? selectedItem.TipoViaje : ''
    },
    validationSchema: Yup.object({
        Cantidad: Yup.number()
        .typeError('Debe ser un número') 
        .required('Cantidad requerida')  
        .min(1, 'La cantidad debe ser mayor que 0') 
    }),
    onSubmit: (values) => {
        console.log('Formulario enviado:', values);
        actReservaD({ data: values })
    }
  });

    useEffect(() => {
        if (resultNew && Object.keys(resultNew).length === 0) {
            console.log("resultNew es un array vacío:", resultNew);
        } else if (resultNew && resultNew.status === 200) {
            toast[resultNew.data[0].Tipo](`${resultNew.data[0].Mensaje}`, {
                theme: 'colored',
                position: resultNew.data[0].Posicion,
                icon: resultNew.data[0].Tipo === 'success' ? 
                <FontAwesomeIcon icon={faCheckCircle} /> : 
                resultNew.data[0].Tipo === 'error' ? 
                <FontAwesomeIcon icon={faExclamationTriangle} /> : 
                <FontAwesomeIcon icon={faInfoCircle} />
            });  
            setTimeout(() => {
                setUpdateList((prev) => !prev); 
                handleClose();
            }, 1000)
        } else if (resultNew) {
            toast.error(`Error al guardar`, {
                theme: 'colored',
                position: 'top-right'
            });
        } 
    }, [resultNew])

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Rutas </Modal.Title>
        <FalconCloseButton onClick={handleClose} />
      </Modal.Header>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mt-2">
              <Col md={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label>Descripcion</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                    <Form.Control
                      type="text"
                      {...getFieldProps('descripcion')}
                      isInvalid={!!errors.descripcion && touched.descripcion}
                      readOnly
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.descripcion}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}>
                <Form.Group controlId="formApellidoPat">
                  <Form.Label>Cantidad</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                    <Form.Control
                      type="number"
                      {...getFieldProps('Cantidad')}
                      isInvalid={!!errors.Cantidad && touched.Cantidad}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Cantidad}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="mt-4">
            <button
                className="btn btn-outline-secondary rounded-pill me-1 mb-1 btn-sm"
                onClick={handleClose}
            >
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <button
                className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
                type="submit"          
            >
            <FontAwesomeIcon icon={faSave} />
          </button>
          </Modal.Footer>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default FormRutaIda;
