import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from 'context/Context';
//import users from 'data/people';

//import groups from 'data/chat/groups';
import { arrayReducer } from 'reducers/arrayReducer';

const ChatProvider = ({ children }) => {
  // initializacion de variables globales
  const [messages, messagesDispatch] = useReducer(arrayReducer, []);
  const [users, userDispatch] = useReducer(arrayReducer,[]);

  const [currentUser, setCurrentUser] = useState(null);

  const [textAreaInitialHeight, setTextAreaInitialHeight] = useState(32);
  // use state booleanos
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);

  // Funcion 
  const getMessages = user => {
    if (!user || !user.id) {
      console.error('Invalid user object:', user);
      return [];
    }
    
    const userMessagesObject = messages.find(({ id }) => id === user.id);

    
    return userMessagesObject ? userMessagesObject.content : [];

  };

  const value = {
    users,
    userDispatch,

    getMessages,
    messages,
    messagesDispatch,

    textAreaInitialHeight,
    setTextAreaInitialHeight,

    isOpenUserInfo,
    setIsOpenUserInfo,

    currentUser,
    setCurrentUser,

    scrollToBottom,
    setScrollToBottom
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = { children: PropTypes.node.isRequired };

export default ChatProvider; 