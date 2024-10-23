import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import { useAvanzaRuta } from "../../../../hooks/Logistica/Ruta/useRutaD";
import IconButton from "components/common/IconButton";

const getInitialValues = (rutaId) => {
  const initialForm = {
    movimiento: "",
    origen: "",
    destino: "",
    dateSalida: null,
    dateRegreso: null,
    referencia: "",
    observaciones: "",
    ruta: "0",
    vehiculo: "0",
    equipo: "0",
    generarAutomatico: false,
  };

  if (rutaId) {
    return {
      movimiento: rutaId.Movimiento || "",
      dateStart: rutaId.FechaInicio
        ? moment(rutaId.FechaInicio, "DD-MM-YYYY").toDate()
        : null,
      timeSalida: rutaId.HoraSalida
        ? moment(rutaId.HoraSalida, "HH:mm:ss.SSSSSSS").toDate()
        : null,
      referencia: rutaId.Referencia,
      observaciones: rutaId.Observaciones,
      ruta: rutaId.Ruta || "",
      vehiculo: rutaId.VehiculoID || 0,
      equipo: rutaId.EquipoID || "0",
      generarAutomatico: rutaId.GenerarAutomatico || false,
    };
  }
  return initialForm;
};

const validationSchema = Yup.object().shape({
  movimiento: Yup.string().required("Seleccione un movimiento"),
  ruta: Yup.string().required("Seleccione una ruta"),
});

