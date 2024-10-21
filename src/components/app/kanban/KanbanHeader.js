import React from 'react';
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import { members } from 'data/kanban';
import GroupMember from './GroupMember';
import InviteToBoard from './InviteToBoard';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const KanbanHeader = () => {
  return (
    <Row className="gx-0 gap-2 kanban-header rounded-2 px-x1 py-2 mt-2 mb-3">
      <Col className="d-flex align-items-center">
        <h5 className="mb-0">Metodik</h5>

      </Col>
      <Col xs="auto" as={Flex} alignItems="center">
        <Button className="me-2" variant="falcon-default" size="sm">
          <FontAwesomeIcon icon="filter" className="me-md-2" />
          <span className="d-none d-md-inline-block">Filtros</span>
        </Button>
        <Dropdown align="end" className="font-sans-serif">
          <Dropdown.Toggle
            size="sm"
            variant="falcon-default"
            className="dropdown-caret-none"
          >
            <FontAwesomeIcon icon="ellipsis-h" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="border py-2">
            <Dropdown.Item href="#!">Copiar link</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#!">Configuraciones</Dropdown.Item>
            <Dropdown.Item href="#!">Temas</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#!" className="text-danger">
              Eliminar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default KanbanHeader;
