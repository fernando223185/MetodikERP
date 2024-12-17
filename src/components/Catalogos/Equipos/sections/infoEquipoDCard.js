import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';



const InfoEquipoDCard = ({ formik, estatus, integrantes }) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;
    const [selectedEstatus, setSelectedEstatus] = useState(null);
    const [selectedIntegrantes, setSelectedIntegrantes] = useState([]);

    useEffect(() => {
        console.log(values.EstatusID)
        if (estatus.length > 0) {
            const currentEstatus = estatus.find(item => item.Valor === values.EstatusID.toString());
            setSelectedEstatus(currentEstatus ? { value: currentEstatus.Valor, label: currentEstatus.Dato } : null);
        }
        if (values.Integrantes && values.IntegrantesID) {
            const integrantesArray = values.Integrantes.split(";").filter(Boolean); // Remover última entrada vacía
            const integrantesIDArray = values.IntegrantesID.split(";").filter(Boolean);
            
            const preselectedIntegrantes = integrantesIDArray.map((id, index) => ({
                value: id,
                label: integrantesArray[index],
            }));
            setSelectedIntegrantes(preselectedIntegrantes);
        }
    }, [integrantes, estatus, values]);

    const handleEstatusChange = (selectedOption) => {
        setSelectedEstatus(selectedOption);
        setValues({...values, EstatusID: selectedOption ? selectedOption.value : null});
    };

    const handleIntegrantesChange = (selectedOptions) => {
        setSelectedIntegrantes(selectedOptions || []);
        
        const nombres = selectedOptions?.map(option => option.label).join(";") + ";" || "";
        const ids = selectedOptions?.map(option => option.value).join(";") + ";" || "";
        
        setValues({
            ...values,
            Integrantes: nombres,
            IntegrantesID: ids,
        });
    };

    const handleSave = () => {

        const integrantesString = selectedIntegrantes
        ? selectedIntegrantes.map((integrante) => integrante.value).join(';')
        : '';
        
        setValues({
            ID: values.ID,
            EmpresaID: 1,
            EstatusID: selectedEstatus ? selectedEstatus.value : null,
            Nombre: values.Nombre,
            Descripcion: values.Descripcion,
            Integrantes: integrantesString ? integrantesString : '',
        });

        formik.submitForm();

    };

    return (

        <Card className='mb-3'>
            <Card.Body>
                <Row>
                    <Col md={6}>
                    <Form.Group>
                        <Form.Label>Estatus</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            options={estatus.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                            }))}
                            placeholder="Selecciona un estatus"
                            onChange={handleEstatusChange}
                            value={selectedEstatus}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.EstatusID}
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                        <Form.Label>Nombre</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="text"
                            name="Nombre"
                            placeholder='Ingrese un nombre'
                            value={values.Nombre}
                            {...getFieldProps("Nombre")}
                            isInvalid={!!errors.profile?.Nombre && touched.Nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.Nombre}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group >
                        <Form.Label>Descripcion</Form.Label>
                        <InputGroup>
                            <Form.Control
                            as="textarea"
                            name="Descripcion"
                            placeholder='Ingrese una descripcion'
                            value={values.Descripcion}
                            onChange={handleChange}
                            isInvalid={!!errors.Descripcion}
                            rows={4}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.Descripcion}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Integrantes</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            options={integrantes.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                            }))}
                            isMulti
                            placeholder="Selecciona al menos un integrante"
                            onChange={handleIntegrantesChange}
                            value={selectedIntegrantes}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Integrantes}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                </Row>
                <hr style={{ margin: '10px 0' }} className="mt-4" />
                <div className="d-flex justify-content-end mt-2">
                    <IconButton
                        variant="falcon-primary"
                        size="sm"
                        icon={faSave}
                        className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                        onClick={handleSave}
                    >
                        Guardar
                    </IconButton>
                </div>
            </Card.Body>
        </Card>
    );
}

export default InfoEquipoDCard;