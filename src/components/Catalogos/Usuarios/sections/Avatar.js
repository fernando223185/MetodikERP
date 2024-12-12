import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { isIterableArray } from 'helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Avatar = ({
  size,
  rounded,
  src,
  name,
  emoji,
  className,
  mediaClass,
  isExact,
  icon,
  onClick,
  onImageSelect
}) => {

  const fileInputRef = useRef(null);
  const classNames = ['avatar', `avatar-${size}`, className].join(' ');
  const mediaClasses = [
    rounded ? `rounded-${rounded}` : 'rounded',
    mediaClass
  ].join(' ');

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the hidden file input
    }
  };


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]); // Pass the selected file to the parent component
    }
  };

  const getAvatar = () => {
    if (src) {
      if (isIterableArray(src)) {
        return (
          <div className={`${mediaClasses} overflow-hidden h-100 d-flex`}>
            <div className="w-50 border-right">
              <img src={src[0]} alt="" />
            </div>
            <div className="w-50 d-flex flex-column">
              <img src={src[1]} alt="" className="h-50 border-bottom" />
              <img src={src[2]} alt="" className="h-50" />
            </div>
          </div>
        );
      } else {
          return (
            <div className="position-relative">
              <img className={mediaClasses} src={src} alt="" />
              {icon && (
                <div
                  className="position-absolute bg-white rounded-circle p-1 shadow"
                  style={{
                    bottom: '0',
                    right: '0',
                    transform: 'translate(50%, 50%)',
                    cursor: 'pointer',
                  }}
                  onClick={handleIconClick}
                >
                  <FontAwesomeIcon icon={icon} className="text-primary"/>
                </div>
              )}
            </div>
          );
        }
      }

    if (name) {
      return (
        <div className={`avatar-name ${mediaClasses}`}>
          <span>{isExact ? name : name.match(/\b\w/g).join('')}</span>
        </div>
      );
    }

    if (icon) {
      return (
        <Flex className={`avatar-name ${mediaClasses}`}>
          <FontAwesomeIcon icon={faEdit} />
        </Flex>
      );
    }

    return (
      <div className={`avatar-emoji ${mediaClasses}`}>
        <span role="img" aria-label="Emoji">
          
        </span>
      </div>
    );
  };

  return (
    <div className={classNames}>
      {getAvatar()}
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div> 
  );


};

export const AvatarGroup = ({ children, dense, className }) => {
  return (
    <div
      className={classNames(className, 'avatar-group', {
        'avatar-group-dense': dense
      })}
    >
      {children}
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl']),
  rounded: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  name: PropTypes.string,
  emoji: PropTypes.string,
  className: PropTypes.string,
  mediaClass: PropTypes.string,
  isExact: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func
};

Avatar.defaultProps = {
  size: 'xl',
  rounded: 'circle',
  emoji: '😊',
  isExact: false
};

AvatarGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dense: PropTypes.bool
};

export default Avatar;
