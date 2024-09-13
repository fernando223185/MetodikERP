import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';


const getInitialValues = (pasajero) => {
    const initialForm = {
        ID: 0,
        RenglonID: 0,
        HorarioRutaID: 0,
        Nombre: '',
        Email: '',
        FechaNacimiento: null,
        Telefono: '',
        Curp: ''
    };
  
    if (pasajero) {
      return {
        ID: pasajero.ID,
        RenglonID: pasajero.RenglonID,
        HorarioRutaID: pasajero.HorarioRutaID,
        Nombre: pasajero.Nombre || '',
        Email: pasajero.Email || '',
        FechaNacimiento: pasajero.FechaNacimiento ? moment(pasajero.FechaNacimiento, 'DD-MM-YYYY').toDate() : null,
        Telefono: pasajero.Telefono,
        Curp: pasajero.Curp
      };
    }
    return initialForm;
  };

  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es obligatorio'),
    FechaNacimiento: Yup.date().required('Fecha de nacimiento es obligatoria'),
  });
  
  

const PasajeroInfo = ({ index, pasajero }) => {
    console.log("Pasa",pasajero)

    useEffect(() => {
        if (pasajero) {
          formik.setValues(getInitialValues(pasajero));
        }
      }, [pasajero]);

    const formik = useFormik({
        initialValues: getInitialValues(pasajero),
        validationSchema,
        enableReinitialize: true, 
        onSubmit: async (values) => {
          try {
 
            console.log('Formulario enviado:', JSON.stringify(values));
            //avanzarReserva({ data: values });
    
          } catch (error) {
            console.error('Error enviando el formulario', error);
            toast.error('Error al enviar el formulario', {
              theme: 'colored',
              position: 'top-right',
            });
          }
        },
    });

    return (
      <Accordion defaultActiveKey="0">
        <Card className="mb-3">
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
              <Row className="align-items-center">
                <Col>
                  <h5>Pasajero #{index + 1} - No. Asiento: { pasajero.Asiento }</h5>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" defaultValue={pasajero.nombre} readOnly />
                    </Form.Group>
                    <Form.Group controlId="edad">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="text" defaultValue={pasajero.edad} readOnly />
                    </Form.Group>
                    <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue={pasajero.email} readOnly />
                    </Form.Group>
                    <div className="d-flex justify-content-start mt-2">
                    {true ? (
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <button type="submit" className="btn btn-outline-primary rounded-pill">
                        <FontAwesomeIcon icon={faSave} />
                        </button>
                    )}
                    </div>
                </Form>
            </FormikProvider>

            </Accordion.Body>
          </Accordion.Item>
        </Card>
      </Accordion>
    );
  };
  

export default PasajeroInfo
  