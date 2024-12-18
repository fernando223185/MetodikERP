import React from 'react';
import Avatar from 'components/common/Avatar';
import Flex from 'components/common/Flex';
import SubtleBadge from 'components/common/SubtleBadge';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';


export const CardUsuariosLayout = ({ data, isSelectedItem, toggleSelectedItem }) => {
    console.log("data",data)
    return (
      <div className="d-flex flex-column gap-3">
        {data.slice(0, 12).map((chofer, index) => (
          <div
            key={index}
            className="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height w-100"
          >
            <div className="d-flex align-items-start align-items-sm-center">
              <Form.Check
                type="checkbox"
                id="inboxBulkSelect"
                className="fs-0 form-check me-2 me-xxl-3 mb-0"
              >
                <Form.Check.Input
                  type="checkbox"
                  checked={isSelectedItem(chofer.ID)}
                  onChange={() => toggleSelectedItem(chofer.ID)}
                />
              </Form.Check>
              <Link
                to="/support-desk/contact-details"
                className="d-none d-sm-block"
              >
              <Avatar size="3xl" name={chofer.avatar.name} />
              </Link>
              <div className="ms-1 ms-sm-3">
                <p className="fw-semi-bold mb-3 mb-sm-2">
                  <Link to={`/catalogo/usuarios/view-profile/${chofer.ID}`}>{chofer.Nombre}</Link>
                </p>
                <Row className="align-items-center gx-0 gy-2">
                  <Col xs="auto" className="me-2">
                    <h6 className="mb-0">
                      <Link
                        to="/support-desk/contact-details"
                        className="text-800 d-flex align-items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faWarehouse} transform="shrink-3 up-1" />
                        <span>{chofer.Sucursal}</span>
                      </Link>
                    </h6>
                  </Col>
                  <Col xs="auto" className="lh-1 me-3">
                      {chofer.Estatus}
                  </Col>
                  <Col xs="auto">
                    <h6 className="mb-0 text-500">{chofer.Vehiculo}</h6>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="border-bottom mt-4 mb-x1"></div>
          </div>
        ))}
      </div>
    );
  };
  
  CardUsuariosLayout.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isSelectedItem: PropTypes.func,
    toggleSelectedItem: PropTypes.func
  };
  