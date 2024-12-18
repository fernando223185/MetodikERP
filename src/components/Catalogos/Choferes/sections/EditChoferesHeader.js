import IconButton from "components/common/IconButton";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import RegresarButton from "./RegresarButton";


const EditChoferesHeader = ({newChofer}) => {
    return (
        <Card className="mb-3">
            <Card.Body>
            <Row className="justify-content-between align-items-center">
                <Col md>
                { newChofer ? 
                    <h5 className="mb-2 mb-md-0">Nuevo Chofer</h5> :
                    <h5 className="mb-2 mb-md-0">Editar Chofer</h5>
                }
                </Col>
                <Col xs="auto">
                    <RegresarButton />
                </Col>
            </Row>
            </Card.Body>
        </Card>
    );
};

export default EditChoferesHeader;