import React, { useState, useEffect } from "react";
import { Col, Row, Container, Modal, Card, Button, Form, Spinner} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetPasajeroID } from "hooks/Catalogos/Pasajeros/usePasajeros";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faReply } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import { toast } from "react-toastify";
import { useGetFiltroCatalogo } from "hooks/useFiltros";
import FormPasajerosD from "../sections/FormPasajerosD";

const PasajerosDHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Configuración de Pasajeros</h2>
            <span className="text-muted">Administra los Pasajeros</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/Catalogos/Pasajeros/`}>
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

const PasajerosD = () => {

    const {id}= useParams();
    const {getPasajeroID, pasajeroID, isLoading, error} = useGetPasajeroID();
    const [hasFetched, setHasFetched] = useState(false); 
    const [updateList, setUpdateList] = useState(false); 

    const {getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [showFormMov, setFormMov] = useState(false)



    useEffect (() => {
        const fetchPasajeroID = async () => {
            if (id!= null && id>0) {
                await getPasajeroID({id})
            }
        };
        fetchPasajeroID();
    },[id,hasFetched, updateList])

    useEffect(() => {
        const fetchFiltros =async () => {
            const dataEstatus={Tipo: 'Estatus',PersonaID: 1, Modulo: 'Pasajeros'};
            const resultEstatus = await getFiltroCatalogo(dataEstatus);
            setEstatus(resultEstatus);
        };
        fetchFiltros();
    },[]);
    
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
        <PasajerosDHeader/>
        <Row className="g-3 mb-3">
          <Col lg={12}>
            <Card style={{backgroundColor: 'transparent', border: 'none'}}>
              <Card.Body>
                <Col md={12}>
                    <FormPasajerosD
                    pasajeroID={pasajeroID}
                    isLoading={isLoading}
                    setHasFetched={setHasFetched} 
                    estatus={estatus}
                    />
                </Col>
              </Card.Body>
            </Card>  
          </Col>
        </Row>
      </>
    )
}

export default PasajerosD;
