import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de que los estilos de DatePicker estén incluidos
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTrash,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useActParadaD, useDelRowParadaD } from "hooks/Logistica/Ruta/useRutaD";
import { toast } from "react-toastify";
import ModalAsientos from "../modal/ModalAsientos";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
  {
    accessor: "acciones",
    Header: "",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "concepto",
    Header: "Concepto",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "importe",
    Header: "Importe",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "referencia",
    Header: "Referencia",
    headerProps: { className: "text-900" },
  }
];

function TableGastosRuta({ gastosRuta, setUpdateList }) {
  const [result, setResult] = useState([]);
  const [editableRows, setEditableRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    delRowParadaD,
    result: resultDel,
    isLoading: isLoadingDel,
  } = useDelRowParadaD();
  const { actParadaD, result: resultD, isLoading } = useActParadaD();



  useEffect(() => {
    console.log(resultD);
    if (resultD && Object.keys(resultD).length === 0) {
      console.log("resultD es un array vacío:", resultD);
    } else if (resultD && resultD.status === 200) {
      toast[resultD.data[0].Tipo](`${resultD.data[0].Mensaje}`, {
        theme: "colored",
        position: resultD.data[0].Posicion,
        icon:
          resultD.data[0].Tipo === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : resultD.data[0].Tipo === "error" ? (
            <FontAwesomeIcon icon={faExclamationTriangle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          ),
      });
      setUpdateList((prev) => !prev);
    } else if (resultD) {
      toast.error(`Error al guardar`, {
        theme: "colored",
        position: "top-right",
      });
    }
  }, [resultD]);

  useEffect(() => {
    console.log(resultDel);
    if (resultDel && Object.keys(resultDel).length === 0) {
      console.log("resultNew es un array vacío:", resultDel);
    } else if (resultDel && resultDel.status === 200) {
      toast[resultDel.data[0].Tipo](`${resultDel.data[0].Mensaje}`, {
        theme: "colored",
        position: resultDel.data[0].Posicion,
        icon:
          resultDel.data[0].Tipo === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : resultDel.data[0].Tipo === "error" ? (
            <FontAwesomeIcon icon={faExclamationTriangle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          ),
      });
      setTimeout(() => {
        setUpdateList((prev) => !prev);
      }, 1000);
    } else if (resultDel) {
      toast.error(`Error al guardar`, {
        theme: "colored",
        position: "top-right",
      });
    }
  }, [resultDel]);

  useEffect(() => {
    if (gastosRuta) {
      const transformedData = gastosRuta.map((u) => ({
        concepto: u.Concepto,
        importe: u.Importe,
        referencia: u.Referencia,
      }));
      setResult(transformedData);
    }
  }, [gastosRuta, editableRows]);

  return (
    <>
      <AdvanceTableWrapper
        columns={columns}
        data={result}
        sortable
        pagination
        perPage={15}
      >
        <Row className="justify-content-start mb-3">
          <Col xs="auto">
            <AdvanceTableSearchBox table />
          </Col>
        </Row>
        <hr style={{ margin: "10px 0" }} />
        <AdvanceTable
          table
          headerClassName="bg-200 text-nowrap align-middle"
          rowClassName="align-middle white-space-nowrap"
          tableProps={{
            bordered: true,
            striped: true,
            className: "fs--1 mb-0 overflow-hidden",
          }}
        />
        <div className="mt-3">
          <AdvanceTableFooter
            rowCount={result.length}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
          />
        </div>
      </AdvanceTableWrapper>
    </>
  );
}

export default TableGastosRuta;
