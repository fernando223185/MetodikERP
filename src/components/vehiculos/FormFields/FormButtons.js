import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply, faEdit } from '@fortawesome/free-solid-svg-icons';


export const BackButton = ({ action }) => {

    return (
        <Button className="btn btn-secondary rounded-pill me-1" title="Regresar" type="submit" onClick={action}>
            <FontAwesomeIcon icon={faReply} />
        </Button>
    );
}

export const SaveButton = ({ isLoading }) => {

    return (
        <Button variant="primary" title="Guardar" type="submit" className="rounded-pill me-2" disabled={isLoading}>
            {isLoading ? 'Guardando...' : <FontAwesomeIcon icon={faSave} /> }
        </Button>
    );
}

export const CleanButton = ({ action, isLoading }) => {

    return (
        <Button variant="secondary" title="Limpiar" onClick={action} className="rounded-pill" disabled={isLoading}>
            {isLoading ? 'Limpiando...' : <FontAwesomeIcon icon={faEdit} /> }
        </Button>
    );
}

