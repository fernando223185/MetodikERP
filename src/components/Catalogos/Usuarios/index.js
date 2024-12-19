import React, {useState, useEffect} from 'react';
import { Col, Row, Container, Card, Spinner, Tab } from 'react-bootstrap';
import { useGetUsers } from 'hooks/Catalogos/Usuarios/useUsuario';
import {useGetFiltroCatalogo} from 'hooks/useFiltros';
import TableUsuarios from './tables/TableUsuarios';
import ViewCards from './sections/ViewCards';
import { useLocation } from "react-router";

const UsuariosHeader = () => {
    return (
        <Container fluid className='py-3 px-4 border-bottom mb-4'>
            <Row className='align-items-center'>
                <Col>
                    <h2 className='mb-0'>Usuarios</h2>
                    <span className='text-muted'>Tablero de control</span>
                </Col>
            </Row>
        </Container>
    );
};

const Usuarios = () => {

    const { getUsers, users, isLoading: isLoadingUsers } = useGetUsers();
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();

    const [formview, setFormView] = useState(null); // use state to change the table view
    const location = useLocation();
    const { formView } = location.state || {};
    const [estatus, setEstatus] = useState([]);
    const [sucursal, setSucursal] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [perfil, setPerfil] = useState([]);
    const [ filter, setFilter ] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {

        console.log(filter);
        const data = {
            EstatusID: filter.EstatusID ? filter.EstatusID : null,
            EmpresaID: filter.EmpresaID ? filter.EmpresaID : null,
            SucursalID: filter.SucursalID ? filter.SucursalID : null,
            PerfilID: filter.PerfilID ? filter.PerfilID : null
        }
        console.log(data);
       getUsers(data);
       setShow(false);
    }, [filter]);

    useEffect(() => {
        const fecthEstatus = async () => {
            const data = { Tipo: 'Estatus', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setEstatus(result);
        }

        const fetchSucursal = async () => {
            const data = { Tipo: 'Sucursal', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setSucursal(result);
        }

        const fetchEmpresa = async () => {
            const data = { Tipo: 'Empresa', PersonaID: 1, Modulo: 'Choferes' };
            const result = await getFiltroCatalogo(data);
            setEmpresa(result);
        }

        const fetchPerfil = async () => {
            const data = { Tipo: 'Perfiles', PersonaID: 1, Modulo: 'Usuarios' };
            const result = await getFiltroCatalogo(data);   
            setPerfil(result);
        }

        fetchPerfil();
        fecthEstatus();
        fetchEmpresa();
        fetchSucursal();

        setFormView(formView || 'view-table');

    }, []);

    useEffect(() => {
        setFormView(formView || 'view-table');
    }, [formView]);


    if(users.length === 0 && isLoadingUsers){
        return (
            <Container className='d-flex justify-content-center align-items-center'>
                <Spinner animation='border' />
            </Container>
        );
    };


    return ( 
        console.log(formView), 
          <>
            <UsuariosHeader />
            <Row className='g-3 mb-3'>
                <Col lg={12}>
                    {formview === 'view-card' ? (
                        <ViewCards choferes={users} estatus={estatus} sucursal={sucursal} empresa={empresa} layout={formview} setFilter={setFilter} />
                    ) : (
                        <TableUsuarios users={users} estatus={estatus} sucursal={sucursal} empresa={empresa} layout={formview} show={show} setShow={setShow} filter={filter} setFilter={setFilter} />
                    )}
                </Col>
            </Row>
        </>
    )
}

export default Usuarios;