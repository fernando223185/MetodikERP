import Avatar from "components/common/Avatar";
import Flex from "components/common/Flex";
import { Link } from "react-router-dom";

export const columns = [
    {
        accessor: 'Ruta',
        Header: 'Ruta',
        headerProps: { className: 'ps-2 text-900', style: { height: '46px' } },
        cellProps: {
            className: 'py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2'
        },
        Cell: rowData => {
            const { Ruta, avatar } = rowData.row.original;
            return (
              <Flex alignItems="center" className="position-relative py-1">
                {avatar && avatar.img ? (
                  <Avatar src={avatar.img} size="xl" className="me-2" />
                ) : (
                  <Avatar size="xl" name={avatar ? avatar.name : Ruta} className="me-2" />
                )}
                <h6 className="mb-0">
                    <Link
                    to="#"
                    className="stretched-link text-900"
                    onClick={(e) => e.stopPropagation()}
                    >
                        {Ruta}
                    </Link>
                </h6>
              </Flex>
            );
        }
    },
    {
        accessor: "Zona",
        Header: "Zona",
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: "Origen",
        Header: "Origen",
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: "Destino",
        Header: "Destino",
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: "Estatus",
        Header: "Estatus",
        headerProps: { className: 'text-center text-900' },
        cellProps: {
            className: 'text-center py-2 pe-4'
        }
    }
];

export const descensosColumns = [
    {
        accessor: "Acciones",
        Header: '',
        headerProps: { className: "text-900" },
        cellProps: { className: "text-center" }
    },
    {
        accessor: "Descenso",
        Header: "Descenso",
        headerProps: { className: "text-900 text-center" },
        cellProps: { className: "text-center" }
    },
    {
        accessor: "Kms",
        Header: "Kilometros",
        headerProps: { className: "text-900 text-center" },
        cellProps: { className: "text-center" }
    },
    {
        accessor: "PrecioNino",
        Header: "Precio Niño",
        headerProps: { className: "text-900 text-center" },
        cellProps: { className: "text-center" }
    },
    {
        accessor: "PrecioAdulto",
        Header: "Precio Adulto",
        headerProps: { className: "text-900 text-center" },
        cellProps: { className: "text-center" }
    },
    {
        accessor: "PrecioInapam",
        Header: "Precion Inapam",
        headerProps: { className: "text-900 text-center" },
        cellProps: { className: "text-center" }
    },
];