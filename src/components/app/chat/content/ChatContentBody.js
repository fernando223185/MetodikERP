import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ChatContentBodyIntro from './ChatContentBodyIntro';
import Message from './Message';
import SimpleBarReact from 'simplebar-react';
import { ChatContext } from 'context/Context';
import Loading from 'widgets/Loading';

const ChatContentBody = ({ currentUser }) => {
  console.log(currentUser)
  let lastDate = null;
  const messagesEndRef = useRef();

  const { messages, scrollToBottom, setScrollToBottom, } = useContext(ChatContext);
  console.log(messages)
  const user = currentUser;

  const [isLoading, setIsLoading] = useState(false);

  

  // Find the messages for the current thread
  const arrayMessages = messages.find(({ id }) => id === currentUser.id);
  const { content = [] } = arrayMessages || {};

  // Scroll to the bottom of the chat when messages are loaded or updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' }); // Use "auto" for instant scroll
    }
  }, [content]);

  // Scroll to the bottom of the chat when `scrollToBottom` is triggered
  useEffect(() => {
    if (scrollToBottom) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Agrega un retardo para asegurarse de que el DOM esté listo
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  if(isLoading){
    return <Loading/>
  }
  
  return (
    <div className="chat-content-body" style={{ display: 'inherit' }}>
      <SimpleBarReact style={{ height: '100%' }}>
        <div className="chat-content-scroll-area">
          {isLoading ? (
            <div>Loading messages...</div>
          ) : (
            content.map(({ message, time, senderUserId, status }, index) => (
              <div key={index}>
                {lastDate !== time.date && (
                  <div className="text-center fs--2 pt-1 text-500">{`${time.date}, ${time.hour}`}</div>
                )}
                {(() => {
                  lastDate = time.date;
                })()}
                <Message
                  message={message}
                  senderUserId={senderUserId}
                  time={time}
                  status={status}
                />
              </div>
            ))
          )}
        </div>
        <div ref={messagesEndRef} />
      </SimpleBarReact>
    </div>
  );
};

ChatContentBody.propTypes = {
  thread: PropTypes.object.isRequired,
};

export default ChatContentBody;
