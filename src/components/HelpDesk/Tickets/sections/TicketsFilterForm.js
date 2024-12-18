import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const TicketsFilterForm = ({ estatus, personas, areas, prioridad, setFilter, filter }) => {
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [selectedEstatus, setSelectedEstatus] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState(null);
  const [selectedPrioridad, setSelectedPrioridad] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);



  const handlePersonasChange = (selectedOption) => {
    setSelectedPersonas(selectedOption); 
  };

  const handleEstatusChange = (selectedOption) => {
    setSelectedEstatus(selectedOption); 
  };

  const handleAreasChange = (selectedOption) => {
    setSelectedAreas(selectedOption);
  };

  const handlePrioridadChange = (selectedOption) => {
    setSelectedPrioridad(selectedOption);
  };

  const handleSearch = () => {
    const data = {
      EstatusID: selectedEstatus ? selectedEstatus.value : null,
      PersonaID: selectedPersonas ? selectedPersonas.value : null,
      FechaDesde: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      FechaHasta: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      AreaID: selectedAreas ? selectedAreas.value : null,
      Prioridad: selectedPrioridad ? selectedPrioridad.value : null
    };

    setFilter(data); 
  };

  useEffect(() => {
    if (filter) {
      
      setSelectedPersonas(
        personas.find(est => est.Valor === filter.PersonaID) ? { value: filter.EstatusID, label: estatus.find(est => est.Valor === filter.PersonaID).Dato } : null
      );
      setSelectedEstatus(
        estatus.find(est => est.Valor === filter.EstatusID) ? { value: filter.EstatusID, label: estatus.find(est => est.Valor === filter.EstatusID).Dato } : null
      );
      setSelectedAreas(
        areas.find(sit => sit.Valor === filter.AreaID) ? { value: filter.Situacion, label: areas.find(sit => sit.Valor === filter.AreaID).Dato } : null
      );
      setSelectedPrioridad(
        prioridad.find(usr => usr.Valor === filter.Prioridad) ? { value: filter.Usuario, label: prioridad.find(usr => usr.Valor === filter.Prioridad).Dato } : null
      );
      setStartDate(filter.FechaDesde ? moment(filter.FechaDesde).toDate() : null);
      setEndDate(filter.FechaHasta ? moment(filter.FechaHasta).toDate() : null);
    }
  }, [filter, areas, estatus, prioridad]);

  return (
    <Card className="shadow-none shadow-show-xl">
      <Card.Header className="bg-body-tertiary d-none d-xl-block">
        <h6 className="mb-0">Filtro</h6>
      </Card.Header>
      <Card.Body>
        <Form>
          <div className="mb-2 mt-n2">
            <Form.Group>
              <Form.Label>Prioridad</Form.Label>
              <Select
                classNamePrefix="react-select"
                options={prioridad.map(item => ({
                  value: item.Valor,
                  label: item.Dato
                }))}
                value={selectedPrioridad}
                onChange={handlePrioridadChange}
                placeholder="Selecciona"
              />
            </Form.Group>
          </div>
          <div className="mb-2">
            <Form.Label className="mb-1 mt-2 fs--1">Estatus</Form.Label>
            <Select
              classNamePrefix="react-select"
              options={estatus.map(item => ({
                value: item.Valor,
                label: item.Dato
              }))}
              value={selectedEstatus}
              onChange={handleEstatusChange}
              placeholder="Selecciona"
            />
          </div>
          <div className="mb-2">
            <Form.Label className="mb-1 mt-2 fs--1">Personas</Form.Label>
            <Select
              classNamePrefix="react-select"
              options={personas.map(item => ({
                value: item.Valor,
                label: item.Dato
              }))}
              value={selectedPersonas}
              onChange={handlePersonasChange}
              placeholder="Selecciona"
            />
          </div>
          <div className="mb-2">
            <Form.Label className="mb-1 mt-2 fs--1">Area</Form.Label>
            <Select
              classNamePrefix="react-select"
              options={areas.map(item => ({
                value: item.Valor,
                label: item.Dato
              }))}
              value={selectedAreas}
              onChange={handleAreasChange}
              placeholder="Selecciona"
            />
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

export default TicketsFilterForm;
