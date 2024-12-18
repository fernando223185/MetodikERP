import React from 'react';
import { Card } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { faPaperPlane, faExclamation, faBell} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const InfoCard = ({ ticketID }) => {
  console.log("ticket",ticketID)

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

  return (
    <Card className="mb-3">
      <Card.Body>
        <p><strong>Titulo:</strong> <span className="text-muted">{ticketID.Nombre}</span></p>
        <p>
          <strong>
            Estatus: 
          </strong>
          <SubtleBadge pill           
            bg={classNames({
                success:  ticketID.Estatus === 'CONCLUIDO',
                warning: ticketID.Estatus  === 'PENDIENTE',
                secondary: ticketID.Estatus === 'EN PROCESO',
                danger: ticketID.Estatus === 'CANCELADO'
          })} 
          className="fs--2 ms-2 " 
          >
            {ticketID.Estatus}
            <FontAwesomeIcon
              transform="shrink-2"
              className="ms-1"
            />

          </SubtleBadge>  
        </p>      
        <hr />
        <p><strong>Prioridad:</strong> 
          <SubtleBadge pill           
            bg={classNames({
                secondary:  ticketID.Prioridad === 'BAJA',
                warning: ticketID.Prioridad  === 'MEDIA',
                danger: ticketID.Prioridad === 'ALTA'
          })}
          className="fs--2 ms-2 " 
          >
            {ticketID.Prioridad}
            <FontAwesomeIcon
              icon={getPrioridadIcon(ticketID.Prioridad)}
              transform="shrink-2"
              className="ms-1"
            /> 
          </SubtleBadge>  
        </p>
        <p><strong>Fecha Emisión:</strong> <span className="text-muted">{ticketID.FechaEmision}</span></p>
        <p><strong>Agente:</strong> <span className="text-muted">{ticketID.Agente}</span></p>
        <hr />
        <p><strong>Ultima Edicion:</strong> <span className="text-muted">{ticketID.UltimoCambio}</span></p>
        {(ticketID.Estatus === 'EN PROCESO' || ticketID.Estatus === 'CONCLUIDO') && ( <p><strong>Fecha Inicio:</strong> <span className="text-muted">{ticketID.FechaInicioProceso} {ticketID.Agente}</span></p>)}
        {ticketID.Estatus === 'CONCLUIDO' && (<p><strong>Fecha Conclusion:</strong> <span className="text-muted">{ticketID.FechaConclusion}</span></p>)}
        <p><strong>Concepto:</strong> <span className="text-muted">{ticketID.Concepto}</span></p>
        <p><strong>Area:</strong> <span className="text-muted">{ticketID.Area}</span></p>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
