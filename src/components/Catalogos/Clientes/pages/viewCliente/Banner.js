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


const Banner = ({ cliente }) => {
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
                            {cliente.Nombre}
                        </h4>
                        <SubtleBadge pill
                            bg={classNames({
                                success: cliente.Estatus === 'ALTA',
                                danger: cliente.Estatus === 'BAJA'
                            })}
                            className='fs--2'
                        >
                            {cliente.Estatus}
                            <FontAwesomeIcon 
                                icon={getStatusIcon(cliente.Estatus)}
                                transform="shrink-2"
                                className='ms-1'
                            />
                        </SubtleBadge>
                    <div className="border-dashed border-bottom my-4 d-lg-none" />
                    </Col>
                </Row>
            </ProfileBanner.Body>
        </ProfileBanner>
    );
};

export default Banner;