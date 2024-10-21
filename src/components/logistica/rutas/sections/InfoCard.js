import React from 'react';
import { Card } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const InfoCard = ({ reservaId }) => {
  console.log("Reserva",reservaId)

  const getStatusIcon = (estatus) => {
    switch (estatus) {
      case 'CONCLUIDO':
        return faCheck;
      case 'BORRADOR':
        return faPen;
      case 'PENDIENTE':
        return faStream;
      case 'CANCELADO':
        return faBan;
      case 'SINAFECTAR':
        return faSpinner;
      default:
        return faPaperPlane;
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <p>
          <strong>
            Estatus: 
          </strong>
          <SubtleBadge pill           
            bg={classNames({
            success:  reservaId.Estatus === 'CONCLUIDO',
            primary:  reservaId.Estatus  === 'SINAFECTAR',
            warning: reservaId.Estatus  === 'PENDIENTE',
            secondary: reservaId.Estatus === 'BORRADOR',
            danger: reservaId.Estatus === 'CANCELADO'
          })} 
          className="fs--2 ms-2 " 
          >
            {reservaId.Estatus}
            <FontAwesomeIcon
              icon={getStatusIcon(reservaId.Estatus)}
              transform="shrink-2"
              className="ms-1"
            />

          </SubtleBadge>  
        </p>      
        <hr />
        <p><strong>Situacion:</strong> 
          <SubtleBadge pill           
            bg={classNames({
            success:  reservaId.Situacion === 'Confirmado' || reservaId.Situacion === 'Pagado' || reservaId.Situacion === 'Abordado',
            warning: reservaId.Situacion  === 'Por Confirmar',
            danger: reservaId.Situacion === 'No confirmado'
          })}
          className="fs--2 ms-2 " 
          >
            {reservaId.Situacion} 
          </SubtleBadge>  
        </p>
        <p><strong>Folio:</strong> <span className="text-muted">{reservaId.Folio}</span></p>
        <p><strong>Fecha Emisión:</strong> <span className="text-muted">{reservaId.FechaEmision}</span></p>
        <p><strong>Agente:</strong> <span className="text-muted">{reservaId.Usuario}</span></p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <hr />
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
