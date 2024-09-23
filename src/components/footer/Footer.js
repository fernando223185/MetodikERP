import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { version } from 'config';

const Footer = () => (
  <footer className="footer">
    <Row className="justify-content-between text-center fs--1 mt-4 mb-3">
      <Col sm="auto">
        <p className="mb-0 text-600">
          Desarrollado por Metodik{' '}
          <span className="d-none d-sm-inline-block">| </span>
          <br className="d-sm-none" /> {new Date().getFullYear()} &copy;{' '}
          <a href="#">Metodik</a>
        </p>
      </Col>
      <Col sm="auto">
        <p className="mb-0 text-600">v3.0.0</p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
