import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";

const PreciosRutasFilterForm = ({ destinos, setFilter, filter }) => {
  const [selectedOrigen, setSelectedOrigen] = useState(null);
  const [selectedDestino, setSelectedDestino] = useState(null);

  const handleOrigenChange = (selectedOption) => {
    setSelectedOrigen(selectedOption);
  };

  const handleDestinoChange = (selectedOption) => {
    setSelectedDestino(selectedOption);
  };

  const handleSearch = () => {
    const data = {
      OrigenID: selectedOrigen ? selectedOrigen.value : 0,
      DestinoID: selectedDestino ? selectedDestino.value : 0,
    };
    setFilter(data);
  };

  useEffect(() => {
    if (filter) {
      setSelectedOrigen(
        destinos.find((usr) => usr.Valor === filter.OrigenID)
          ? {
              value: filter.OrigenID,
              label: destinos.find((usr) => usr.Valor === filter.OrigenID).Dato,
            }
          : null
      );
      setSelectedDestino(
        destinos.find((usr) => usr.Valor === filter.DestinoID)
          ? {
              value: filter.DestinoID,
              label: destinos.find((usr) => usr.Valor === filter.DestinoID).Dato,
            }
          : null
      );
    }
  }, [filter, destinos]);

  return (
    <Card className="shadow-none shadow-show-xl">
      <Card.Header className="bg-body-tertiary d-none d-xl-block">
        <h6 className="mb-0">Filtro</h6>
      </Card.Header>
      <Card.Body>
        <Form>
          <div className="mb-2 mt-n2">
            <Form.Group>
              <Form.Label>Origen</Form.Label>
              <Select
                classNamePrefix="react-select"
                options={destinos.map((item) => ({
                  value: item.Valor,
                  label: item.Dato,
                }))}
                value={selectedOrigen}
                onChange={handleOrigenChange}
                placeholder="Selecciona"
              />
            </Form.Group>
          </div>
          <div className="mb-2">
            <Form.Label className="mb-1 mt-2 fs--1">Destino</Form.Label>
            <Select
              classNamePrefix="react-select"
              options={destinos.map((item) => ({
                value: item.Valor,
                label: item.Dato,
              }))}
              value={selectedDestino}
              onChange={handleDestinoChange}
              placeholder="Selecciona"
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

export default PreciosRutasFilterForm;
