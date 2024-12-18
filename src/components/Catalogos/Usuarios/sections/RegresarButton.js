const { default: IconButton } = require("components/common/IconButton");
const { Link } = require("react-router-dom");


const RegresarButton = () => {
    return (
        <Link to="/catalogo/usuarios">
            <IconButton
                variant="falcon-default"
                size="sm"
                icon="reply"
                className="me-1 mb-2 mb-sm-0"
                iconClassName="me-1"
            >
                Regresar
            </IconButton>
        </Link>
    );
}

export default RegresarButton;