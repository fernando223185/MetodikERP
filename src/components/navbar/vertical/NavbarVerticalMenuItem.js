import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Flex from "components/common/Flex";
import SubtleBadge from "components/common/SubtleBadge";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import { useActModulosFavortitos } from "../../../hooks/Catalogos/Perfiles/usePerfiles";

const NavbarVerticalMenuItem = ({ route }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(route.isFavorite); // Inicializa con route.isFavorite
  const { actModulosFavoritos, response } = useActModulosFavortitos();

  useEffect(() => {
    // Asegura que el estado refleje cualquier cambio en route.isFavorite
    setIsFavorite(route.isFavorite);
  }, [route.isFavorite]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavoriteValue = isFavorite === 1 ? 0 : 1; // Alterna entre 0 y 1
    setIsFavorite(newFavoriteValue);

    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user && user.ID ? user.ID : null;

    const data = {
      ModuloID: route.ModuloID,
      PersonaID: userID,
      Favorito: newFavoriteValue, // Ahora envía 0 o 1
    };

    console.log(data);
    actModulosFavoritos({ data });

    // Aquí puedes implementar la lógica para enviar los datos a tu API
    // e.g., api.updateFavorite(data);
  };

  const handleItemClick = () => {
    console.log(`Redirigiendo al módulo: ${route.name}`);
    // Lógica de redirección al módulo
  };

  return (
    <div
      className="nav-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleItemClick}
      style={{
        cursor: "pointer",
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        {route.icon && solidIcons[route.icon] && (
          <span className="nav-link-icon me-2">
            <FontAwesomeIcon icon={solidIcons[route.icon]} />
          </span>
        )}
        <span
          className="nav-link-text"
          style={{
            margin: "0",
            lineHeight: "1.1",
          }}
        >
          {route.name}
        </span>
        {route.badge && (
          <SubtleBadge pill bg={route.badge.type} className="ms-2">
            {route.badge.text}
          </SubtleBadge>
        )}
      </div>

      {isHovered && route.Tipo !== "Menu" && (
        <button
          onClick={handleFavoriteClick}
          className="btn btn-link p-0"
          style={{
            fontSize: "0.9rem",
            color: isFavorite === 1 ? "gold" : "gray", // Cambia el color según 0 o 1
            marginLeft: "15px",
          }}
          aria-label={`Marcar ${route.name} como favorito`}
        >
          <FontAwesomeIcon icon={solidIcons.faStar} />
        </button>
      )}
    </div>
  );
};

// Prop-types
const routeShape = {
  active: PropTypes.bool,
  name: PropTypes.string.isRequired,
  to: PropTypes.string,
  icon: PropTypes.string,
  tipo: PropTypes.string,
  ModuloID: PropTypes.string,
  isFavorite: PropTypes.oneOf([0, 1]), // Asegura que isFavorite sea 0 o 1
};

routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
NavbarVerticalMenuItem.propTypes = {
  route: PropTypes.shape(routeShape).isRequired,
};

export default React.memo(NavbarVerticalMenuItem);
