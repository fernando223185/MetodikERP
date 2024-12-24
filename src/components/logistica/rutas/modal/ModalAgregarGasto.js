import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { useGetFiltroModulo } from "../../../../hooks/useFiltros";
import { useActGastoRuta } from "../../../../hooks/Logistica/Ruta/useRutaD";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const ModalAgregarGasto = ({ show, handleClose }) => {
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const { ActGastoRuta, result, isLoading } = useActGastoRuta();
  const { id } = useParams();

  const [conceptos, setConceptos] = useState([]);
  const [formData, setFormData] = useState({
    concepto: null,
    importe: "",
    referencia: "",
    RenglonID: 0,
  });

  // Fetch conceptos
  const fetchConceptos = async () => {
    const data = { Tipo: "ConceptosGasto", PersonaID: 1, Modulo: "Rutas" };
    const result = await getFiltroModulo(data);
    setConceptos(result);
  };

  useEffect(() => {
    if (show) fetchConceptos();
  }, [show]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const data = { ...formData, RenglonID: 0, ID: id };
    console.log("JSON to save:", data);
    ActGastoRuta({data});
  };


  useEffect(() => {
    if (result && Object.keys(result).length === 0) {
      console.log("resultNew es un array vacío:", result);
    } else if (result && result.status === 200) {
      toast[result.data[0].Tipo](`${result.data[0].Mensaje}`, {
        theme: "light",
        position: result.data[0].Posicion,
        icon:
          result.data[0].Tipo === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : result.data[0].Tipo === "error" ? (
            <FontAwesomeIcon icon={faExclamationTriangle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          ),
      });

      setTimeout(() => {
        handleClose();
      }, 1000);
    } else if (result) {
      toast.error(`Error al guardar`, {
        theme: "colored",
        position: "top-right",
      });
    }
  }, [result]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Gasto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Concepto</Form.Label>
            <Select
              classNamePrefix="react-select"
              options={conceptos.map((item) => ({
                value: item.Valor,
                label: item.Dato,
              }))}
              onChange={(selected) => handleChange("concepto", selected?.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Importe</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el importe"
              value={formData.importe}
              onChange={(e) => handleChange("importe", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Referencia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la referencia"
              value={formData.referencia}
              onChange={(e) => handleChange("referencia", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAgregarGasto;
