import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useBreakpoints } from 'hooks/useBreakpoints';
import useBulkSelect from 'hooks/useBulkSelect';
import usePagination from 'hooks/usePagination';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import { faPaperPlane, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'; 
import DestinosHeader from '../tables/DestinosHeader';
import DestinosFilterForm from '../form/DestinosFilterForm';
import { VistaTarjetaLayout } from './VistaTarjetaLayout';

const ViewDestinosCard = ({ destinos, estatus, layout, setFilter }) => {
    const [show, setShow] = useState(false);
    const { breakpoints } = useBreakpoints();
    const [result, setResult] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const destinosIDs = destinos.data.map(destino => destino.ID);
    const { selectedItems, isSelectedItem, toggleSelectedItem } = useBulkSelect(destinosIDs);
    const [allDestinos] = useState(destinos.data.slice(0, 21));
    const [primaryDestinos, setPrimaryDestinos] = useState(allDestinos);


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
    } = usePagination(primaryDestinos, 7);

    useEffect(() => {
        if(data.length > 0 )
        {
            const transformedData = data.map (u=> ({
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
                Ciudad: u.Ciudad,
                Nombre: u.Nombre,
                Pais: u.Pais,
                CodigoPostal: u.CodigoPostal,
                Descripcion: u.Descripcion,
                FechaEmision: u.FechaEmision,
                id: u.ID
            }));
            setResult(prevResult => {
                if(JSON.stringify(prevResult)!== JSON.stringify(transformedData)) {
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
              <Card.Header className='border-bottom border-200 px-0'>
                <DestinosHeader
                  layout={layout}
                  handleShow={handleShow}
                  selectedItems={selectedItems}
                  handleTicketsSearch={setFilter}
                />
              </Card.Header>
              <Card.Body className='bg-body-tertiary'>
                <VistaTarjetaLayout
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
            <DestinosFilterForm  estatus={estatus} setFilter={setFilter} />
        </Offcanvas>           
        </Row>
    );
};
export default ViewDestinosCard;