import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";

const RutasFilterForm = ({ movimientos, estatus, setFilter, filter }) => {
  const [selectedRuta, setSelectedRuta] = useState(null);
  const [selectedOrigen, setSelectedOrigen] = useState(null);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [selectedHoraSalida, setSelectedHoraSalida] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleRutaChange = (selectedOption) => {
    setSelectedRuta(selectedOption);
  };
  const handleOrigenChange = (selectedOption) => {
    setSelectedOrigen(selectedOption);
  };
  const handleDestinoChange = (selectedOption) => {
    setSelectedDestino(selectedOption);
  };



  const handleSearch = () => {
    const data = {
      RutaID: selectedRuta ? selectedRuta.value : null,
      OrigenID: selectedOrigen ? selectedOrigen.value : null,
      DestinoID: selectedDestino ? selectedDestino.value : null,
      HoraSalida: selectedHoraSalida ? moment(selectedHoraSalida).format("HH:mm") : null,
      FechaDesde: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      FechaHasta: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
    };

    setFilter(data);
  };


  return (
    <Card className="shadow-none shadow-show-xl">
      <Card.Header className="bg-body-tertiary d-none d-xl-block">
        <h6 className="mb-0"></h6>
      </Card.Header>
      <Card.Body>
        <Form>
          <div className="mb-2 mt-n2">
            <Form.Group>
              <Form.Label>Ruta</Form.Label>
              <Select
                classNamePrefix="react-select"
                options={movimientos.map((item) => ({
                  value: item.Valor,
                  label: item.Dato,
                }))}
                value={selectedRuta}
                onChange={handleRutaChange}
                placeholder="Selecciona"
              />
            </Form.Group>
          </div>
          <div className="mb-2">
            <Form.Label className="mb-1 mt-2 fs--1">Origen</Form.Label>
            <Select
              classNamePrefix="react-select"
              options={estatus.map((item) => ({
                value: item.Valor,
                label: item.Dato,
              }))}
              value={selectedOrigen}
              onChange={handleOrigenChange}
              placeholder="Selecciona"
            />
          </div>
          <div className="mb-2">
            <Form.Label className="mb-1 mt-2 fs--1">Destino</Form.Label>
            <Select
              classNamePrefix="react-select"
              options={estatus.map((item) => ({
                value: item.Valor,
                label: item.Dato,
              }))}
              value={selectedDestino}
              onChange={handleDestinoChange}
              placeholder="Selecciona"
            />
          </div>
          <div className="mb-2">
            <Form.Label>Hora Salida</Form.Label>
            <DatePicker
              className="form-control"
              placeholderText="Seleccionar horario"
              timeIntervals={5}
              dateFormat="h:mm aa"
              showTimeSelect
              showTimeSelectOnly
              selected={selectedHoraSalida}
              onChange={(date) => setSelectedHoraSalida(date)}
            />
          </div>
          <div className="mb-2">
            <Form.Label>Fecha Desde</Form.Label>
            <DatePicker
              className="form-control"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
              onChange={(date) => setEndDate(date)}
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

export default RutasFilterForm;
