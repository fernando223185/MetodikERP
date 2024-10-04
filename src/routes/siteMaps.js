import {
  faUser,
  faBook,
  faTruck,
  faRoute,
  faSearchLocation,
  faStore,
  faUsers,
  faUserSecret,
  faBox
} from "@fortawesome/free-solid-svg-icons";

export const dashboardRoutes = {
  label: "Dashboard",
  labelDisable: true,
  children: [
    {
      name: 'Inicio',
      to: '/',
      exact: true,
      active: true
    },
  ], 
};

export const appRoutes = {
  label: "Modulos",
  children: [
    {
      name: "Catalogos",
      icon: faBook,
      active: true,
      children: [
        {
          name: "Usuarios",
          icon: faUser,
          to: "/configuration/users",
          active: true,
        },
        {
            name: "Agentes",
            icon: faUserSecret,
            to: "/configuration/agentes",
            active: true
        },
        {
          name: "Vehiculos",
          icon: faTruck,
          to: "/configuration/vehiculos",
          active: true,
        },
        {
          name: "Rutas",
          icon: faRoute,
          to: "/configuration/rutas",
          active: true,
        },
        {
          name: "Destinos",
          icon: faSearchLocation,
          to: "/configuration/destinos",
          active: true,
        },
        {
          name: "Perfiles",
          icon: faSearchLocation,
          to: "/configuration/profiles",
          active: true,
        },
        {
          name: "Clientes",
          icon: faUsers,
          to: "/catalogo/clientes",
          active: true,
        },
      ],
    },
    {
      name: "Comercial",
      icon: "dollar-sign",
      active: true,
      children: [
        {
          name: "Reservas",
          icon: faStore,
          to: "/comercial/reservas",
          active: true,
        },
        {
          name: "Paqueteria",
          icon: faBox,
          to: "/comercial/paqueteria",
          active: true,
        },
      ],
    },
    {
      name: "Exploradores",
      icon: "search",
      active: true,
      children: [
        {
          name: "Rutas",
          icon: faRoute,
          to: "/Explorador/ExploradorRutas",
          active: true,
        },
      ],
    },
  ],
};

const routes = [dashboardRoutes, appRoutes];

export default routes;
