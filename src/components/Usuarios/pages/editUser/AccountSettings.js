import FalconCardHeader from 'components/common/FalconCardHeader';
import TooltipBadge from 'components/common/TooltipBadge';
import React from 'react';
import { Card, Form } from 'react-bootstrap';

const AccountSettings = ({ formik }) => {
  const { values, setValues } = formik;

  const handleMultiempresaChange = (value) => {
    setValues({ ...values, MultiEmpresa: parseInt(value) }); // Update Multiempresa while preserving other values
  };

  return (  
    <Card className="mb-3">
      <div className='d-flex justify-content-start align-items-center'>
        <div>
          <FalconCardHeader title="Multiempresa"/>
        </div>
        <div>
          <TooltipBadge
            tooltip="Activar si un usuario pertenece a más de una empresa"
            icon="question-circle"
          />
        </div>
      </div>
      <Card.Body className="bg-body-tertiary">
        <div className="ps-2 mb-2">
          <Form.Check
            type="radio"
            id="profile-activo"
            label="Activo"
            className="form-label-nogutter"
            value="1" // Value matches `Multiempresa` for "Activo"
            name="multiEmpresa"
            onChange={() => handleMultiempresaChange(1)} // Set Multiempresa to 0
            checked={values.MultiEmpresa === 1} // Mark checked when value is 0
          />
          <Form.Check
            type="radio"
            id="profile-inactivo"
            label="Inactivo"
            className="form-label-nogutter"
            value="0" // Value matches `Multiempresa` for "Inactivo"
            name="Multiempresa"
            onChange={() => handleMultiempresaChange(0)} // Set Multiempresa to 1
            checked={values.MultiEmpresa === 0} // Mark checked when value is 1
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AccountSettings;
