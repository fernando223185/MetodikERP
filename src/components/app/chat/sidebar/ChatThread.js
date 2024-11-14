import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import Avatar from 'components/common/Avatar';
import { Nav } from 'react-bootstrap';
import LastMessage from './LastMessage';
import avatar from 'assets/img/team/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatSidebarDropdownAction from './ChatSidebarDropdownAction';
import { ChatContext } from 'context/Context';

const ChatThread = ({ thread }) => {
  const { getUser } = useContext(ChatContext);
  const user = getUser(thread);
  
  const dateObj = new Date(user.UltimoMensajeFecha);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = dayNames[dateObj.getUTCDay()];
  const hour = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const lastMessage = {
   message : thread.message,
   time: {day, hour, formattedDate},
   senderUserId: 3,
   status: 'delivered',
   name: user.name
  };
  return (
    <Nav.Link
      eventKey={thread?.id}
      className={classNames(`chat-contact hover-actions-trigger p-3`, {
        'unread-message': !thread.read,
        'read-message': thread.read
      })}
    >
      <div className="d-md-none d-lg-block">
        <ChatSidebarDropdownAction />
      </div>
      <Flex>
        <Avatar className={user.status} src={avatar} size="xl" />
        <div className="flex-1 chat-contact-body ms-2 d-md-none d-lg-block">
          <Flex justifyContent="between">
            <h6 className="mb-0 chat-contact-title">{user.wa_id}</h6>
            <span className="message-time fs--2">
              {' '}
              {!!lastMessage && lastMessage.time.day}{' '}
            </span>
          </Flex>
          <div className="min-w-0">
            <div className="chat-contact-content pe-3">
              <LastMessage lastMessage={lastMessage} thread={thread} />
              <div className="position-absolute bottom-0 end-0 hover-hide">
                {!!lastMessage?.status && (
                  <FontAwesomeIcon
                    icon={classNames({
                      check:
                        lastMessage.status === 'seen' ||
                        lastMessage.status === 'sent',
                      'check-double': lastMessage.status === 'delivered'
                    })}
                    transform="shrink-5 down-4"
                    className={classNames({
                      'text-success': lastMessage.status === 'seen',
                      'text-400':
                        lastMessage.status === 'delivered' ||
                        lastMessage.status === 'sent'
                    })}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </Nav.Link>
  );
};

ChatThread.propTypes = {
  thread: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default ChatThread;
