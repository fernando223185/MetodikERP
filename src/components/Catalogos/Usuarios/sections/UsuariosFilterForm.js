import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import Select from 'react-select';

const UsuariosFilterForm = ({estatus, empresa, sucursal, setFilter, filter}) => {
    const [selectedEstatus, setSelectedEstatus] = useState(null);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [selectedSucursal, setSelectedSucursal] = useState(null);

    const handleEstatusChange = (selectedOption) => {
        setSelectedEstatus(selectedOption);
    };
    const handleEmpresaChange = (selectedOption) => {
        setSelectedEmpresa(selectedOption);
    };
    const handleSucursalChange = (selectedOption) => {
        setSelectedSucursal(selectedOption);
    };

    const handleSearch = () => {
        const data = {
            EstatusID: selectedEstatus ? selectedEstatus.value : null,
            EmpresaID: selectedEmpresa ? selectedEmpresa.value : null,
            SucursalID: selectedSucursal ? selectedSucursal.value : null,
        };

        console.log(data);
        setFilter(data);
    };

    useEffect(() => {
        if(filter) {
            setSelectedEstatus(
                estatus.find(est => est.Valor === filter.EstatusID)
                    ? { value: filter.EstatusID, label: estatus.find(est => est.Valor === filter.EstatusID).Dato } : null
            );

            setSelectedEmpresa(
                empresa.find(emp => emp.Valor === filter.EmpresaID)
                    ? { value: filter.EmpresaID, label: empresa.find(emp => emp.Valor === filter.EmpresaID).Dato } : null
            )

            setSelectedSucursal(
                sucursal.find(suc => suc.Valor === filter.SucursalID)
                    ? { value: filter.SucursalID, label: sucursal.find(suc => suc.Valor === filter.SucursalID).Dato } : null
            )
        }
    }, [filter, estatus, sucursal, empresa]);


    return (
        <Card className="shadow-none shadow-show-xl">
            <Card.Body>
                <Form>
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
                    <Form.Label className="mb-1 mt-2 fs--1">Empresa</Form.Label>
                    <Select
                    classNamePrefix="react-select"
                    options={empresa.map(item => ({
                        value: item.Valor,
                        label: item.Dato
                    }))}
                    value={selectedEmpresa}
                    onChange={handleEmpresaChange}
                    placeholder="Selecciona"
                    />
                </div>
                <div className="mb-2">
                    <Form.Label className="mb-1 mt-2 fs--1">Sucursal</Form.Label>
                    <Select
                    classNamePrefix="react-select"
                    options={sucursal.map(item => ({
                        value: item.Valor,
                        label: item.Dato
                    }))}
                    value={selectedSucursal}
                    onChange={handleSucursalChange}
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
    
}

export default UsuariosFilterForm;