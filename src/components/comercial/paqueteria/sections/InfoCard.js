import React from 'react';
import { Card } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const InfoCard = ({ paqueteriaId }) => {
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
            success:  paqueteriaId.Estatus === 'CONCLUIDO',
            primary:  paqueteriaId.Estatus  === 'SINAFECTAR',
            warning: paqueteriaId.Estatus  === 'PENDIENTE',
            secondary: paqueteriaId.Estatus === 'BORRADOR',
            danger: paqueteriaId.Estatus === 'CANCELADO'
          })} 
          className="fs--2 ms-2 " 
          >
            {paqueteriaId.Estatus}
            <FontAwesomeIcon
              icon={getStatusIcon(paqueteriaId.Estatus)}
              transform="shrink-2"
              className="ms-1"
            />

          </SubtleBadge>  
        </p>      
        <hr />
        <p><strong>Folio:</strong> <span className="text-muted">{paqueteriaId.Folio}</span></p>
        <p><strong>Fecha Emisión:</strong> <span className="text-muted">{paqueteriaId.FechaEmision}</span></p>
        <p><strong>Usuario:</strong> <span className="text-muted">{paqueteriaId.Agente}</span></p>
        <hr />
        <p><strong>Subtotal:</strong> <span className="text-muted">{paqueteriaId.SubTotal}</span></p>
        <p><strong>Descuento:</strong> <span className="text-muted">{paqueteriaId.Descuento}</span></p>
        <p><strong>Impuestos:</strong> <span className="text-muted">{paqueteriaId.Impuestos}</span></p>
        <p><strong>Importe Total:</strong> <span className="text-muted">{paqueteriaId.ImporteTotal}</span></p>
      </Card.Body>
      <Card.Footer>
        <p><strong>Cantidad Paquetes:</strong> <span className="text-muted">{paqueteriaId.CantidadTotal}</span></p>
        <p><strong>Peso Total:</strong> <span className="text-muted">{paqueteriaId.PesoTotal}</span></p>
      </Card.Footer>
    </Card>
  );
};

export default InfoCard;
