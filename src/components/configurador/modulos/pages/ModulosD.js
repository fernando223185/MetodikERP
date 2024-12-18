import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Spinner} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetModuloID,useElimModulo } from "hooks/Configurador/useModulo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faReply, faBan } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import { useGetFiltroModulo } from "hooks/useFiltros";
import FormModuloD from "../Profile/FormModuloD";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ModulosDHeader = () => {
    const { id } = useParams();
    const {elimModuloID, elimModulo, isLoading, error} = useElimModulo();
    const navigate = useNavigate();
    

    const ElimModulo = async() => {
     try{
      elimModuloID({id})
      console.log("id enviado:",id);
      toast.success('Modulo Cancelado Correctamente');
      navigate('/configuracion/modulos/');
      } catch(error){
      toast.error('Error al cancelar el Modulo');
      console.error("error al cancelar el Modulo ", error);
      }
    }

    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="mb-0">Configuración de Modulos</h2>
            <span className="text-muted">Administra los Modulos</span>
          </Col>
          <Col md={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Link to={`/configuracion/modulos/`}>
                <IconButton variant="falcon-default" size="sm" className="mb-2 mb-sm-0 me-2 d-flex align-items-center" title="Regresar">
                  <FontAwesomeIcon icon={faReply} className="me-1" /> Regresar
                </IconButton>
              </Link>
              <IconButton
                variant="falcon-danger"
                size="sm"
                className="mb-2 mb-sm-0 d-flex align-items-center" 
                title="Cancelar"
                onClick={ElimModulo}
            >
                <FontAwesomeIcon icon={faBan} className="me-1" /> Cancelar
            </IconButton>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

const ModulosD = () => {
    const { id } = useParams();
    const {getModuloID,moduloID,isLoading,error} = useGetModuloID();
    const [hasFetched, setHasFetched] = useState(false);
    const [updatedList, setUpdatedList] = useState(false);

    const {getFiltroModulo,isLoading:isLoadingFiltro} = useGetFiltroModulo();
    const [iconos,setIconos] = useState([])
    const [menus, setMenus] = useState([])
    const [tipoMenu, setTipoMenu] = useState([])
    const [showFormMov, setFormMov] = useState(false)

    useEffect(() => {
        const fetchModuloID = async () => {
            if (id!= null && id>0) {
                await getModuloID({id})
            }
        };
        fetchModuloID();
    },[id, hasFetched, updatedList])

    useEffect(() => {
        const fetchIconos = async () => {
        const data = {Tipo: 'Iconos', PersonaID: 1, Modulo:'Modulo'};
            const result = await getFiltroModulo(data);
            setIconos(result);
        };

        const fetchMenus = async () => {
          const data = {Tipo: 'Menus', PersonaID: 1, Modulo:'Modulo'};
              const result = await getFiltroModulo(data);
              setMenus(result);
        }

        const fetchTipoMenu = async () => {
          const data = {Tipo: 'Tipov2', PersonaID: 1, Modulo:'Modulo'};
              const result = await getFiltroModulo(data);
              setTipoMenu(result);
        }

        fetchTipoMenu();
        fetchMenus();
        fetchIconos();
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
          <ModulosDHeader />
          <Row className="g-3 mb-3">
            <Col lg={12}>
              <Card style={{backgroundColor: 'transparent', border: 'none'}}>
                <Card.Body>
                  <Col md={12}>
                      <FormModuloD
                      moduloID={moduloID}
                      isLoading={isLoading}
                      setHasFetched={setHasFetched} 
                      iconos={iconos}
                      menus={menus}
                      tipo={tipoMenu}
                      />
                  </Col>
                </Card.Body>
              </Card>  
            </Col>
          </Row>
        </>
      )
}

export default ModulosD;