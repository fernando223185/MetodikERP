import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, Spinner, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useAvanzaReserva } from '../../../../hooks/Comercial/Reserva/useReservaD';

const getInitialValues = (reservaId) => {
  const initialForm = {
    movimiento: '',
    origen: '',
    destino: '',
    dateSalida: null,
    dateRegreso: null,
    referencia: '',
    observaciones: ''
  };

  if (reservaId) {
    return {
      movimiento: reservaId.Movimiento || '',
      origen: reservaId.Origen || '',
      destino: reservaId.Destino || '',
      dateSalida: reservaId.FechaA ? moment(reservaId.FechaA, 'DD-MM-YYYY').toDate() : null,
      dateRegreso: reservaId.FechaD ? moment(reservaId.FechaD, 'DD-MM-YYYY').toDate() : null,
      referencia: reservaId.Referencia,
      observaciones: reservaId.Observaciones
    };
  }
  return initialForm;
};

const validationSchema = Yup.object().shape({
  movimiento: Yup.string().required('Movimiento es obligatorio'),
  origen: Yup.string().required('Origen es obligatorio'),
  destino: Yup.string().required('Destino es obligatorio'),
  dateSalida: Yup.date().required('Fecha de salida es obligatoria'),
  //dateRegreso: Yup.date().required('Fecha de regreso es obligatoria'),
});

const InfoDCard = ({ reservaId, movimientos, origenes, isLoading, setHasFetched, setUpdtRutas, setShowDateRegreso, showDateRegreso }) => {

  const { avanzarReserva, result: resultNew, isLoading: isLoadingNew } = useAvanzaReserva();

  const formik = useFormik({
    initialValues: getInitialValues(reservaId),
    validationSchema,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      try {
        const data = {
          ID: reservaId.ID,
          Movimiento: values.movimiento,
          OrigenID: values.origen,
          DestinoID: values.destino,
          FechaSalida: values.dateSalida ? moment(values.dateSalida).format('YYYY-MM-DD 00:00:00') : null,
          FechaRegreso: values.dateRegreso ? moment(values.dateRegreso).format('YYYY-MM-DD 00:00:00') : null,
          Referencia: values.referencia,
          Observaciones: values.observaciones
        };
          
        console.log('Formulario enviado:', JSON.stringify(data));
        avanzarReserva({ data });

      } catch (error) {
        console.error('Error enviando el formulario', error);
        toast.error('Error al enviar el formulario', {
          theme: 'colored',
          position: 'top-right',
        });
      }
    },
  });

  const getOptionByValue = (options, value) => {

    const result = options.find(option => option.Valor === value) || null;
    if (result) {
      return { value: result.Valor, label: result.Dato };
    }
    
    return null; 
  };

  useEffect(() => {
    if (reservaId) {
      formik.setValues(getInitialValues(reservaId));
    }
  }, [reservaId]);

  useEffect(() => {
    console.log(resultNew)
    if (resultNew && Object.keys(resultNew).length === 0) {
      console.log("resultNew es un array vacío:", resultNew);
    } else if (resultNew && resultNew.status === 200) {
        toast[resultNew.data[0].Tipo](`${resultNew.data[0].Mensaje}`, {
            theme: 'colored',
            position: resultNew.data[0].Posicion
        });
        setTimeout(() => {
          setHasFetched((prev) => !prev); 
          setUpdtRutas(true)
        }, 1000)
    } else if (resultNew) {
        toast.error(`Error al guardar`, {
            theme: 'colored',
            position: 'top-right'
        });
    }  }, [resultNew])

    const handleMovimientoChange = (option) => {
      formik.setFieldValue('movimiento', option.value);
  
      if (option.value === 'Viaje Sencillo') {
        setShowDateRegreso(false);
        formik.setFieldValue('dateRegreso', null); 

      } else {
        setShowDateRegreso(true);
      }
    };

    const { getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Movimiento</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={movimientos.map(item => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={handleMovimientoChange}
                    isLoading={isLoading}
                    value={getOptionByValue(movimientos, formik.values.movimiento)} 
                  />
                  {formik.touched.movimiento && formik.errors.movimiento && (
                    <div className="text-danger">{formik.errors.movimiento}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Origen</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={origenes.map(item => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={option => formik.setFieldValue('origen', option.value)}
                    isLoading={isLoading}
                    value={getOptionByValue(origenes, formik.values.origen)} 
                  />
                  {formik.touched.origen && formik.errors.origen && (
                    <div className="text-danger">{formik.errors.origen}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Destino</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={origenes.map(item => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={option => formik.setFieldValue('destino', option.value)}
                    isLoading={isLoading}
                    value={getOptionByValue(origenes, formik.values.destino)} 
                  />
                  {formik.touched.destino && formik.errors.destino && (
                    <div className="text-danger">{formik.errors.destino}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha Salida</Form.Label>
                  <DatePicker
                    selected={formik.values.dateSalida}
                    onChange={date => formik.setFieldValue('dateSalida', date)}
                    className="form-control"
                    placeholderText="Selecciona una fecha"
                    dateFormat="dd-MM-yyyy"
                    locale="es"
                  />
                  {formik.touched.dateSalida && formik.errors.dateSalida && (
                    <div className="text-danger">{formik.errors.dateSalida}</div>
                  )}
                </Form.Group>
              </Col>
              {showDateRegreso && (
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Fecha Regreso</Form.Label>
                    <DatePicker
                      selected={formik.values.dateRegreso}
                      onChange={date => formik.setFieldValue('dateRegreso', date)}
                      className="form-control"
                      placeholderText="Selecciona una fecha"
                      dateFormat="dd-MM-yyyy"
                      locale="es"
                    />
                    {formik.touched.dateRegreso && formik.errors.dateRegreso && (
                      <div className="text-danger">{formik.errors.dateRegreso}</div>
                    )}
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row className='mt-3'>
              <Col md={6}>
                <Form.Group controlId="formObs">
                  <Form.Label>Observaciones</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      {...getFieldProps('observaciones')}
                      isInvalid={!!formik.errors.Cantidad && formik.touched.Cantidad}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.Cantidad}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formRef">
                  <Form.Label>Referencia</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      {...getFieldProps('referencia')}
                      isInvalid={!!formik.errors.Cantidad && formik.touched.Cantidad}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.Cantidad}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <hr style={{ margin: '10px 0' }} className="mt-4" />

            <div className="d-flex justify-content-start mt-2">
              {isLoadingNew ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <button type="submit" className="btn btn-outline-primary rounded-pill">
                  <FontAwesomeIcon icon={faSave} />
                </button>
              )}
            </div>
          </Card.Body>
        </Card>
      </form>
    </FormikProvider>
  );
};

export default InfoDCard;
