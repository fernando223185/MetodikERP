import coverSrc from 'assets/img/illustrations/BannerUser.jpeg';
import avatar from 'assets/img/illustrations/user.jpeg';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from 'components/Usuarios/ProfileBanner';
import IconButton from 'components/common/IconButton';
import SubtleBadge from 'components/common/SubtleBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faCheck, faBan, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Banner = ({ chofer }) => {
    const getStatusIcon = (estatus) => {
        switch(estatus) {
            case 'ALTA':
                return faCheck;
            case 'BAJA':
                return faBan;
            default:
                return faPaperPlane;
        };
    };

    return (
        <ProfileBanner>
            <ProfileBanner.Header avatar={avatar} coverSrc={coverSrc} />
            <ProfileBanner.Body>
                <Row className='justify-content-between'>
                    <Col lg={8}>
                        <h4 className='mb-1'>
                            {chofer.Nombre}
                        </h4>
                        <SubtleBadge pill
                            bg={classNames({
                                success: chofer.Estatus === 'ALTA',
                                danger: chofer.Estatus === 'BAJA'
                            })}
                            className='fs--2'
                        >
                            {chofer.Estatus}
                            <FontAwesomeIcon 
                                icon={getStatusIcon(chofer.Estatus)}
                                transform="shrink-2"
                                className='ms-1'
                            />
                        </SubtleBadge>
                    <div className="border-dashed border-bottom my-4 d-lg-none" />
                    </Col>
                    <Col xs="auto">
                        <Link to="/catalogo/choferes">
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
                        <Link to={`/catalogo/choferes/actChoferD/${chofer.ID}`} className="ms-auto">
                            <IconButton
                                variant="falcon-primary"
                                size="sm"
                                icon="edit"
                                className="mb-2 mb-sm-0"
                            >
                                Editar
                            </IconButton>
                        </Link>
                    </Col>
                </Row>
            </ProfileBanner.Body>
        </ProfileBanner>
    );
};

export default Banner;