import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const PaqueteriaEFilterForm = ({ cliente, destino, movimiento, usuarios, setFilter, filter}) => {
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedDestino, setSelectedDestino] = useState(null);
    const [selectedMovimiento, setSelectedMovimiento] = useState(null);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleClienteChange = (selectedOption) => {
        setSelectedCliente(selectedOption);
    }
    const handleDestinoChange = (selectedOption) => {
        setSelectedDestino(selectedOption);
    }
    const handleMovimientoChange = (selectedOption) => {
        setSelectedMovimiento(selectedOption);
    }
    const handleUsuarioChange = (selectedOption) => {
        setSelectedUsuario(selectedOption);
    }

    const handleSearch =() => {
        const data = {
            ClienteID: selectedCliente? selectedCliente.value : null,
            DestinoID: selectedDestino? selectedDestino.value : null,
            MovimientoID: selectedMovimiento? selectedMovimiento.value : null,
            UsuarioID: selectedUsuario? selectedUsuario.value : null,
            FechaDesde: startDate? moment(startDate).format('YYYY-MM-DD') : null,
            FechaHasta: endDate? moment(endDate).format('YYYY-MM-DD') : null,
        };
        setFilter(data);
    }

    useEffect(() => {
        if (filter) {
            setSelectedCliente(
                cliente.find(cte => cte.Valor === filter.Cliente) ? {value: filter.Cliente, label: cliente.find(cte => cte.valor === filter.Cliente).Dato} : null
            );
            setSelectedDestino(
                destino.find(dst => dst.Valor === filter.Destino) ? {value: filter.Destino, label: destino.find(dst => dst.Valor === filter.Destino).Dato} : null
            );
            setSelectedMovimiento(
                movimiento.find(mov => mov.Valor === filter.Movimiento) ? {value: filter.Movimiento, label: movimiento.find(mov => mov.Valor === filter.Movimiento).Dato} : null
            );
            setSelectedUsuario(
                usuarios.find(usr => usr.Valor === filter.Usuario) ? {value: filter.Usuario, label: usuarios.find(usr => usr.Valor === filter.Usuario).Dato} : null
            );
            setStartDate(filter.FechaDesde ? moment(filter.FechaDesde).toDate() : null);
            setEndDate(filter.FechaHasta ? moment(filter.FechaHasta).toDate() : null);
        }
    },[filter, cliente, destino, movimiento, usuarios])

    return(
        <Card className="shadow-none shadow-show-xl">
          <Card.Header className='bg-body-tertiary d-none d-xl-block'>
              <h6 className='mb-0'>Filtro</h6>
          </Card.Header>
          <Card.Body>
            <Form>
              <div className='mb-2 mt-n2'>
                  <Form.Group>
                  <Form.Label className="mb-1 mt-2 fs--1">Cliente</Form.Label>
                  <Select
                  classNamePrefix="react-select"
                  options={cliente.map(item => ({
                      value: item.Valor,
                      label: item.Dato
                  }))}
                  value={selectedCliente}
                  onChange={handleClienteChange}
                  placeholder="Selecciona"
                  />
                  </Form.Group>
              </div>
              <div className='mb-2 mt-n2'>
                  <Form.Group>
                  <Form.Label className="mb-1 mt-2 fs--1">Destino</Form.Label>
                  <Select
                  classNamePrefix="react-select"
                  options={destino.map(item => ({
                      value: item.Valor,
                      label: item.Dato
                  }))}
                  value={selectedDestino}
                  onChange={handleDestinoChange}
                  placeholder="Selecciona"
                  />
                  </Form.Group>
              </div>
              <div className='mb-2 mt-n2'>
                  <Form.Group>
                  <Form.Label className="mb-1 mt-2 fs--1">Movimiento</Form.Label>
                  <Select
                  classNamePrefix="react-select"
                  options={movimiento.map(item => ({
                      value: item.Valor,
                      label: item.Dato
                  }))}
                  value={selectedMovimiento}
                  onChange={handleMovimientoChange}
                  placeholder="Selecciona"
                  />
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

export default PaqueteriaEFilterForm;