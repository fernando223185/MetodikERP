import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import SubtleBadge from 'components/common/SubtleBadge';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faPaperPlane, faCheck, faPen, faRedo, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons'; 
import { useNewReserva } from '../../../../hooks/Comercial/Reserva/useReserva';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const columns = [
  {
    accessor: 'acciones',
    Header: '',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'estatus',
    Header: 'Estatus',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'Mov',
    Header: 'Movimiento',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'CreatedAt',
    Header: 'Fecha Emision',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'referencia',
    Header: 'Referencia',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'observaciones',
    Header: 'Observaciones',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'importe',
    Header: 'Importe total',
    headerProps: { className: 'text-900' }
  }
];

function TableReservas({reservas}) {

  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState('');
  const { newReserva, result: response, isLoading } = useNewReserva();
  const navigate = useNavigate();

  useEffect(() => {
    if (reservas && reservas.status === 200 && reservas.data.length > 0) 
    {
      const transformedData = reservas.data.map(u => ({
        acciones: (
            <Link
              to={`/comercial/reservas/reservaD/${u.ID}`}  
              className="btn btn-outline-primary rounded-pill me-1 mb-1"
            >
              <FontAwesomeIcon icon="edit" />
            </Link>
        ),
        Mov: `${u.Movimiento}`,
        CreatedAt: u.FechaEmision,
        estatus: (
          <SubtleBadge pill           
            bg={classNames({
            success:  u.Estatus === 'CONCLUIDO',
            primary:  u.Estatus  === 'SINAFECTAR',
            warning: u.Estatus  === 'PENDIENTE',
            secondary: u.Estatus === 'BORRADOR',
            danger: u.Estatus === 'CANCELADO'
          })} 
          className="fs--2" 
          >
            {u.Estatus}
            <FontAwesomeIcon
              icon={getStatusIcon(u.Estatus)}
              transform="shrink-2"
              className="ms-1"
            />

          </SubtleBadge>
        ),
        referencia: u.Referencia,
        observaciones: u.Observaciones,
        importe: u.ImporteTotal
      }));
      setResult(prevResult => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[reservas])

  const getStatusIcon = (estatus) => {
    switch (estatus) {
      case 'CONCLUIDO':
        return faCheck;
      case 'BORRADOR':
        return faPen;
      case 'PENDIENTE':
        return faSpinner;
      case 'CANCELADO':
        return faBan;
      case 'SINAFECTAR':
        return faRedo;
      default:
        return faPaperPlane;
    }
  };

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      EmpresaID: user.EmpresaID,
      PersonaID: user.ID
    };

    try {
      await newReserva({ data });
    } catch (error) {
      toast.error('Hubo un error al crear la reserva', { theme: 'colored' });
    }
  };
  
  useEffect(() => {
    if (response && response.status === 200) {
      toast[response.data[0].Tipo](response.data[0].Mensaje, { 
        theme: 'colored'
      });
      if(response.data[0].Ok === 0)
      {
        setTimeout(() => {
          navigate(`/comercial/reservas/reservaD/${response.data[0].NID}`);
        }, 1000);
      }
    }
  },[response])


  return (
    <AdvanceTableWrapper
      columns={columns}
      data={result}
      sortable
      pagination
      perPage={5}
    >
      <Row className="justify-content-start mb-3">
        <Col xs="auto">
          <AdvanceTableSearchBox table />
        </Col>
        <Col xs="auto" sm={6} lg={4} className="ms-auto text-end">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <button 
              className="btn btn-outline-primary rounded-pill me-1"
              onClick={handleClick}  
            >
              <FontAwesomeIcon icon="plus" />
            </button>
          )}
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
          rowCount={result.length}
          table
          rowInfo
          navButtons
          rowsPerPageSelection
        />
      </div>
    </AdvanceTableWrapper>
  );
}

export default TableReservas;
