import React, { useState, useEffect } from "react";
import { Col, Row, Container, Spinner } from "react-bootstrap";
import TablePreciosRutas from "./tables/tablePreciosRutas";
import { useGetIndicadores } from "../../../hooks/useIndicadores";
import { useGetPreciosRuta } from "../../../hooks/Logistica/PreciosRutas/usePreciosRutas";
import { useGetFiltroModulo } from "../../../hooks/useFiltros";
import { useLocation } from "react-router";
import ViewPreciosRutasCard from "./sections/ViewPreciosRutaCard";

const PreciosRutasHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Configurador de Precios para Rutas</h2>
          <span className="text-muted">Tablero de control</span>
        </Col>
      </Row>
    </Container>
  );
};

const Rutas = () => {
  const {
    getIndicadores,
    indicadores,
    isLoading: isLoadingIndicadores,
  } = useGetIndicadores();
  const {
    getPreciosRuta,
    preciosruta,
    isLoading: isLoadingRutas,
  } = useGetPreciosRuta();
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [destinos, setDestinos] = useState([]);
  const [dataind, setDataInd] = useState([]);
  const [formview, setFormView] = useState(null);
  const location = useLocation();
  const { formView } = location.state || {};
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = { Tipo: "Rutas", EmpresaID: user.EmpresaID };

    getIndicadores({ data });
  }, [getIndicadores]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      EmpresaID: user.EmpresaID,
      OrigenID: filter.OrigenID ? filter.OrigenID : 0,
      DestinoID: filter.DestinoID ? filter.DestinoID : 0,
    };

    getPreciosRuta({ data });
  }, [filter]);

  useEffect(() => {
    const fetchMovimientos = async () => {
      const data = { Tipo: "DestinosFiltro", PersonaID: 1, Modulo: "Rutas" };
      const result = await getFiltroModulo(data);
      setDestinos(result);
    };

    fetchMovimientos();
    setFormView(formView || "view-table");
  }, []);

  useEffect(() => {
    setFormView(formView || "view-table");
  }, [formView]);

  if (isLoadingRutas) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          marginTop: "100px",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <PreciosRutasHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          {/* <Card>
            <Card.Body>
              <TableReservas reservas={reservas} />
            </Card.Body>
          </Card> */}
          {formview === "view-card" ? (
            <ViewPreciosRutasCard
              preciosruta={preciosruta}
              destinos={destinos}
              layout={formview}
              setFilter={setFilter}
            />
          ) : (
            <TablePreciosRutas
              preciosruta={preciosruta}
              destinos={destinos}
              layout={formview}
              setFilter={setFilter}
              filter={filter}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Rutas;
