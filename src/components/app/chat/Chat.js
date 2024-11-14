import Flex from 'components/common/Flex'; 
import { ChatContext } from 'context/Context';
import React, { useContext, useState, useEffect } from 'react';
import { Card, Tab, Nav } from 'react-bootstrap';
import Loading from 'widgets/Loading';

import ChatProvider from './ChatProvider';
import ChatContent from './content/ChatContent';
import ChatSidebar from './sidebar/ChatSidebar';

import { fetchMessages, fetchUsersAndThreads } from './data/fetchData';


const ChatTab = () => {
  const {
    setIsOpenThreadInfo,
    threads,
    currentThread,
    threadsDispatch,
    messages,
    users,
    setUsers,
    setCurrentThread,
    setScrollToBottom,
    messagesDispatch
  } = useContext(ChatContext);

  const [hideSidebar, setHideSidebar] = useState(false);

  const POLLING_INTERVAL = 60000;

  const handleSelect = userId => {
    console.log(threads); 
    console.log('handleSelect ' + userId);
    setHideSidebar(false);
    setIsOpenThreadInfo(false);
    const thread = threads.find(thread => thread.id === parseInt(userId));
    setCurrentThread(thread);


    // if (thread) {
    //   threadsDispatch({
    //     type: 'EDIT',
    //     payload: { MensajeID: thread.messageId, read:true}
    //   });
    //   setScrollToBottom(true);
    // }
  };
  
// First Effect: Fetch Users and Threads
  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchUsersAndThreads(setUsers, setCurrentThread, threadsDispatch);
    };

    fetchInitialData();
  }, [threadsDispatch, setUsers, setCurrentThread]);

  useEffect(() => {
    if (currentThread) {
      fetchMessages(messagesDispatch, currentThread);
    }
  }, [currentThread, messagesDispatch]);


  if (users.length === 0 || threads.length === 0 || messages.length === 0) {
    return <Loading />;
  }
  
  return (
    console.log(threads,users,messages),
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={users[0]?.id.toString()}
      onSelect={handleSelect}
    >
      <Card className="card-chat overflow-hidden" >
        <Card.Body as={Flex} className="p-0 h-100">
          <ChatSidebar hideSidebar={hideSidebar} />
          <ChatContent setHideSidebar={setHideSidebar} threads={threads}/>
        </Card.Body>
      </Card>
    </Tab.Container>
  );
};

const Chat = () => {
  return (
    <ChatProvider>
      <ChatTab />
    </ChatProvider>
  );
};

export default Chat;