const InfoDCard = ({
  rutaId,
  movimientos,
  vehiculos,
  isLoading,
  setHasFetched,
  setUpdtRutas,
  setShowDateRegreso,
  showDateRegreso,
  rutas,
  setFormMov,
  showFormMov,
  equipos,
  setUpdtArts,
}) => {
  const {
    avanzarRuta,
    result: resultNew,
    isLoading: isLoadingNew,
  } = useAvanzaRuta();
  const [date, setDate] = useState(null);

  const formik = useFormik({
    initialValues: {
      ...getInitialValues(rutaId),
      generarAutomatico: false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = {
          ID: rutaId.ID,
          Movimiento: values.movimiento,
          RutaID: values.ruta,
          FechaInicio: values.dateStart
            ? moment(values.dateStart).format("YYYY-MM-DD 00:00:00")
            : null,
          HoraSalida: values.timeSalida
            ? moment(values.timeSalida).format("HH:mm:ss")
            : null,
          Referencia: values.referencia,
          Observaciones: values.observaciones,
          VehiculoID: values.vehiculo,
          EquipoID: values.equipo,
          GenerarAutomatico: values.generarAutomatico,
        };
        console.log(data)
        avanzarRuta({ data });
      } catch (error) {
        toast.error("Error al enviar el formulario", {
          theme: "colored",
          position: "top-right",
        });
      }
    },
  });

  const getOptionByValue = (options, value) => {
    const result = options.find((option) => option.Valor === value) || null;
    if (result) {
      return { value: result.Valor, label: result.Dato };
    }

    return null;
  };

  useEffect(() => {
    if (rutaId) {
      formik.setValues(getInitialValues(rutaId));
    }
  }, [rutaId]);

  useEffect(() => {
    if (resultNew && Object.keys(resultNew).length === 0) {
      console.log("resultNew es un array vacío:", resultNew);
    } else if (resultNew && resultNew.status === 200) {
      toast[resultNew.data[0].Tipo](`${resultNew.data[0].Mensaje}`, {
        theme: "light",
        position: resultNew.data[0].Posicion,
        icon:
          resultNew.data[0].Tipo === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : resultNew.data[0].Tipo === "error" ? (
            <FontAwesomeIcon icon={faExclamationTriangle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          ),
      });

      setTimeout(() => {
        setHasFetched((prev) => !prev);
        setUpdtRutas(true);
        setUpdtArts(true);
      }, 1000);
    } else if (resultNew) {
      toast.error(`Error al guardar`, {
        theme: "colored",
        position: "top-right",
      });
    }
  }, [resultNew]);

  const handleMovimientoChange = (option) => {
    formik.setFieldValue("movimiento", option.value);

    if (option.value === "Viaje Sencillo") {
      setShowDateRegreso(false);
      setFormMov(false);
      formik.setFieldValue("dateRegreso", null);
    } else if (option.value === "Equipaje") {
      setFormMov(true);
    } else {
      setShowDateRegreso(true);
      setFormMov(false);
    }
  };

  useEffect(() => {
    if (formik.values.movimiento) {
      const selectedMovimiento = movimientos.find(
        (mov) => mov.Valor === formik.values.movimiento
      );
      if (selectedMovimiento) {
        handleMovimientoChange({ value: selectedMovimiento.Valor });
      }
    }
  }, [formik.values.movimiento, movimientos]);

  const { getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Movimiento</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={movimientos.map((item) => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={handleMovimientoChange}
                    isLoading={isLoading}
                    value={getOptionByValue(
                      movimientos,
                      formik.values.movimiento
                    )}
                  />
                  {formik.touched.movimiento && formik.errors.movimiento && (
                    <div className="text-danger">
                      {formik.errors.movimiento}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Ruta</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={rutas.map((item) => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={(option) =>
                      formik.setFieldValue("ruta", option.value)
                    }
                    isLoading={isLoading}
                    value={getOptionByValue(rutas, formik.values.ruta)}
                  />
                  {formik.touched.ruta && formik.errors.ruta && (
                    <div className="text-danger">{formik.errors.ruta}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Fecha Inicio</Form.Label>
                  <DatePicker
                    selected={formik.values.dateStart}
                    onChange={(date) => formik.setFieldValue("dateStart", date)}
                    className="form-control"
                    placeholderText="Selecciona una fecha"
                    dateFormat="dd-MM-yyyy"
                    locale="es"
                  />
                  {formik.touched.dateStart && formik.errors.dateStart && (
                    <div className="text-danger">{formik.errors.dateStart}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Hora Salida</Form.Label>
                  <DatePicker
                    selected={formik.values.timeSalida}
                    onChange={(date) =>
                      formik.setFieldValue("timeSalida", date)
                    }
                    className="form-control"
                    placeholderText="Seleccionar horario"
                    timeIntervals={5}
                    dateFormat="h:mm aa"
                    showTimeSelect
                    showTimeSelectOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Equipo</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={equipos.map((item) => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={(option) =>
                      formik.setFieldValue("equipo", option.value)
                    }
                    isLoading={isLoading}
                    value={getOptionByValue(equipos, formik.values.equipo)}
                  />
                  {formik.touched.equipo && formik.errors.equipo && (
                    <div className="text-danger">{formik.errors.equipo}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Vehículo</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={vehiculos.map((item) => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={(option) =>
                      formik.setFieldValue("vehiculo", option.value)
                    }
                    isLoading={isLoading}
                    value={getOptionByValue(vehiculos, formik.values.vehiculo)}
                  />
                  {formik.touched.vehiculo && formik.errors.vehiculo && (
                    <div className="text-danger">{formik.errors.vehiculo}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <Form.Group controlId="generarAutomatico">
                  <br></br>
                  <Form.Check
                    type="checkbox"
                    label="Generar automaticamente"
                    checked={formik.values.generarAutomatico}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "generarAutomatico",
                        e.target.checked
                      )
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={12}>
                <Form.Group controlId="formObs">
                  <Form.Label>Observaciones</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      {...getFieldProps("observaciones")}
                      isInvalid={
                        !!formik.errors.Cantidad && formik.touched.Cantidad
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.Cantidad}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="formRef">
                  <Form.Label>Referencia</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      {...getFieldProps("referencia")}
                      isInvalid={
                        !!formik.errors.Cantidad && formik.touched.Cantidad
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.Cantidad}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <hr style={{ margin: "10px 0" }} className="mt-4" />

            <div className="d-flex justify-content-start mt-2">
              {isLoadingNew ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  icon="search"
                  className="mb-2 mb-sm-0"
                  type="submit"
                >
                  Buscar
                </IconButton>
              )}
            </div>
          </Card.Body>
        </Card>
      </form>
    </FormikProvider>
  );
};

export default InfoDCard;
