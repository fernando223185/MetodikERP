import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'react-bootstrap';
import ChatContentHeader from './ChatContentHeader';
import ChatContentBody from './ChatContentBody';
import MessageTextArea from './MessageTextArea';

const ChatContent = ({ setHideSidebar, currentUser }) => { 

  return (
    <Tab.Content className="card-chat-content">
        <Tab.Pane key={currentUser?.id} eventKey={currentUser?.id} className="card-chat-pane">
          <ChatContentHeader currentUser={currentUser} setHideSidebar={setHideSidebar} />
          <ChatContentBody currentUser={currentUser} /> 
        </Tab.Pane>
      <MessageTextArea />
    </Tab.Content>
  );
};

ChatContent.propTypes = {
  setHideSidebar: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default ChatContent;
