import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';
import TableUsers from './tables/tableAgentes';


const AgentesHeader = () => {
    return (
        <Container fluid className="py-3 px-4 border-bottom mb-4">
            <Row className="align-items-center">
                <Col>
                    <h2 className="mb-0">Agentes</h2>
                    <span className="text-muted">Módulo de administración de agentes</span>
                </Col>
            </Row>
        </Container>
    );
};

const Agentes = () => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedAgente, setSelectedAgente] = useState(null);
  const [formToShow, setFormToShow] = useState(''); 


  const handleEditClick = (agente, formType) => {
    setSelectedAgente(agente);
    setFormToShow(formType); 
    setLgShow(true);
  };

  const handleCloseModal = () => {
    setLgShow(false);
    setSelectedAgente(null);
  };

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios
    console.log('Agente actualizado:', selectedAgente);
    setLgShow(false);
  };

  return (
    <>
      <AgentesHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <TableUsers onEditClick={handleEditClick} />
            </Card.Body>
          </Card>        
        </Col>
      </Row>
    </>
  );
};

export default Agentes;
