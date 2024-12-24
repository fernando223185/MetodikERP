import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Spinner} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetProyectoID } from "hooks/Catalogos/Proyectos/useProyectos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faReply } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import { useGetFiltroCatalogo } from "hooks/useFiltros";
import FormProyectosD from "../Profiles/FormProyectos";

const ProyectosDHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Configuración de Proyectos</h2>
            <span className="text-muted">Administra los Proyectos</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/catalogos/proyectos`}>
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

const ProyectosD = () => {
    const { id } = useParams();
    const { getProyectoID, proyectoID, isLoading, error} = useGetProyectoID();
    const [hasFetched, setHasFetched] = useState(false);
    const [updatedList, setUpdateList] = useState(false)

    const {getFiltroCatalogo, isLoading: isLoadingFiltro} = useGetFiltroCatalogo();
    const [estatus, setEstatus] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [equipo, setEquipo] = useState([]);
    const [perfil, setPerfil] = useState([]);
    const [departamento, setDepartamento] = useState([]);
    const [showFormMov, setFormMov] = useState(false)

    useEffect(() => {
        const fetchProyectoID = async () => {
            if (id!= null && id>0) {
                await getProyectoID({id})
            }
        };
        fetchProyectoID();
    },[id,hasFetched, updatedList])

    useEffect(() => {
        const fetchEstatus = async () => {
        const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Proyectos' };
                const result = await getFiltroCatalogo(data);
                    setEstatus(result);
        };

        const fetchEmpresa = async () => {
            const data = { Tipo: 'Empresa', PersonaID: 1, Modulo: 'Proyectos' };
                const result = await getFiltroCatalogo(data);
                setEmpresa(result);
        };

        const fetchEquipo = async () => {
            const data = { Tipo: 'Equipo', PersonaID: 1, Modulo: 'Proyectos' };
                const result = await getFiltroCatalogo(data);
                setEquipo(result);
        };

        const fetchPerfil = async () => {
            const data = { Tipo: 'Perfil', PersonaID: 1, Modulo: 'Proyectos' };
                const result = await getFiltroCatalogo(data);
                setPerfil(result);
        };

        const fetchDepartamento = async () => {
            const data = { Tipo: 'Departamento', PersonaID: 1, Modulo: 'Proyectos' };
                const result = await getFiltroCatalogo(data);
                setDepartamento(result);
        };

        fetchDepartamento();
        fetchPerfil();
        fetchEquipo();
        fetchEmpresa();
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
            <ProyectosDHeader />
            <Row className="g-3 mb-3">
            <Col lg={12}>
                <Card style={{backgroundColor: 'transparent', border: 'none'}}>
                <Card.Body>
                    <Col md={12}>
                        <FormProyectosD
                        proyectoID={proyectoID}
                        isLoading={isLoading}
                        setHasFetched={setHasFetched} 
                        estatus={estatus}
                        empresa={empresa}
                        equipo={equipo}
                        perfil={perfil}
                        departamento={departamento}
                        />
                    </Col>
                </Card.Body>
                </Card>  
            </Col>
            </Row>
        </>
    )
}

export default ProyectosD;