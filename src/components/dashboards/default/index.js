import React, { useState, useEffect } from "react";
import CustomCard from "../quickaccess/CustomCard";
import {useAccesosRapidos} from "../../../hooks/Catalogos/Perfiles/usePerfiles";

const Dashboard = () => {
  // Obtener datos del usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user?.Nombres || "Usuario";
  const companyName = user?.EmpresaNombre || "Empresa";
  const { accesosRapidos, routes, isLoading } = useAccesosRapidos();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const PersonaID = user && user.ID ? user.ID : null;
    accesosRapidos(PersonaID);
  }, []);

  const cards = [
    {
      title: "Vista 1",
      icon: "faCoffee",
      subtitle: "Previsualización 1",
      navigateTo: "Explorador/PaqueteriaEntrega",
    },
    {
      title: "Vista 2",
      icon: "faAppleAlt",
      subtitle: "Previsualización 2",
      navigateTo: "/comercial/paqueteria",
    },
    {
      title: "Vista 3",
      icon: "faCar",
      subtitle: "Previsualización 3",
      navigateTo: "/logistica/rutas",
    },
  ];

  return (
    <div className="container">
      {/* Título de bienvenida */}
      <div className="text-center my-4">
        <h1 className="fw-bold">Bienvenido a Metodik, {userName}!</h1>
        <h3 className="text-muted">{companyName}</h3>
      </div>

      {/* Tarjetas */}
      <div className="d-flex flex-wrap justify-content-center">
        {routes.map((card, index) => (
          <CustomCard
            key={index}
            title={card.title}
            icon={card.icon}
            subtitle={card.subtitle}
            navigateTo={card.navigateTo} // Ruta de previsualización y redirección
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
