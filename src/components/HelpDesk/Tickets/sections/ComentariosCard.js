import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TableComentarios from '../Tables/TableComentarios';

const ComentariosCard = ({ comentariosID }) => {
    console.log("comentariosID",comentariosID)
    return (
        <Card className="mb-3">
          <Card.Header>
            <Row className="align-items-center mb-1">
              <Col>
                <h5 className="mb-0">Comentarios</h5>
              </Col>
            </Row>
            <hr />
          </Card.Header>
          <Card.Body>
            <TableComentarios comentariosID={comentariosID}/>
          </Card.Body>
        </Card>
      );
    
  };
  
  export default ComentariosCard;