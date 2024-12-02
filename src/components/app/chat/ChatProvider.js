import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from 'context/Context';
//import users from 'data/people';

//import groups from 'data/chat/groups';
import { arrayReducer } from 'reducers/arrayReducer';

const ChatProvider = ({ children }) => {
  // initializacion de variables globales
  const [messages, messagesDispatch] = useReducer(arrayReducer, []);
  const [threads, threadsDispatch] = useReducer(arrayReducer, []);
  const [users, setUsers] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [textAreaInitialHeight, setTextAreaInitialHeight] = useState(32);
  // use state booleanos
  const [isOpenThreadInfo, setIsOpenThreadInfo] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);

  // Funcion 
  const getUser = thread => {
    let user = {};
    user = users.find(({ id }) => id === thread.userId);
    return user;
  };

  const value = {
    users,
    setUsers,
    threads, 
    getUser,
    messages,
    threadsDispatch,
    messagesDispatch,
    textAreaInitialHeight,
    setTextAreaInitialHeight,
    isOpenThreadInfo,
    setIsOpenThreadInfo,
    currentThread,
    setCurrentThread,
    scrollToBottom,
    setScrollToBottom
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = { children: PropTypes.node.isRequired };

export default ChatProvider; 