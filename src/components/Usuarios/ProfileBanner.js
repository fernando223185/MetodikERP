import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { subirArchivo } from 'api/files';

const EditableProfileBanner = ({ initialBanner, initialAvatar, isEditable, children, onBannerUpload, onAvatarUpload }) => {
    const [bannerSrc, setBannerSrc] = useState(initialBanner);
    const [avatarSrc, setAvatarSrc] = useState(initialAvatar);

    const handleFileUpload = async (e, tipo, setImage, onUpload) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Actualiza visualmente
            try {
                const response = await subirArchivo(file, tipo);
                if (onUpload) onUpload(response.path); // Notifica al padre la ruta del archivo subido
                console.log('Archivo subido con éxito:', response);
            } catch (error) {
                console.error('Error al subir el archivo:', error);
                alert('No se pudo subir el archivo. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <Card className="mb-4 overflow-hidden shadow" style={{ borderRadius: '16px' }}>
            {/* Sección del Banner */}
            <div className="position-relative" style={{ height: '250px', backgroundColor: '#f7f7f7' }}>
                <img 
                    src={bannerSrc} 
                    alt="Banner" 
                    className="w-100 h-100 object-fit-cover"
                />
                {isEditable && (
                    <Form.Label 
                        htmlFor="upload-banner" 
                        className="position-absolute top-0 end-0 m-2 bg-dark bg-opacity-50 text-white p-2 rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '35px', height: '35px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                    >
                        <FontAwesomeIcon icon={faUpload} size="sm" />
                    </Form.Label>
                )}
                {isEditable && (
                    <Form.Control
                        type="file"
                        id="upload-banner"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, 'Clientes/Banners', setBannerSrc, onBannerUpload)}
                    />
                )}
            </div>
            {/* Sección del Avatar */}
            <div className="position-relative d-flex flex-column align-items-center" style={{ marginTop: '-75px' }}>
                <div className="position-relative">
                    <img 
                        src={avatarSrc} 
                        alt="Avatar" 
                        className="rounded-circle border border-3 border-white shadow"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    {isEditable && (
                        <Form.Label 
                            htmlFor="upload-avatar" 
                            className="position-absolute bottom-0 end-0 bg-dark bg-opacity-50 text-white p-1 rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '35px', height: '35px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                        >
                            <FontAwesomeIcon icon={faUpload} size="sm" />
                        </Form.Label>
                    )}
                    {isEditable && (
                        <Form.Control
                            type="file"
                            id="upload-avatar"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e, 'Clientes/Avatares', setAvatarSrc, onAvatarUpload)}
                        />
                    )}
                </div>
                {children && (
                    <div className="mt-3 text-center">
                        {children}
                    </div>
                )}
            </div>
        </Card>
    );
};

EditableProfileBanner.propTypes = {
    initialBanner: PropTypes.string.isRequired,
    initialAvatar: PropTypes.string.isRequired,
    isEditable: PropTypes.bool,
    children: PropTypes.node,
    onBannerUpload: PropTypes.func,
    onAvatarUpload: PropTypes.func,
};

EditableProfileBanner.defaultProps = {
    isEditable: false,
};

export default EditableProfileBanner;