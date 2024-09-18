import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useActDatosPasajero } from '../../../../hooks/Comercial/Reserva/useReservaD'

const getInitialValues = (pasajero) => {
  return {
    ID: pasajero?.ID || 0,
    RenglonID: pasajero?.RenglonID || 0,
    HorarioRutaID: pasajero?.HorarioRutaID || 0,
    Nombre: pasajero?.Nombre || '',
    Email: pasajero?.Email || '',
    FechaNacimiento: pasajero?.FechaNacimiento ? moment(pasajero.FechaNacimiento, 'DD-MM-YYYY').toDate() : null,
    Telefono: pasajero?.Telefono || '',
    Curp: pasajero?.Curp || '',
    Asiento: pasajero?.Asiento || 0
  };
};

const validationSchema = Yup.object().shape({
  Nombre: Yup.string().required('Nombre es obligatorio'),
  FechaNacimiento: Yup.date().required('Fecha de nacimiento es obligatoria'),
  Email: Yup.string()
    .required('El email es obligatorio')
    .email('El formato del email no es válido'),
    Curp: Yup.string()
    .matches(
      /^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z0-9]{3}[A-Z0-9]\d$/,
      'CURP no tiene el formato correcto'
    )
    .required('CURP es obligatoria')
});

const PasajeroInfo = ({ index, pasajero }) => {
  const { actDatosAsync, result, isLoading } = useActDatosPasajero();

  const formik = useFormik({
    initialValues: getInitialValues(pasajero),
    validationSchema,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      try {
        console.log('Formulario enviado:', JSON.stringify(values));
        await actDatosAsync({ data: values });

      } catch (error) {
        console.error('Error enviando el formulario', error);
        toast.error('Error al enviar el formulario', {
          theme: 'colored',
          position: 'top-right',
        });
      }
    },
  });

  useEffect(() => {
    console.log(result)
    if (result && Object.keys(result).length === 0) {
      console.log("result es un array vacío:", result);
    } else if (result && result.status === 200) {
        toast[result.data[0].Tipo](`${result.data[0].Mensaje}`, {
            theme: 'colored',
            position: result.data[0].Posicion
        });

    } else if (!result) {
        toast.error(`Error al guardar`, {
            theme: 'colored',
            position: 'top-right'
        });
    }  }, [result])

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
                  <Form.Control 
                    type="text" 
                    name="Nombre" 
                    value={formik.values.Nombre} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.Nombre && formik.errors.Nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.Nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="curp">
                  <Form.Label>CURP</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="Curp" 
                    value={formik.values.Curp} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.Curp && formik.errors.Curp}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.Curp}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="Email" 
                    value={formik.values.Email} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.Email && formik.errors.Email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.Email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="Telefono" 
                    value={formik.values.Telefono} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.Telefono && formik.errors.Telefono}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.Telefono}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Fecha Nacimiento</Form.Label>
                  <DatePicker
                    selected={formik.values.FechaNacimiento}
                    onChange={date => formik.setFieldValue('FechaNacimiento', date)}
                    className="form-control"
                    placeholderText="Selecciona una fecha"
                    dateFormat="dd-MM-yyyy"
                    locale="es"
                  />
                  {formik.touched.FechaNacimiento && formik.errors.FechaNacimiento && (
                    <div className="text-danger">{formik.errors.FechaNacimiento}</div>
                  )}
                </Form.Group>

                <div className="d-flex justify-content-start mt-2">
                  {isLoading ? (
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

export default PasajeroInfo;
