import IconButton from "components/common/IconButton";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import RegresarButton from "./RegresarButton";


const PreviewClientesHeader = ({cliente}) => {
    return (
        <Card className="mb-3">
            <Card.Body>
            <Row className="justify-content-between align-items-center">
                <Col md>
                <h5 className="mb-2 mb-md-0">Cliente: {cliente.Nombre}</h5>
                </Col>
                <Col xs="auto">
                    <RegresarButton />
                    <Link to={`/catalogo/clientes/actCliente/${cliente.ID}`}>
                        <IconButton
                            variant="falcon-primary"
                            size="sm"
                            icon="edit"
                            className="mb-2 mb-sm-0"
                        >
                            Editar
                        </IconButton>
                    </Link>
                </Col>
            </Row>
            </Card.Body>
        </Card>
    );
};

export default PreviewClientesHeader;