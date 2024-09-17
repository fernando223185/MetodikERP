import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Modal, Row, Col, InputGroup } from "react-bootstrap";
import IconButton from "components/common/IconButton"; 
import * as Yup from "yup";
import { useFormik, FormikProvider } from "formik";
import { toast } from "react-toastify";
import { useActProfil } from "../../../hooks/Catalogos/Perfiles/usePerfiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Esquema de validación
const userSchema = Yup.object().shape({
  name: Yup.string().max(255).required("El nombre es requerido"),
});

// Valores iniciales
const getInitialValues = () => ({
  name: "",
  notes: "",
  estatus: 1
});

const FormProfilerAdd = ({ selectedUser, handleCloseModal, setUpdateList, EmpresaID }) => {
  const { actProfiles, result: resultNew, isLoading } = useActProfil();

  const formik = useFormik({
    initialValues: getInitialValues(selectedUser),
    validationSchema: userSchema,

    onSubmit: async (values) => {
      const data = {
        ID: 0,
        EstatusID: values.estatus,
        Nombre: values.name,
        Notas: values.notes,
        EmpresaID: EmpresaID
      };
      console.log(data);

      actProfiles({ data });
    },
  });

  useEffect(() => {
    console.log("resultNew received:", resultNew);
    if (resultNew && resultNew.status === 200 && Array.isArray(resultNew.data) && resultNew.data.length > 0) {
      const { Mensaje, Tipo, Titulo, Posicion } = resultNew.data[0]; // Extraer el primer objeto del array 'data'
  
      // Asegúrate de que los valores existen
      console.log("Mensaje:", Mensaje, "Tipo:", Tipo, "Titulo:", Titulo, "Posicion:", Posicion);
  
      // Verifica si los valores están definidos
      if (Mensaje && Tipo) {
        toast[Tipo?.toLowerCase() || "success"](`${Titulo || 'Notificación'}: ${Mensaje}`, {
            position: Posicion || "top-right",
            theme: "colored",
            style: {
              color: "#000000",
              backgroundColor: Tipo === 'success' ? '#28a745' : Tipo === 'error' ? '#dc3545' : '#007bff',
              fontSize: '16px',
              fontWeight: 'bold', 
            },
          });
          
  
        setTimeout(() => {
          handleCloseModal();
          //setUpdateList((prevState) => !prevState);
        }, 1_000);
      } else {
        console.log("Faltan valores en resultNew.data[0]:", resultNew.data[0]);
      }
    } else if (resultNew && Array.isArray(resultNew.data) && resultNew.data.length === 0) {
      console.log("resultNew.data es un array vacío:", resultNew.data);
    } else {
      console.log("resultNew no es un array o está vacío:", resultNew);
    }
  }, [resultNew]);
  
  

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserStatus">
          <Form.Label>Estatus</Form.Label>
          <Form.Control as="select" {...getFieldProps("enableToDownloadStock")}>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </Form.Control>
        </Form.Group>
        <Row className="mt-2">
          <Col md={6}>
            <Form.Group controlId="formUserNickName">
              <Form.Label>Perfil</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                <Form.Control
                  type="text"
                  {...getFieldProps("user")}
                  isInvalid={!!errors.user && touched.user}
                  readOnly
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {errors.user}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserName">
              <Form.Label>Nombre</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                <Form.Control
                  type="text"
                  {...getFieldProps("name")}
                  isInvalid={!!errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={12}>
            <Form.Group controlId="formNotas">
              <Form.Label>Notas</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...getFieldProps("notes")}
                  isInvalid={!!errors.notes}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.notes}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Modal.Footer className="mt-4">
          <IconButton
            variant="secondary"
            icon="reply"
            className="mt-4"
            onClick={handleCloseModal}
          ></IconButton>
          <IconButton
            variant="primary"
            icon="plus"
            className="mt-4"
            type="submit"
          ></IconButton>
        </Modal.Footer>
      </Form>
    </FormikProvider>
  );
};

FormProfilerAdd.propTypes = {
  selectedUser: PropTypes.object,
  handleCloseModal: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};

export default FormProfilerAdd;
