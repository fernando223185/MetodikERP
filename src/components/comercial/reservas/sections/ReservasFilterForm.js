import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import Select from 'react-select';


const ReservaFilterForm = ({movimientos}) => {
    const [selectedMovimiento, setSelectedMovimiento] = useState(null);

    const handleMovimientoChange = (selectedOption) => {
      setSelectedMovimiento(selectedOption); 
      console.log('Selected:', selectedOption); 
    };
  return (
    <Card className="shadow-none shadow-show-xl scrollbar">
      <Card.Header className="bg-body-tertiary d-none d-xl-block">
        <h6 className="mb-0">Filtro</h6>
      </Card.Header>
      <Card.Body>
        <Form>
          <div className="mb-2 mt-n2">
          <Form.Group>
            <Form.Label>Movimiento</Form.Label>
            <Select
                classNamePrefix="react-select"
                options={movimientos.map(item => ({
                value: item.Valor,
                label: item.Dato,
                }))}
                value={selectedMovimiento}
                onChange={handleMovimientoChange} 
                placeholder="Selecciona un movimiento"
            />
            </Form.Group>
          </div>
          <div className="mb-2">
            <Form.Label className="mb-1 mt-2 fs--1">Estatus</Form.Label>
            <Form.Select defaultValue="Facebook" size="sm">
              <option>None</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Facebook</option>
              <option>Twitter</option>
              <option>Chat</option>
              <option>Whatsapp</option>
              <option>Portal</option>
              <option>Bots</option>
              <option>External Email</option>
              <option>Ecommerce</option>
              <option>Feedback Widget</option>
            </Form.Select>
          </div>
        </Form>
      </Card.Body>
      <Card.Footer className="border-top border-200 py-x1">
        <Button varient="primary" className="w-100">
          Buscar             
            <FontAwesomeIcon
              icon={faSearch}
              transform="shrink-2"
              className="ms-1"
            />
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ReservaFilterForm;
