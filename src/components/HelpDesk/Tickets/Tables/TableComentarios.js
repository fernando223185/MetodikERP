import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Modal, Card, Spinner, Form } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import IconButton from 'components/common/IconButton';
import { faPlay, faFile } from '@fortawesome/free-solid-svg-icons';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const columns =[
    {
        accessor: 'persona',
        Header: 'Usuario',
        headerProps: { className: 'ps-2 text-900', style: { height: '46px' } },
        cellProps: {
          className: 'py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2'
        },
        Cell: rowData => {
            const { persona, avatar } = rowData.row.original;
            return (
              <Flex alignItems="center" className="position-relative py-1">
                {avatar && avatar.img ? (
                  <Avatar src={avatar.img} size="xl" className="me-2" />
                ) : (
                  <Avatar size="xl" name={avatar ? avatar.name : persona} className="me-2" />
                )}
                <h6 className="mb-0">
                    <Link
                    to="#"
                    className="stretched-link text-900"
                    onClick={(e) => e.stopPropagation()}
                    >
                        {persona}
                    </Link>
                </h6>
              </Flex>
            );
        }
    },
    {
        accessor: 'Comentario',
        Header: 'Comentario',
        headerProps: { className: 'text-900' },
        cellProps: { className: 'text-center' }
    },
    {
        accessor: 'fechaemision',
        Header: 'Fecha Emision',
        headerProps: { className: 'text-900' },
        cellProps: { className: 'text-center' }
    },
    {
      accessor: 'RutaArchivo',
      Header: 'Archivo',
      headerProps: { className: 'text-900' },
      cellProps: { className: 'text-center' },
      Cell: rowData => {
        const { RutaArchivo } = rowData.row.original;
        if (RutaArchivo && RutaArchivo.trim() !== '') {
          return (
            <a
              href={`${API_URL}/Archivos/${RutaArchivo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton variant="falcon-primary" size="sm" title="Previsualizar archivo">
                <FontAwesomeIcon icon={faFile} />
              </IconButton>
            </a>
          );
        }
        return '';
      }
    },
];

function TableComentarios ({comentariosID}) {
  const [selectedItem, setSelectedItem] = useState(null); 
  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState('');
    
  useEffect(() => {
    if (comentariosID && comentariosID.status === 200 && comentariosID.data.length > 0) 
    {
      const transformedData = comentariosID.data.map(u => ({
        persona: u.Persona,
        avatar: {
            name: u.Persona,
            size: 'xl',
            round: 'circle'
        },
        Comentario: u.Comentario,
        fechaemision: u.FechaEmision,
        RutaArchivo: u.RutaArchivo,
        id: u.ID
      }));
      setResult(prevResult => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[comentariosID])
  
    console.log("Estos son los comentarios",comentariosID)
    console.log("result", result)

    return (
        <>
      
          <AdvanceTableWrapper
            columns={columns}
            data={result}
            sortable
            pagination
            perPage={10}
          >
              <Row className="justify-content-start mb-3">
                  <Col xs="auto">
                  <AdvanceTableSearchBox table />
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
        </>
      
        );

}

export default TableComentarios;