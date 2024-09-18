import {
  faUser,
  faCompass,
  faBook,
  faTruck,
  faRoute,
  faScrewdriver,
  faSearchLocation,
  faStore,
  faBuilding,
  faWarehouse
} from "@fortawesome/free-solid-svg-icons";

export const dashboardRoutes = {
  label: "Dashboard",
  labelDisable: true,
  children: [],
};
export const appRoutes = {
  label: "Modulos",
  /*children: [

    {
      name: 'Catalogos',
      icon: faBook,
      active: true,
      children: [
        {
          name: 'Usuarios',
          to: '/configuration/users',
          active: true
        },
        {
          name: 'Perfiles',
          to: '/configuration/Profiles',
          active: true
        },
        {
          name: 'Empresas',
          to: '/configuration/empresas',
          active: true
        },
        {
          name: 'Sucursales',
          to: '/configuration/sucursales',
          active: true
        },
        {
          name: 'Vehiculos',
          to: '/configuration/vehiculos',
          active: true
        },
        {
          name: 'Almacenes',
          to: '/configuration/almacenes',
          active: true
        },
        {
          name: 'Rutas',
          to: '/configuration/rutas',
          active: true
        },
        {
          name: 'Choferes',
          to: '/configuration/choferes',
          active: true
        },
        {
          name: 'Monedas',
          to: '/email/compose',
          active: true
        },
        {
          name: 'Destinos',
          to: '/configuration/destinos',
          active: true
        },
        {
          name: 'Monedas',
          to: '/email/compose',
          active: true
        }
      ]
    },
    {
      name: 'Comercial',
      icon: 'dollar-sign',
      active: true,
      children: [
        {
          name: 'Ventas',
          to: '/e-commerce/customers',
          active: true
        },
        {
          name: 'POS',
          to: '/e-commerce/customer-details',
          active: true
        },
        {
          name: 'PedidoWeb',
          to: '/e-commerce/shopping-cart',
          active: true
        },
        {
          name: 'Reservas',
          to: '/comercial/reservas',
          active: true
        },
        {
          name: 'Paqueteria',
          to: '/e-commerce/billing',
          active: true
        }
      ]
    },
    {
      name: 'CFDI',
      icon: 'bell',
      active: true,
      children: [
        {
          name: 'Course',
          active: true,
          children: [
            {
              name: 'Create a course',
              to: '/e-learning/course/create-a-course',
              active: true
            },
            {
              name: 'Course list',
              to: '/e-learning/course/course-list',
              active: true
            },
            {
              name: 'Course grid',
              to: '/e-learning/course/course-grid',
              active: true
            },
            {
              name: 'Course details',
              to: '/e-learning/course/course-details',
              active: true
            }
          ]
        },
        {
          name: 'Student overview',
          to: '/e-learning/student-overview',
          active: true
        },
        {
          name: 'Trainer profile',
          to: '/e-learning/trainer-profile',
          active: true
        }
      ]
    },
    {
      name: 'Fiscal',
      icon: faBalanceScale,
      to: '/app/kanban',
      active: true,
      children: [
        {
          name: 'Ingresos',
          active: true,
          to: '/e-learning/student-overview'
        },
        {
          name: 'Egresos',
          to: '/e-learning/student-overview',
          active: true
        },
        {
          name: 'Nomina',
          to: '/e-learning/trainer-profile',
          active: true
        }
      ]
    },
    {
      name: 'Exploradores',
      icon: 'search',
      active: true,
      children: [
        {
          name: 'Comercial',
          to: '/social/feed',
          active: true
        },
        {
          name: 'Rutas',
          to: '/Explorador/ExploradorRutas',
          active: true
        },
      ]
    },
    {
      name: 'Financiero',
      icon: faBuilding,
      active: true,
      children: [
        {
          name: 'Cuentas por cobrar',
          to: '/support-desk/table-view',
          active: true
        },
        {
          name: 'Cuentas por pagar',
          to: '/support-desk/card-view',
          active: true
        },
        {
          name: 'Contabilidad',
          to: '/support-desk/contacts',
          active: true
        },
        {
          name: 'Activos Fijos',
          to: '/support-desk/contact-details',
          active: true
        },
        {
          name: 'Conciliaciones',
          to: '/support-desk/tickets-preview',
          active: true
        }
      ]
    },
    {
      name: 'Logistica',
      icon: faWarehouse,
      active: true,
      children: [
        {
          name: 'Inventarios',
          to: '/support-desk/table-view',
          active: true
        },
        {
          name: 'Compras',
          to: '/support-desk/card-view',
          active: true
        },
        {
          name: 'Contabilidad',
          to: '/support-desk/contacts',
          active: true
        },
        {
          name: 'Activos Fijos',
          to: '/support-desk/contact-details',
          active: true
        },
        {
          name: 'Conciliaciones',
          to: '/support-desk/tickets-preview',
          active: true
        }
      ]
    },
    {
      name: 'RRHH',
      icon: faPersonBooth,
      active: true,
      children: [
        {
          name: 'Asistencias',
          to: '/support-desk/table-view',
          active: true
        },
        {
          name: 'Incidencias',
          to: '/support-desk/card-view',
          active: true
        },
        {
          name: 'Nomina',
          to: '/support-desk/contacts',
          active: true
        },
        {
          name: 'Evaluaciones',
          to: '/support-desk/contact-details',
          active: true
        },
        {
          name: 'RRHH',
          to: '/support-desk/tickets-preview',
          active: true
        }
      ]
    },
    {
      name: 'CRM',
      icon: faUsers,
      active: true,
      children: [
        {
          name: 'Prospectos',
          to: '/support-desk/table-view',
          active: true
        },
        {
          name: 'Oportunidades',
          to: '/support-desk/card-view',
          active: true
        }
      ]
    },
    {
      name: 'PLM',
      icon: faTshirt,
      active: true,
      children: [
        {
          name: 'Prototipos',
          to: '/support-desk/table-view',
          active: true
        },
        {
          name: 'Muestras',
          to: '/support-desk/card-view',
          active: true
        }
      ]
    },
    {
      name: 'WMS',
      icon: faBox,
      to: '/support-desk/card-view',
      active: true
    },
    {
      name: 'Envios',
      icon: faPaperPlane,
      to: '/support-desk/card-view',
      active: true
    },
    {
      name: 'Campañas',
      icon: faCampground,
      to: '/support-desk/card-view',
      active: true
    },
    {
      name: 'Monitor de licencias Gral',
      icon: faDesktop,
      to: '/support-desk/card-view',
      active: true
    },
    {
      name: 'Monitor de licencias Cte',
      icon: 'ticket-alt',
      to: '/support-desk/card-view',
      active: true
    }
  ] */

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
        /*{
            name: "Sucursales",
            icon: faBuilding,
            to: "/configuration/sucursales",
            activate: true,
        },
        {
            name: "Almacenes",
            icon: faWarehouse,
            to: "/configuration/almacenes",
            activate: true,
        },*/
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
        }
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
    }
  ],
};

/*
export const pagesRoutes = {
  label: 'pages',
  children: []
};

export const modulesRoutes = {
  label: 'Modules',
  children: []
};

export const documentationRoutes = {
  label: 'documentation',
  children: []
};
*/

export default [
  dashboardRoutes,
  appRoutes,
  //pagesRoutes,
  //modulesRoutes,
  //documentationRoutes
];
