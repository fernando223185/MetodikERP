import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import { faBus, faUsers, faCheckCircle, faExclamationTriangle, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { descensosColumns } from './columns';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import IconButton from 'components/common/IconButton';
import ModalDescensos from '../modals/ModalDescensos';

const TableEditDescensos = ({ formik, descensos, setUpdateList, destinos }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    return (
        <Card>
            <Card.Header>
                <Row className="align-items-center mb-1">
                    <Col>
                        <h5 className="mb-0">Ruta Descensos</h5>
                    </Col>
                </Row>
                <hr />
            </Card.Header>
            <Card.Body>
                <AdvanceTableWrapper
                    columns={descensosColumns}
                    data={descensos}
                    sortable
                    pagination
                    perPage={5}
                >
                <Row className="justify-content-start mb-3">
                    <Col xs="auto">
                    <AdvanceTableSearchBox table />
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-end mt-2">
                            <IconButton
                                variant="falcon-primary"
                                size="sm"
                                icon={faPlus}
                                className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                                onClick={handleOpenModal}
                            >
                                Agregar
                            </IconButton>
                        </div>
                    </Col>
                </Row>
                <hr style={{ margin: '10px 0' }} />
                <AdvanceTable
                    table
                    headerClassName="bg-200 text-nowrap align-middle"
                    rowClassName="align-middle white-space-nowrap"
                    tableProps={{
                        bordered: true,
                        striped: true,
                        className: 'fs--1 mb-0 overflow-hidden'
                    }}
                />
                <div className="mt-3">
                    <AdvanceTableFooter
                        rowCount={descensos.length}
                        table
                        rowInfo
                        navButtons
                        rowsPerPageSelection
                    />
                </div>
                </AdvanceTableWrapper>
                <ModalDescensos
                    show={showModal}
                    handleClose={handleCloseModal}
                    formik={formik}
                    destinos={destinos}
                />
            </Card.Body>
        </Card>
    );
};

export default TableEditDescensos;