import React from 'react';
import Avatar from 'components/common/Avatar';
import Flex from 'components/common/Flex';
import SubtleBadge from 'components/common/SubtleBadge';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const AreasCardLayout = ({data, isSelectedItem, toggleSelectedItem}) => {

    return (
    <div className='d-flex flex-column gap-3'>
            {data.slice(0,12).map((areas,index)=> (
                <div 
                key={index}
                className='bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height w-100'
                >
                  <div className="d-flex align-items-start align-items-sm-center">
                    <Form.Check
                    type="checkbox"
                    id="inboxBulkSelect"
                    className="fs-0 form-check me-2 me-xxl-3 mb-0"
                    >
                      <Form.Check.Input
                        type="checkbox"
                        checked={isSelectedItem(areas.id)}
                        onChange={() => toggleSelectedItem(areas.id)}
                      />
                    </Form.Check>
                    <Link
                        to={`/Catalogos/view-areas/${areas.id}`}
                        className="d-none d-sm-block"
                    >
                      <Avatar size="3xl" name={areas.avatar.name} />
                    </Link>
                    <div className='ms-1 ms-sm-3'>
                        <p className='fw-semi-bold mb-3 mb-sm-2'>
                            <Link to={`/Catalogos/view-areas/${areas.id}`}>{areas.Nombre}</Link>
                        </p>
                        <Row className="align-items-center gx-0 gy-2">
                            <Col xs="auto" className="lh-1 me-3">
                                {areas.Descripcion}
                            </Col>
                            <Col xs="auto" className="lh-1 me-3">
                                {areas.estatus}
                            </Col>
                            <Col xs="auto">
                                <h6 className='mb-0 text-500'>{areas.FechaEmision}</h6>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='border-bottom mt-4 mb-x1'></div>
                </div>
            ))}
        </div>
    );
};