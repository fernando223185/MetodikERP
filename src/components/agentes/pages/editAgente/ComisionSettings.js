import FalconCardHeader from 'components/common/FalconCardHeader';
import React, { useState } from 'react';
import { Card, Form, Col } from 'react-bootstrap';


const ComisionSettings = ({ formik }) => {

    const { values, errors, touched, handleChange, handleSubmit, getFieldProps } = formik;

    return (
        <Card className="mb-3">
            <FalconCardHeader title="Configuracion de Comisiones" />
            <Card.Body className="bg-body-tertiary">
                <div>
                    <div className="ps-2 mb-2">
                        <Form.Group as={Col}  controlId="TipoID">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tipo"
                                name="TipoID"
                                value={values.TipoID}
                                {...getFieldProps('TipoID')}
                                isInvalid={!!errors.profile?.TipoID && touched.TipoID}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.TipoID}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="TipoComisionID">
                            <Form.Label>Tipo Comision</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tipo Comision"
                                name="TipoComisionID"
                                value={values.TipoComisionID}
                                {...getFieldProps('TipoComisionID')}
                                isInvalid={!!errors.TipoComisionID && touched.TipoComisionID}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.TipoComisionID}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}  controlId="PorcentajeComision">
                            <Form.Label>Porcentaje Comision</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Porcentaje Comision"
                                name="PorcentajeComision"
                                value={values.PorcentajeComision}
                                {...getFieldProps('PorcentajeComision')}
                                isInvalid={!!errors.profile?.PorcentajeComision && touched.PorcentajeComision}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.PorcentajeComision}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="Cuota">
                            <Form.Label>Cuota</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cuota"
                                name="Cuota"
                                value={values.Cuota}
                                {...getFieldProps('Cuota')}
                                isInvalid={!!errors.Cuota && touched.Cuota}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.Cuota}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="PorcentajeCuota">
                            <Form.Label>Porcentaje Cuota</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Porcentaje Cuota"
                                name="PorcentajeCuota"
                                value={values.PorcentajeCuota}
                                {...getFieldProps('PorcentajeCuota')}
                                isInvalid={!!errors.PorcentajeCuota && touched.PorcentajeCuota}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.PorcentajeCuota}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ComisionSettings;
