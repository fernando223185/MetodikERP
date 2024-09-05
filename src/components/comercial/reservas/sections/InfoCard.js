import React from 'react';
import { Card } from 'react-bootstrap';

const InfoCard = () => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h5>Estatus: <span className="badge bg-primary">BORRADOR</span></h5>
        <hr />
        <p><strong>Folio:</strong> <span className="text-muted">#12345</span></p>
        <p><strong>Fecha Emisión:</strong> <span className="text-muted">03/09/2024</span></p>
        <p><strong>Agente:</strong> <span className="text-muted">Admin Sistemas Sistemas</span></p>
        <hr />
        <p><strong>Subtotal:</strong> <span className="text-muted">$0.00</span></p>
        <p><strong>Impuestos:</strong> <span className="text-muted">$0.00</span></p>
        <p><strong>Descuento:</strong> <span className="text-muted">$0.00</span></p>
        <p><strong>Importe Total:</strong> <span className="text-muted">$0.00</span></p>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
