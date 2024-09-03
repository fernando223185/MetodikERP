import FalconCardHeader from 'components/common/FalconCardHeader';
import TooltipBadge from 'components/common/TooltipBadge';
import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

const AccountSettings = () => {

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Account Settings" />
      <Card.Body className="bg-body-tertiary">
        <div>
          <h6 className="fw-bold">
            MultiEmpresa
            <TooltipBadge
              tooltip="Only The group of selected people can see your profile"
              icon="question-circle"
            />
          </h6>
          <div className="ps-2 mb-2">
            <Form.Check
              type="radio"
              id="profile-everyone"
              label="Activo"
              className="form-label-nogutter"
              value="true" 
              name="Activo"
              //onChange={handleChange}
              //checked={formData.viewProfile === 'everyone'}
            />
            <Form.Check
              type="radio"
              id="profile-followers"
              label="Inactivo"
              className="form-label-nogutter"
              value="false"
              name="Inactivo"
              //onChange={}
              //checked={}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AccountSettings;
