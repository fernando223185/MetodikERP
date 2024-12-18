import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Spinner} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faReply } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import { useGetFiltroModulo } from '../../../../hooks/useFiltros'; 
import { useGetTicketID } from "hooks/HelpDesk/Tickets/useTicketD";
import FormTicketsD from "../sections/FormTicketsD";

const TicketsDHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Tickets</h2>
            <span className="text-muted">Administra los Tickets</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/HelpDesk/tickets`}>
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

const TicketsNew =() =>{
    const { id } = useParams();
    const {getTicketID, ticketID, isLoading, error} = useGetTicketID();
    const [hasFetched, setHasFetched] = useState(false);
    const [updatedList, setUpdateList] = useState(false);

    const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
    const [estatus, setEstatus] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [areas, setAreas] = useState([]);
    const [prioridad, setPrioridad] = useState([]);
    const [conceptos, setConceptos] = useState([]);

    useEffect(() => {
        const fetchTicketID = async () => {
            if (id!= null && id>0) {
                await getTicketID({id})
            }
        };
        fetchTicketID();
    },[id, hasFetched, updatedList])

    useEffect(() => {
        const fetchEstatus = async () => {
          const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Tickets' };
          const result = await getFiltroModulo(data);
          setEstatus(result); 
        }
        const fetchAreas = async () => {
          const data = { Tipo: 'Areas', PersonaID: 1, Modulo: 'Tickets' };
          const result = await getFiltroModulo(data);
          setAreas(result);
        }
        const fetchPrioridad = async () => {
          const data = { Tipo: 'Prioridad', PersonaID: 1, Modulo: 'Tickets' };
          const result = await getFiltroModulo(data);
          setPrioridad(result);
        }
        const fetchConceptos = async () => {
            const data = { Tipo: 'Conceptos', PersonaID: 1, Modulo: 'Tickets' };
            const result = await getFiltroModulo(data);
            setConceptos(result);
        }
        fetchConceptos();
        fetchAreas();
        fetchPrioridad();
        fetchEstatus();
      },[]);

      if (isLoading || isLoadingFiltro) {
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
          <TicketsDHeader />
          <Row className="g-3 mb-3">
            <Col lg={12}>
              <Card style={{backgroundColor: 'transparent', border: 'none'}}>
                <Card.Body>
                  <Col md={12}>
                      <FormTicketsD
                      ticketID={ticketID}
                      isLoading={isLoading}
                      setHasFetched={setHasFetched} 
                      estatus={estatus}
                      personas={personas}
                      areas={areas}
                      prioridad={prioridad}
                      conceptos={conceptos}
                      />
                  </Col>
                </Card.Body>
              </Card>  
            </Col>
          </Row>
        </>
    )
    

}

export default TicketsNew;

