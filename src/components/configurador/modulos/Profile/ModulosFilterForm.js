import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const ModulosFilterForm = ({  setFilter, filter }) => {
    const [selectedEstatus, setSelectedEstatus] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleTipoChange = (event) => {
        setSelectedTipo(event.target.value);
    };

    const handleSearch = () => {
        const data = {
            EstatusID: selectedEstatus ? selectedEstatus.value : 1,
            Tipo: selectedTipo || '',
            FechaDesde: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
            FechaHasta: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
        };
        setFilter(data);
    };

    useEffect(() => {
        if (filter) {
            
            setSelectedTipo(filter.Tipo || null);
            setStartDate(filter.FechaDesde ? moment(filter.FechaDesde).toDate() : null);
            setEndDate(filter.FechaHasta ? moment(filter.FechaHasta).toDate() : null);
        }
    }, [filter]);

    return (
        <Card className="shadow-none shadow-show-xl">
            <Card.Header className="bg-body-tertiary d-none d-xl-block">
                <h6 className="mb-0">Filtro</h6>
            </Card.Header>
            <Card.Body>
                <Form>
                <div className="mb-2 mt-n2">
                    <Form.Group>
                        <Form.Label className="mb-1 mt-2 fs--1">Tipo</Form.Label>
                        <select
                            className="form-control"
                            value={selectedTipo || ''}
                            onChange={handleTipoChange}
                        >
                            <option value="">Todos</option>
                            <option value="Menu">Menu</option>
                            <option value="Modulo">Modulo</option>
                            <option value="Catalogo">Catalogo</option>
                        </select>
                    </Form.Group>
                </div>
            <div className="mb-2">
            <Form.Label>Fecha Desde</Form.Label>
            <DatePicker
              className="form-control"
              selected={startDate}
              onChange={date => setStartDate(date)}
              placeholderText="Selecciona una fecha"
              dateFormat="dd-MM-yyyy"
              locale="es"
            />
            </div>
            <div className="mb-2">
                <Form.Label>Fecha Hasta</Form.Label>
                <DatePicker
                className="form-control"
                selected={endDate}
                onChange={date => setEndDate(date)}
                placeholderText="Selecciona una fecha"
                dateFormat="dd-MM-yyyy"
                locale="es"
                />
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="border-top border-200 py-x1">
        <Button variant="primary" className="w-100" onClick={handleSearch}>
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

export default ModulosFilterForm;