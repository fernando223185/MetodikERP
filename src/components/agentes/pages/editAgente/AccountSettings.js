import FalconCardHeader from 'components/common/FalconCardHeader';
import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import EmpresaSelect from '../../../vehiculos/FormFields/Empresa';
import EstatusSelect from '../../../vehiculos/FormFields/Estatus.js'


const AccountSettings = ({ formik }) => {

    const { values, errors, touched, handleChange, handleSubmit, getFieldProps } = formik;

    return (
        <Card className="mb-3">
            <FalconCardHeader title="Configuracion de agente" />
            <Card.Body className="bg-body-tertiary">
                <div>
                    <div className="ps-2 mb-2">
                        <EmpresaSelect value={values.EmpresaID} onChange={handleChange}/>
                        <EstatusSelect value={values.EstatusID} onChange={handleChange} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AccountSettings;

