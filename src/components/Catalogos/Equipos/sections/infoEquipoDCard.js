import React, { useEffect } from 'react';
import { Card, Form, Row, Col, Button, Spinner, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import IconButton from 'components/common/IconButton';
import { useActEquipoD, useGetEquipoID } from 'hooks/Catalogos/Equipos/useEquipos';
import { useNavigate } from 'react-router-dom';


const getInitialValues = (equipoID) => {
    const initialForm = {
        equipoID: 0,
        empresaID: 1,
        estatusID: 1,
        nombre: '',
        descripcion: '',
        integrantes: []
    };

    if(equipoID) {
        const ids = equipoID.IntegrantesID ? equipoID.IntegrantesID.split(';').filter(id => id) : [];
        const nombres = equipoID.Integrantes ? equipoID.Integrantes.split(';').filter(nombre => nombre) : [];
        
        // Combina ids y nombres en un array de objetos con value y label
        const integrantes = ids.map((id, index) => ({
            value: id,
            label: nombres[index] || ''
        }));

        return {
            equipoID: equipoID.ID,
            empresaID: 1,
            estatusID: equipoID.EstatusID,
            nombre: equipoID.Nombre,
            descripcion: equipoID.Descripcion,
            integrantes: integrantes
        };
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es obligatorio'),
});

const InfoEquipoDCard = ({ equipoID, setHasFetched, estatus, integrantes }) => {
    const { actEquipoD, result: resultNew, isLoading } = useActEquipoD();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(equipoID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: values.equipoID,
                    EmpresaID: values.empresaID,
                    EstatusID: values.estatusID,
                    Nombre: values.nombre,
                    Descripcion: values.descripcion,
                    Integrantes: values.integrantes ? values.integrantes.map(item => item.value).join(';') : '' 
                };

                actEquipoD({data});
            } catch (error) {
                toast.error('Error al enviar el formulario', {
                    theme: 'colored',
                    position: 'top-right'
                });
            }
        },
    });

    const getOptionByValue = (options, value) => {
        const result = options.find(option => option.Valor === value) || null;
        if(result) return { value: result.Valor, label: result.Dato };
        return null;
    };

    useEffect(() => {
        if(equipoID) {
            formik.setValues(getInitialValues(equipoID));
        }
    }, [equipoID])

    useEffect(() => {
        if(resultNew && Object.keys(resultNew).length === 0) {
            console.log("La respuesta es una array vacio");
        } else if (resultNew && resultNew.status === 200) {
            console.log(resultNew.data[0].Tipo)
            console.log(resultNew.data[0].Mensaje)
            console.log(resultNew.data[0].Posicion)
            const tipoToast = resultNew.data[0].Tipo;

            if (tipoToast === 'success') {
                toast.success(resultNew.data[0].Mensaje, {
                    theme: 'colored',
                    position: resultNew.data[0].Posicion,
                    icon: <FontAwesomeIcon icon={faCheckCircle} />
                });
            } else if (tipoToast === 'error') {
                toast.error(resultNew.data[0].Mensaje, {
                    theme: 'colored',
                    position: resultNew.data[0].Posicion,
                    icon: <FontAwesomeIcon icon={faExclamationTriangle} />
                });
            } else {
                toast.info(resultNew.data[0].Mensaje, {
                    theme: 'colored',
                    position: resultNew.data[0].Posicion,
                    icon: <FontAwesomeIcon icon={faInfoCircle} />
                });
            }

            setTimeout(() => {
                setHasFetched((prev) => !prev);
                navigate("/catalogo/equipos")
            }, 1000);
        } else if (resultNew) {
            toast.error(`Error al guardar`, {
                theme: 'colored',
                position: 'top-right'
            });
        }
    }, [resultNew])

    return (

        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
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
                                    onChange={option => formik.setFieldValue('estatusID', option.value)}
                                    isLoading={isLoading}
                                    value={getOptionByValue(estatus, formik.values.estatusID)}
                                    isInvalid={!!formik.errors.estatusID}
                                />
                                    <Form.Control.Feedback type="invalid">
                                    {formik.errors.estatusID}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group >
                                <Form.Label>Nombre</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder='Ingrese un nombre'
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.nombre}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {formik.errors.nombre}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group >
                                <Form.Label>Descripcion</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    as="textarea"
                                    name="descripcion"
                                    placeholder='Ingrese una descripcion'
                                    value={formik.values.descripcion}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.descripcion}
                                    rows={4}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {formik.errors.descripcion}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
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
                                    onChange={selectedOptions => {
                                        formik.setFieldValue('integrantes', selectedOptions);
                                    }}
                                    isLoading={isLoading}
                                    value={formik.values.integrantes}
                                    isInvalid={!!formik.errors.integrantes}
                                />
                                    {formik.errors.integrantes && (
                                        <div className="text-danger">{formik.errors.integrantes}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr style={{ margin: '10px 0' }} className="mt-4" />
                        <div className="d-flex justify-content-start mt-2">
                        {isLoading ? (
                            <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (

                            <IconButton
                                variant="falcon-primary"
                                size="sm"
                                icon={faSave}
                                className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                                type = "submit"
                            >
                                Guardar
                            </IconButton>
                        )}
                        </div>
                    </Card.Body>
                </Card>
            </form>
        </FormikProvider>
    );
}

export default InfoEquipoDCard;