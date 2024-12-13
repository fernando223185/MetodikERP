import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { useAppContext } from "Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmpresaDropdown = ({
  empresas,
  onSelectEmpresa,
  selectedEmpresa,
  dropdownClassName,
  iconClassName = "fs-1",
}) => {
  const {
    config: { theme },
    changeTheme,
  } = useAppContext();

  return (
    <Dropdown
      navbar
      as="div"
      onSelect={onSelectEmpresa}
      className={`theme-control-dropdown ${
        dropdownClassName ? dropdownClassName : ""
      }`}
    >
      <Dropdown.Toggle
        bsPrefix="toggle"
        variant="link"
        className="nav-link dropdown-toggle d-flex align-items-center pe-1"
      >
        {selectedEmpresa ? selectedEmpresa.nombre : "Seleccionar Empresa"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card dropdown-menu-end mt-2">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          {empresas.map((empresa) => (
            <Dropdown.Item
              key={empresa.id}
              eventKey={empresa.id}
              className="link-600 fs--1 d-flex align-items-center gap-2"
            >
              <FontAwesomeIcon
                icon={
                  onSelectEmpresa === "light"
                    ? "sun"
                    : onSelectEmpresa === "dark"
                    ? "moon"
                    : "adjust"
                }
              />
              {empresa.nombre}
              
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

EmpresaDropdown.propTypes = {
  empresas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectEmpresa: PropTypes.func.isRequired,
  selectedEmpresa: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
  }),
};

export default EmpresaDropdown;
