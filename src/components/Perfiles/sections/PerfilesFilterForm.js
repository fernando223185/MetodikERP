import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useGetFiltroCatalogo } from "../../../hooks/useFiltros";

const PerfilesFilterForm = ({ movimientos, setReload, setFilters }) => {
    const [searchText, setSearchText] = useState(""); // Para el campo de búsqueda
    const [startDate, setStartDate] = useState(""); // Para fecha desde
    const [endDate, setEndDate] = useState(""); // Para fecha hasta
    const [searchEstatus, setSearchEstatus] = useState("");
  
    const [estatusOptions, setEstatusOptions] = useState([]); // Opciones para el select de estatus
  
    const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();
  
    useEffect(() => {
      const fetchEstatus = async () => {
        const data = await getFiltroCatalogo({
          Tipo: "Estatus",
          PersonaID: 1,
          Modulo: "Perfiles",
          ModuloID: null,
        });
        if (data) {
          const options = data.map((item) => ({
            value: item.Valor,
            label: item.Dato,
          }));
          setEstatusOptions(options);
        }
      };
      fetchEstatus();
    }, []);
  
    const handleSearch = () => {
        console.log("Search text:", searchText);
        console.log("Fecha desde:", startDate);
        console.log("Fecha hasta:", endDate);
        console.log("Estatus seleccionado:", searchEstatus);
        
        // Actualizar los filtros en el componente padre
        setFilters({
          searchText,
          startDate,
          endDate,
          searchEstatus,
        });
        
        // Aquí activamos la recarga de la tabla
        //setReload((prevState) => !prevState);
      };
  
    return (
      <Card className="shadow-none shadow-show-xl scrollbar">
        <Card.Header className="bg-body-tertiary d-none d-xl-block">
          <h6 className="mb-0">Filtros</h6>
        </Card.Header>
        <Card.Body>
          <Form>
            <div className="mb-2 mt-n2">
              <Form.Group>
                <Form.Label>Buscar...</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Buscar..."
                  size="sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="mb-2">
              <Form.Label className="mb-1 mt-2 fs--1">Estatus</Form.Label>
              <Form.Select
                size="sm"
                value={searchEstatus}
                onChange={(e) => setSearchEstatus(e.target.value)}
              >
                <option value="0">Todos</option>
                {estatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="mb-2">
              <Form.Group>
                <Form.Label>Fecha Desde</Form.Label>
                <Form.Control
                  type="date"
                  size="sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="mb-2">
              <Form.Group>
                <Form.Label>Fecha Hasta</Form.Label>
                <Form.Control
                  type="date"
                  size="sm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="border-top border-200 py-x1">
          <Button
            variant="primary"
            className="w-100"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Buscar"}
            {!isLoading && (
              <FontAwesomeIcon
                icon={faSearch}
                transform="shrink-2"
                className="ms-1"
              />
            )}
          </Button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Card.Footer>
      </Card>
    );
  };
  
  export default PerfilesFilterForm;
  