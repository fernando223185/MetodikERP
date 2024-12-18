import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useBreakpoints } from 'hooks/useBreakpoints';
import useBulkSelect from 'hooks/useBulkSelect';
import usePagination from 'hooks/usePagination';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import { faPaperPlane, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'; 
import SucursalesHeader from './SucursalesHeader';
import SucursalesFilterForm from './SucursalesFilterForm';
import { SucursalesCardLayout } from './SucursalesCardLayout';

const ViewSucursalesCard = ({ sucursales, estatus, layout, setFilter}) => {
    const [show, setShow] = useState(false);
    const { breakpoints } = useBreakpoints();
    const [result, setResult] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sucursalesIDs = sucursales.data.map(sucursal => sucursal.ID);
    const { selectedItems, isSelectedItem, toggleSelectedItem } = useBulkSelect(sucursalesIDs);
    const [allSucursales] = useState(sucursales.data.slice(0, 21));
    const [primarySucursales, setPrimarySucursales] = useState(allSucursales);

    const {
        paginationState: {
          data,
          currentPage,
          canNextPage,
          canPreviousPage,
          paginationArray
        },
        nextPage,
        prevPage,
        goToPage
    } = usePagination(primarySucursales, 7);

    useEffect(() => {
        if(data.length > 0)
        {
            const transformedData = data.map (u => ({
                avatar: {
                    name: u.Nombre,
                    size: 'xl',
                    round: 'circle'
                },
                estatus: (
                    <SubtleBadge pill
                    bg={classNames({
                      success: u.Estatus === 'ALTA',
                      danger: u.Estatus === 'BAJA',
                      info: u.Estatus === 'EN ESPERA'
                    })}
                    >
                      {u.Estatus}
                      <FontAwesomeIcon
                        icon={getStatusIcon(u.Estatus)}
                        transform="shrink-2"
                        className="ms-1"
                      />
                    </SubtleBadge>
                ),
                Nombre: u.Nombre,
                Direccion: u.Direccion,
                Poblacion: u.Poblacion,
                Estado: u.Estado,
                CodigoPostal: u.CodigoPostal,
                FechaEmision: u.FechaEmision,
                id: u.ID
            }));
            setResult(prevResult => {
                if(JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                    return transformedData;
                }
                return prevResult;
            });
        }
    },[data])

    const getStatusIcon = (estatus) => {
        switch (estatus) {
          case 'ALTA':
            return faCheck;
          case 'BAJA':
            return faBan;
          default:
            return faPaperPlane;
        }
    };

    return(
        <Row className='gx-3'>
          <Col>
            <Card style={{ minWidth: '1100px', display: 'flex', flexDirection: 'column' }}>
                <Card.Header className="border-bottom border-200 px-0">
                    <SucursalesHeader
                        layout={layout}
                        handleShow={handleShow}
                        selectedItems={selectedItems}
                        handleTicketsSearch={setFilter}
                    />
                </Card.Header>
                <Card.Body className="bg-body-tertiary">
                  <SucursalesCardLayout
                  data={result}
                  isSelectedItem={isSelectedItem}
                  toggleSelectedItem={toggleSelectedItem}
                  />
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center">
            <div>
              <Button
                variant="falcon-default"
                size="sm"
                className={classNames('me-2', { disabled: !canPreviousPage })}
                onClick={prevPage}
              >
                <FontAwesomeIcon icon="chevron-left" />
              </Button>
            </div>

            <ul className="pagination mb-0">
              {paginationArray.map(page => (
                <li
                  key={page}
                  className={classNames({ active: currentPage === page })}
                >
                  <Button
                    size="sm"
                    variant="falcon-default"
                    className="page me-2"
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                </li>
              ))}
            </ul>
            <div>
              <Button
                variant="falcon-default"
                size="sm"
                className={classNames({ disabled: !canNextPage })}
                onClick={nextPage}
              >
                <FontAwesomeIcon icon="chevron-right" />
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Col>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                className="dark__bg-card-dark"
            >
                <Offcanvas.Header closeButton className="bg-body-tertiary">
                <h6 className="fs-0 mb-0 fw-semi-bold">Filtros</h6>
                </Offcanvas.Header>
                <SucursalesFilterForm  estatus={estatus} setFilter={setFilter} />
            </Offcanvas>
    </Row>
  );
}

export default ViewSucursalesCard;
