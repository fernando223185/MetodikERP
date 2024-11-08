import React, { useState, useEffect } from "react";
import { Col, Row, Container, Modal, Card } from "react-bootstrap";
import TableExploradorRutas from "./tables/tableRutas";
import { useGetExploradorRutas } from "../../../hooks/Exploradores/Rutas/useRutasExplorador";
import { useGetFiltroModulo } from "../../../hooks/useFiltros"; 
import { useLocation } from "react-router";


const ProfilerHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Rutas</h2>
          <span className="text-muted">Explorador de rutas</span>
        </Col>
      </Row>
    </Container>
  );
};

const ExploradorRutas = () => {

  const { getProfiles, rutes, isLoading } = useGetExploradorRutas();
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [movimientos, setMovimientos] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [situaciones, setSituacion] = useState([]);
  const [dataind, setDataInd] = useState([]);
  const [formview, setFormView] = useState(null);
  const location = useLocation();
  const { formView } = location.state || {};
  const [filter, setFilter] = useState({});


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      EmpresaID: user.EmpresaID,
      PersonaID: user.ID,
      RutaID: filter.RutaID ? filter.RutaID : null,
      OrigenID: filter.OrigenID ? filter.OrigenID : null,
      DestinoID: filter.DestinoID ? filter.DestinoID : null,
      HoraSalida: filter.HoraSalida ? filter.HoraSalida : null,
      FechaDesde: filter.FechaDesde ? filter.FechaDesde : null,
      FechaHasta: filter.FechaHasta ? filter.FechaHasta : null,
    };

    console.log(filter);

    getProfiles({ data });
  }, [filter]);


  useEffect(() => {
    const fetchMovimientos = async () => {
      const data = { Tipo: "RutaFiltro", PersonaID: 1, Modulo: "Rutas" };
      const result = await getFiltroModulo(data);
      setMovimientos(result);
    };

    const fetchEstatus = async () => {
      const data = { Tipo: "DestinosFiltro", PersonaID: 1, Modulo: "Rutas" };
      const result = await getFiltroModulo(data);
      setEstatus(result);
    };

    fetchEstatus();
    fetchMovimientos();
    setFormView(formView || "view-table");
  }, []);

  useEffect(() => {
    setFormView(formView || "view-table");
  }, [formView]);


  return (
    <>
      <ProfilerHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <TableExploradorRutas
            rutes={rutes}
            movimientos={movimientos}
            estatus={estatus}
            layout={formview}
            setFilter={setFilter}
            filter={filter}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExploradorRutas;
