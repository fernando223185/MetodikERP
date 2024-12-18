import TableRowClick from 'components/common/advance-table/TableRowClick';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Offcanvas } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faPaperPlane, faBell, faExclamation } from '@fortawesome/free-solid-svg-icons'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import PropTypes from 'prop-types';
import { useBreakpoints } from 'hooks/useBreakpoints';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import AllTicketsHeader from '../sections/AllTicketsHeader';
import { useActTicket } from 'hooks/HelpDesk/Tickets/useTickets';
import TicketFilteringForm from 'components/app/support-desk/tickets-layout/TicketFilteringForm';
import TicketsFilterForm from '../sections/TicketsFilterForm';
//falta el filter form

const PrioritySelect = ({ title, color, data, className, style }) => {
    return (
      <div
        style={style}
        className={classNames('d-flex align-items-center gap-2', className)}
      >
        <div style={{ '--falcon-circle-progress-bar': data }}>
          <svg
            className="circle-progress-svg"
            width="26"
            height="26"
            viewBox="0 0 120 120"
          >
            <circle
              className="progress-bar-rail"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeLinecap="round"
              strokeWidth="12"
            ></circle>
            <circle
              className="progress-bar-top"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeLinecap="round"
              stroke={color}
              strokeWidth="12"
            ></circle>
          </svg>
        </div>
        <h6 className="mb-0 text-700">{title}</h6>
      </div>
    );
};

PrioritySelect.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const columns = [
  {
    accessor: 'persona',
    Header: 'Usuario',
    headerProps: { className: 'ps-2 text-900', style: { height: '46px' } },
    cellProps: {
      className: 'py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2'
    },
    Cell: rowData => {
        const { User, avatar } = rowData.row.original;
        return (
          <Flex alignItems="center" className="position-relative py-1">
            {avatar && avatar.img ? (
              <Avatar src={avatar.img} size="xl" className="me-2" />
            ) : (
              <Avatar size="xl" name={avatar ? avatar.name : User} className="me-2" />
            )}
            <h6 className="mb-0">
                <Link
                to="#"
                className="stretched-link text-900"
                onClick={(e) => e.stopPropagation()}
                >
                    {User}
                </Link>
            </h6>
          </Flex>
        );
    }
  },
  {
    accessor: 'nombre',
    Header: 'Titulo',
    headerProps: { className: 'text-900' },
    cellProps: {
        className: 'py-2 pe-4'
    }
  },
  /*{
    accessor: 'descripcion',
    Header: 'Descripcion',
    headerProps: { className: 'text-900' },
    cellProps: {
        className: 'py-2 pe-4'
    }
  },*/
  {
    accessor: 'concepto',
    Header: 'Concepto',
    headerProps: { className: 'text-900' },
    cellProps: {
        className: 'py-2 pe-4'
    }
  },
  {
    accessor: 'area',
    Header: 'Area',
    headerProps: { className: 'text-900' },
    cellProps: {
        className: 'py-2 pe-4'
    }
  },
  {
    accessor: 'prioridad',
    Header: 'Prioridad',
    headerProps: { className: 'text-900' },
    cellProps: {
        className: 'py-2 pe-4'
    }
  },

  {
    accessor: 'fechaemision',
    Header: 'Fecha Emision',
    headerProps: { className: 'text-900' },
    cellProps: {
        className: 'py-2 pe-4'
    }
  },
  {
    accessor: 'estatus',
    Header: 'Estatus',
    headerProps: { className: 'text-900' },
    cellProps: {
      className: 'pe-4'
    },
    Cell: rowData => {
      const { estatus } = rowData.row.original;
      return (
        <PrioritySelect
          title={estatus.title}
          color={estatus.color}
          data={estatus.data}
        />
      );
    }
  },
     
];

function TableTickets({tickets, estatus, personas, areas, prioridad, layout, setFilter, filter}) {

  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState('');
  const {actTicket, result: response, isLoading} = useActTicket();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { breakpoints } = useBreakpoints();
  
  useEffect(() => {
    if (tickets && tickets.status === 200 && tickets.data.length > 0) 
    {
      const transformedData = tickets.data.map(u => ({
        persona: u.Persona,
        avatar: {
            name: u.Persona,
            size: 'xl',
            round: 'circle'
        },
        nombre: `${u.Nombre}`,
        fechaemision: u.FechaEmision,
        prioridad: (
          <SubtleBadge pill           
            bg={classNames({
            warning: u.Prioridad  === 'MEDIA',
            secondary: u.Prioridad === 'BAJA',
            danger: u.Prioridad === 'ALTA'
          })} 
          className="fs--2" 
          >
            {u.Prioridad}
            <FontAwesomeIcon
              icon={getPrioridadIcon(u.Prioridad)}
              transform="shrink-2"
              className="ms-1"
            />

          </SubtleBadge>
        ),
        descripcion: u.Descripcion,
        concepto: u.Concepto,
        area: u.Area,
        estatus: {
            title: u.Estatus,
            color: '#'+u.Color,
            data: u.PorcentajeEstatus
        },
        id: u.ID
      }));
      setResult(prevResult => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[tickets])


  const getPrioridadIcon = (prioridad) => {
    switch (prioridad) {
      case 'ALTA':
        return faExclamation;
      case 'MEDIA':
        return faBell;
      case 'BAJA':
        return faBell;
      default:
        return faPaperPlane;
    }
  };

  const handleRowClick = (id) => {
    navigate(`/HelpDesk/view-ticket/${id}`);
  };

  return (
    <Row className="gx-3">
        <Col>
            <AdvanceTableWrapper
            columns={columns}
            data={result}
            selection
            selectionColumnWidth={52}
            sortable
            pagination
            perPage={10}
            rowCount={result.length}
            >
            <Card>
                <Card.Header className="border-bottom border-200 px-0">
                <AllTicketsHeader
                    table
                    layout={layout}
                    handleShow={handleShow}
                    isLoading={isLoading}
                />
                </Card.Header>
                <Card.Body className="p-0">
                <TableRowClick
                    table
                    headerClassName="bg-body-tertiary align-middle"
                    rowClassName="align-middle white-space-nowrap"
                    onRowClick={(id) => handleRowClick(id)} 
                    tableProps={{
                    bordered: false,
                    className: 'fs--1 mb-0 overflow-hidden'
                    }}
                />
                </Card.Body>
                <Card.Footer>
                <AdvanceTablePagination table />
                </Card.Footer>
            </Card>
            </AdvanceTableWrapper>
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
                <TicketsFilterForm  estatus={estatus} personas={personas} areas={areas} prioridad={prioridad} setFilter={setFilter} filter={filter} />
            </Offcanvas>
    </Row>
  );
}

export default TableTickets;