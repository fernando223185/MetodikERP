import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import routes from "../../../routes/index"; // Importa tus rutas registradas

const CustomCard = ({ title, icon, subtitle, navigateTo }) => {
  const navigate = useNavigate();

  // Busca el componente en las rutas registradas
  const PreviewComponent = routes[navigateTo] || null;

  const handleCardClick = () => {
    if (navigateTo) {
      navigate(navigateTo); 
    }
  };

  return (
    <div
      className="card text-center"
      style={{ width: "18rem", margin: "1rem", cursor: "pointer" }}
      onClick={handleCardClick} // Redirección al hacer clic
    >
      <div className="card-body d-flex flex-column align-items-center justify-content-between">
        {/* Título en negritas */}
        <h5 className="card-title fw-bold">{title}</h5>

        {/* Contenedor del ícono y subtítulo */}
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={solidIcons[icon]}
            size="3x"
            style={{ color: "#6c757d" }}
          />
          {subtitle && (
            <span
              className="ms-3 text-muted"
              style={{ fontSize: "1rem", textAlign: "left" }}
            >
              {subtitle}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

CustomCard.propTypes = {
  title: PropTypes.string.isRequired, // Título de la tarjeta
  icon: PropTypes.string.isRequired, // Nombre del ícono (e.g., 'faCoffee')
  subtitle: PropTypes.string, // Subtítulo opcional
  navigateTo: PropTypes.string, // Ruta del componente para previsualización y navegación
};

export default CustomCard;
