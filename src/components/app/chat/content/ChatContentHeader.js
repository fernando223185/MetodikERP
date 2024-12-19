import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { ChatContext } from 'context/Context';

const ChatContentHeader = ({ setHideSidebar, currentUser}) => {

  console.log(currentUser)
  const { isOpenUserInfo, setIsOpenUserInfo } = useContext(ChatContext);
  
  return (  
    <div className="chat-content-header">
      <Row className="flex-between-center">
        <Col xs={6} md={8} as={Flex} alignItems="center">
          <div
            className="pe-3 text-700 d-md-none contacts-list-show cursor-pointer"
            onClick={() => setHideSidebar(true)}
          >
            <FontAwesomeIcon icon="chevron-left" />
          </div>
          <div className="min-w-0">
            <h5 className="mb-0 text-truncate fs-0">{currentUser.wa_id}</h5>
            <div className="fs--2 text-400">
              {currentUser.status === 'status-online'
                ? 'Active on  chat'
                : 'Active 7h ago'}
            </div>
          </div>
        </Col>
        <Col xs="auto">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip style={{ position: 'fixed' }}>
                Conversation Information
              </Tooltip>
            }
          >
            <Button
              variant="falcon-primary"
              size="sm"
              onClick={() => setIsOpenUserInfo(!isOpenUserInfo)}
            >
              <FontAwesomeIcon icon="info" />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </div>
  );
};

ChatContentHeader.propTypes = {
  thread: PropTypes.object.isRequired,
  setHideSidebar: PropTypes.func.isRequired
};

export default ChatContentHeader;
