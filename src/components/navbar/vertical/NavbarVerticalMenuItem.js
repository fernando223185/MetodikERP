import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import SubtleBadge from 'components/common/SubtleBadge';
import * as solidIcons from "@fortawesome/free-solid-svg-icons";




const NavbarVerticalMenuItem = ({ route }) => {
  return (
    <Flex alignItems="center">
      {route.icon &&
        solidIcons[route.icon] && ( // Verifica si el ícono existe en solidIcons
          <span className="nav-link-icon">
            <FontAwesomeIcon icon={solidIcons[route.icon]} />
          </span>
        )}
      <span className="nav-link-text ps-1">{route.name}</span>
      {route.badge && (
        <SubtleBadge pill bg={route.badge.type} className="ms-2">
          {route.badge.text}
        </SubtleBadge>
      )}
    </Flex>
  );
};

// Prop-types
const routeShape = {
  active: PropTypes.bool,
  name: PropTypes.string.isRequired,
  to: PropTypes.string,
  icon: PropTypes.string, // Especifica el nombre del ícono como string
};
routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
NavbarVerticalMenuItem.propTypes = {
  route: PropTypes.shape(routeShape).isRequired,
};

export default React.memo(NavbarVerticalMenuItem);

