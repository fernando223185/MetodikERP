import React, { useContext }from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'react-bootstrap';
import ChatContentHeader from './ChatContentHeader';
import { ChatContext } from 'context/Context';
import ChatContentBody from './ChatContentBody';
import MessageTextArea from './MessageTextArea';

const ChatContent = ({ setHideSidebar }) => { 
  const { threads } = useContext(ChatContext);

  return (
    <Tab.Content className="card-chat-content">
      {threads.map((thread,index) => (
        <Tab.Pane key={index} eventKey={thread.id} className="card-chat-pane">
          <ChatContentHeader thread={thread} setHideSidebar={setHideSidebar} />
          <ChatContentBody thread={thread} />
        </Tab.Pane>
      ))}
      <MessageTextArea />
    </Tab.Content>
  );
};

ChatContent.propTypes = {
  setHideSidebar: PropTypes.func.isRequired
};

export default ChatContent;
