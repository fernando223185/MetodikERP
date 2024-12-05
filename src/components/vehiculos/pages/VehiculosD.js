import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Spinner} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetVehiculoID } from "hooks/Catalogos/Vehiculos/useVehiculo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faReply } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import { useGetFiltroCatalogo } from "hooks/useFiltros";
import FormVehiculosD from "../sections/FormVehiculosD";

const VehiculosDHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Configuración de Vehiculos</h2>
            <span className="text-muted">Administra los Vehiculos</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/Catalogos/Vehiculos/`}>
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

const VehiculosD = () => {
    const { id } = useParams();
    const {getVehiculoID, vehiculoID, isLoading, error} = useGetVehiculoID();
    const [hasFetched, setHasFetched] = useState(false);
    const [updatedList,setUpdatedList] = useState(false);

    const {getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [tipovehiculo, setTipoVehiculo] = useState([]);
    const [showFormMov, setFormMov] = useState(false)

    useEffect(() => {
        const fetchVehiculoID = async () => {
            if (id!= null && id>0) {
                await getVehiculoID({id})
            }
        };
        fetchVehiculoID();
    },[id,hasFetched, updatedList])

    useEffect(() => {
        const fetchEstatus = async () => {
        const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Vehiculos' };
                const result = await getFiltroCatalogo(data);
                  setEstatus(result);
        };
    
        const fetchTipoVehiculo = async () => {
          const data = { Tipo: 'TipoVehiculo', PersonaID: 1, Modulo: 'Vehiculos' };
                  const result = await getFiltroCatalogo(data);
                    setTipoVehiculo(result);
          };
    
        fetchTipoVehiculo();
        fetchEstatus();
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
        <VehiculosDHeader />
        <Row className="g-3 mb-3">
          <Col lg={12}>
            <Card style={{backgroundColor: 'transparent', border: 'none'}}>
              <Card.Body>
                <Col md={12}>
                    <FormVehiculosD
                    vehiculoID={vehiculoID}
                    isLoading={isLoading}
                    setHasFetched={setHasFetched} 
                    estatus={estatus}
                    tipovehiculo={tipovehiculo}
                    />
                </Col>
              </Card.Body>
            </Card>  
          </Col>
        </Row>
      </>
    )



}

export default VehiculosD;