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
import { faCheck, faBan, faPaperPlane, faUpload } from '@fortawesome/free-solid-svg-icons';


const Banner = ({ chofer, formik}) => {
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
                        <div className="d-flex mt-3">
                            <IconButton
                                variant="falcon-primary"
                                size="sm"
                                icon={faUpload}
                                className="me-2"
                                onClick={() => document.getElementById('upload-profile').click()}
                            >
                                Subir Foto de Perfil
                            </IconButton>
                            <input
                                type="file"
                                id="upload-profile"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(event) => formik.setFieldValue('profileImage', event.target.files[0])}
                            />
                            <IconButton
                                variant="falcon-primary"
                                size="sm"
                                icon={faUpload}
                                onClick={() => document.getElementById('upload-banner').click()}
                            >
                                Subir Foto del Banner
                            </IconButton>
                            <input
                                type="file"
                                id="upload-banner"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(event) => formik.setFieldValue('bannerImage', event.target.files[0])}
                            />
                        </div>
                    <div className="border-dashed border-bottom my-4 d-lg-none" />
                    </Col>
                </Row>
            </ProfileBanner.Body>
        </ProfileBanner>
    );
};

export default Banner;