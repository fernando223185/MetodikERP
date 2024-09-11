import React from 'react';
import { Card } from 'react-bootstrap';
import { useGetReservaID } from '../../../../hooks/Comercial/Reserva/useReservaD'
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
        <p><strong>Folio:</strong> <span className="text-muted">{reservaId.Folio}</span></p>
        <p><strong>Fecha Emisión:</strong> <span className="text-muted">{reservaId.FechaEmision}</span></p>
        <p><strong>Agente:</strong> <span className="text-muted">{reservaId.Agente}</span></p>
        <hr />
        <p><strong>Subtotal:</strong> <span className="text-muted">{reservaId.SubTotal}</span></p>
        <p><strong>Impuestos:</strong> <span className="text-muted">{reservaId.Impuestos}</span></p>
        <p><strong>Descuento:</strong> <span className="text-muted">{reservaId.Descuento}</span></p>
        <p><strong>Importe Total:</strong> <span className="text-muted">{reservaId.ImporteTotal}</span></p>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
