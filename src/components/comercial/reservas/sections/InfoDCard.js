import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import CustomDateInput from 'components/common/CustomDateInput';



const InfoDCard = () => {

    const [dateSalida, setDateSalida] = useState(null);
    const [dateRegreso, setDateRegreso] = useState(null);


  return (
    <Card className="mb-3">
      <Card.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Movimiento</Form.Label>
                <Select classNamePrefix="react-select">
                  <option>Selecciona un Movimiento</option>
                  {/* Opciones adicionales */}
                </Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Origen</Form.Label>
                <Select classNamePrefix="react-select">
                  <option>Selecciona un Movimiento</option>
                  {/* Opciones adicionales */}
                </Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Destino</Form.Label>
                <Select classNamePrefix="react-select">
                  <option>Selecciona un Movimiento</option>
                  {/* Opciones adicionales */}
                </Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
                <Form.Group>
                    <Form.Label>Fecha Salida</Form.Label>
                    <DatePicker
                        selected={dateSalida}
                        onChange={(date)=>setDateSalida(date)}
                        className='form-control'
                        placeholderText="Select Date"
                        dateFormat="dd-MM-yyyy"
                        locale='es'
                    />               
                </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha Regreso</Form.Label>
                <DatePicker
                    selected={dateRegreso}
                    onChange={(date)=>setDateRegreso(date)}
                    className='form-control'
                    placeholderText="Select Date"
                    dateFormat="dd-MM-yyyy"
                    locale='es'
                />            
                </Form.Group>
            </Col>
          </Row>
          <hr style={{ margin: '10px 0' }} className='mt-4'/>
          <div className="d-flex justify-content-start mt-2">
            <button type="submit" className="btn btn-outline-primary rounded-pill">
                <FontAwesomeIcon icon={faSave}  />
            </button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default InfoDCard;
