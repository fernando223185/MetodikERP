import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ChatContentBodyIntro from './ChatContentBodyIntro';
import Message from './Message';
import SimpleBarReact from 'simplebar-react';
import ThreadInfo from './ThreadInfo';
import { fetchMessages } from '../data/fetchData';
import { ChatContext } from 'context/Context';
import Loading from 'widgets/Loading';

const ChatContentBody = ({ thread }) => {
  let lastDate = null;
  const messagesEndRef = useRef();

  const { getUser, messages, scrollToBottom, setScrollToBottom, messagesDispatch,currentThread } = useContext(ChatContext);
  const user = getUser(thread);

  const [isLoading, setIsLoading] = useState(false);

  const POLLING_INTERVAL = 10000;

  // Fetch messages for the selected user (thread) and update the loading state
  const fetchMessagesForUser = async () => {
    setIsLoading(true);
    try {
      await fetchMessages(messagesDispatch, user);
      console.log(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setIsLoading(false);
  };

  // Find the messages for the current thread
  const threadMessages = messages.find(({ id }) => id === thread.id);
  const { content = [] } = threadMessages || {};

  // Fetch messages only when the thread changes
  useEffect(() => {
    if (currentThread && currentThread.id === thread.id && user.status !== 'status-away') {
      // Fetch initial messages for the selected thread
      fetchMessagesForUser();
  
      // Set up periodic fetch for the messages
      const intervalId = setInterval(() => {
        fetchMessagesForUser();
        console.log('new fetch');
      }, POLLING_INTERVAL);
  
      // Clean up the interval when unmounting or when `currentThread` changes
      return () => clearInterval(intervalId);
    }

  }, [currentThread, thread.id]);
  

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
    return <Loading></Loading>
  }
  
  return (
    <div className="chat-content-body" style={{ display: 'inherit' }}>
      <ThreadInfo thread={thread} isOpenThreadInfo={true} />
      <SimpleBarReact style={{ height: '100%' }}>
        <div className="chat-content-scroll-area">
          <ChatContentBodyIntro user={user} />
          {isLoading ? (
            <div>Loading messages...</div>
          ) : (
            content.map(({ message, time, senderUserId, status }, index) => (
              <div key={index}>
                {lastDate !== time.date && (
                  <div className="text-center fs--2 text-500">{`${time.date}, ${time.hour}`}</div>
                )}
                {(() => {
                  lastDate = time.date;
                })()}
                <Message
                  message={message}
                  senderUserId={senderUserId}
                  time={time}
                  status={status}
                  isGroup={thread.type === 'group'}
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
