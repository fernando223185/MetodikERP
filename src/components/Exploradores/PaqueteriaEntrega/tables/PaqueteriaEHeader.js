import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import IconButton from 'components/common/IconButton';
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const PaqueteriaEHeader = ({
    selectedRowIds,
    globalFilter,
    setGlobalFilter,
    layout,
    handleShow,
    selectedItems,
    handleTicketsSearch,
    isLoading
    }) => {

    return (
        <div className="d-lg-flex justify-content-between">
          <Row className="flex-between-center gy-2 px-x1">
            <Col xs="auto" className="pe-0">
              <h6 className="mb-0">Paqueteria Entrega</h6>
            </Col>
            <Col xs="auto">
              {layout === "view-table" ? (
                <AdvanceTableSearchBox
                  className="input-search-width"
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              ) : (
                <InputGroup className="position-relative input-search-width">
                  <FormControl
                    size="sm"
                    id="search"
                    type="search"
                    className="shadow-none"
                    placeholder="Buscar..."
                    onChange={(e) => handleTicketsSearch(e.target.value)}
                  />
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="border-300 hover-border-secondary"
                  >
                    <FontAwesomeIcon icon="search" className="fs--1" />
                  </Button>
                </InputGroup>
              )}
            </Col>
          </Row>
          <div className="border-bottom border-200 my-3"></div>
          <div className="d-flex align-items-center justify-content-between justify-content-lg-end px-x1">
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="filter"
              transform="shrink-4"
              iconAlign="middle"
              onClick={handleShow}
              className="me-2"
            >
              <span className="d-none d-sm-inline-block ms-1">Filtros</span>
            </IconButton>
      
            <Dropdown align="end" className="btn-reveal-trigger d-inline-block me-2">
              <Dropdown.Toggle split variant="falcon-default" size="sm">
                <span className="d-none d-sm-inline-block d-xl-none d-xxl-inline-block me-1">
                  {layout === "view-table" ? "Vista Tabla" : "Vista Tarjeta"}
                </span>
                <FontAwesomeIcon icon="chevron-down" transform="shrink-2" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="border py-0">
                <div className="py-2">
                  <Link
                    className={classNames("dropdown-item", {
                      active: layout === "view-table",
                    })}
                    to="/Explorador/PaqueteriaEntrega"
                    state={{ formView: "view-table" }}
                  >
                    Vista Tabla
                  </Link>
                  <Link
                    className={classNames("dropdown-item", {
                      active: layout === "view-card",
                    })}
                    to="/Explorador/PaqueteriaEntrega"
                    state={{ formView: "view-card" }}
                  >
                    Vista Tarjeta
                  </Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
      
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="external-link-alt"
              transform="shrink-3"
              className="mx-2"
              iconAlign="middle"
            >
              <span className="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">
                Exportar
              </span>
            </IconButton>
      
            <Dropdown align="end" className="btn-reveal-trigger d-inline-block">
              <Dropdown.Toggle split variant="falcon-default" size="sm">
                <FontAwesomeIcon icon="ellipsis-h" className="fs--2" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="border py-0">
                <div className="py-2">
                  <Dropdown.Item>Visualizar</Dropdown.Item>
                  <Dropdown.Item>Exportar</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger">Eliminar</Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      );              
  };

PaqueteriaEHeader.propTypes = {
  selectedRowIds: PropTypes.object,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
  handleShow: PropTypes.func,
  layout: PropTypes.string,
  selectedItems: PropTypes.array,
  handleTicketsSearch: PropTypes.func,
  handleClick: PropTypes.func,
  isLoading: PropTypes.bool
};

export default PaqueteriaEHeader;