import React from 'react';
import bannerImage from 'assets/img/illustrations/BannerUser.jpeg';
import avatarImage from 'assets/img/illustrations/user.jpeg';
import EditableProfileBanner from 'components/Usuarios/ProfileBanner';
import { faBan, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { subirArchivo } from 'api/files';

const Banner = ({ cliente, isEditable, onBannerUpload, onProfileUpload }) => {
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
        <EditableProfileBanner
            initialBanner={cliente.RutaImagenBanner || bannerImage}
            initialAvatar={cliente.RutaImagenPerfil || avatarImage}
            isEditable={isEditable}
            onBannerUpload={onBannerUpload}
            onAvatarUpload={onProfileUpload}
        >
            <Row className='justify-content-between mb-4'>
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
            </Row>
        </EditableProfileBanner>
    );
};

export default Banner;