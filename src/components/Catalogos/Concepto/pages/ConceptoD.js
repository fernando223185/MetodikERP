import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Spinner} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faReply } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import { useGetFiltroCatalogo } from "hooks/useFiltros";
import { useGetConceptoID } from "hooks/Catalogos/Concepto/useConcepto";
import FormConceptoD from "../Profiles/FormConceptosD";

const ConceptoDHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Configuración de Conceptos</h2>
            <span className="text-muted">Administra los Conceptos</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/Catalogos/concepto/`}>
                <IconButton variant="falcon-default" size="sm" className="mb-2 mb-sm-0 me-2 d-flex align-items-center" title="Regresar">
                  <FontAwesomeIcon icon={faReply} className="me-1" /> Regresar
                </IconButton>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

const ConceptoD = () => {

    const { id } = useParams();
    const { getConceptoID, conceptoID, isLoading, error} = useGetConceptoID();
    const [hasFetched, setHasFetched] = useState(false);
    const [updatedList, setUpdateList] = useState(false);

    const {getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([])
    const [modulos, setModulos] = useState([])
    const [showFormMov, setFormMov] = useState(false)

    useEffect(() => {
        const fetchConceptoID = async () => {
            if (id!= null && id>0) {
                await getConceptoID({id})
            }
        };
        fetchConceptoID();
    },[id, hasFetched, updatedList])

    useEffect(() => {
        const fetchEstatus = async () => {
        const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Concepto' };
                const result = await getFiltroCatalogo(data);
                  setEstatus(result);
        };
        const fetchModulos = async () => {
            const data = { Tipo: 'Modulos', PersonaID: 1, Modulo: 'Concepto' };
                    const result = await getFiltroCatalogo(data);
                      setModulos(result);
        };
        fetchModulos();    
        fetchEstatus();
    }, []);

    if (isLoading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        );
    }

    return(
        <>
          <ConceptoDHeader />
          <Row className="g-3 mb-3">
            <Col lg={12}>
              <Card style={{backgroundColor: 'transparent', border: 'none'}}>
                <Card.Body>
                  <Col md={12}>
                      <FormConceptoD
                      conceptoID={conceptoID}
                      isLoading={isLoading}
                      setHasFetched={setHasFetched} 
                      estatus={estatus}
                      modulos={modulos}
                      />
                  </Col>
                </Card.Body>
              </Card>  
            </Col>
          </Row>
        </>
    )
}

export default ConceptoD;