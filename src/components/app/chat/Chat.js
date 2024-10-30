import Flex from 'components/common/Flex';
import { ChatContext } from 'context/Context';
import React, { useContext, useState, useEffect } from 'react';
import { Card, Tab } from 'react-bootstrap';

import ChatProvider from './ChatProvider';
import ChatContent from './content/ChatContent';
import ChatSidebar from './sidebar/ChatSidebar';

import { getMensagesAsync } from 'api/chat/chat';
import { getUsersAsync } from 'api/chat/chat';

const ChatTab = () => {
  const {
    setIsOpenThreadInfo,
    threadsDispatch,
    threads,
    setCurrentThread,
    setScrollToBottom,
    messagesDispatch
  } = useContext(ChatContext);

  const [hideSidebar, setHideSidebar] = useState(false);

  const handleSelect = e => {
    setHideSidebar(false);
    setIsOpenThreadInfo(false);
    const thread = threads.find(thread => thread.id === parseInt(e));
    setCurrentThread(thread);
    threadsDispatch({
      type: 'EDIT',
      id: thread.id,
      payload: { ...thread, read: true }
    });
    setScrollToBottom(true);
  };

  const fetchData = async () => {
    try {
      const newMessages = await getMensagesAsync({ wa_id: '5213221076333'});
      console.log(newMessages);

      if (Array.isArray(newMessages)) {
        // Transformar los mensajes al formato esperado
        const transformedMessages = newMessages.map(msg => ({
          senderUserId: msg.Remitente === 'cliente' ? 1 : 3, // Ejemplo: usar 1 para cliente y 0 para otros
          message: msg.Mensaje,
          time: {
            day: new Date(msg.FechaEnvio).toLocaleString('en-US', { weekday: 'short' }), // Día en formato corto
            hour: new Date(msg.FechaEnvio).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), // Hora en formato AM/PM
            date: new Date(msg.FechaEnvio).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) // Fecha en formato corto
          },
          messageId: msg.MensajeID, // Añadir `messageId` para poder identificar el mensaje
          tipoMensaje: msg.TipoMensaje // Mantener el tipo de mensaje
        }));

        messagesDispatch({
          type: 'ADD_MANY',
          payload: [
            {
              id: 0, // O el ID correspondiente al hilo al que deseas agregar
              content: transformedMessages,
              read: transformedMessages.some(msg => msg.senderUserId !== 1) ? false : true // Marcar como no leído si hay mensajes del cliente
            }
          ]
        });  
      } else {
        console.error('The fetched data is not an array:', newMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await getUsersAsync();
      if(Array.isArray(users)) {
        const transformedUsers = users.map(user => ({
          
        }))
      } 
    } catch (error) {
      console.error('Error fetching users:', error);
    }

  };
  useEffect(() => {
    fetchData();
    fetchUsers();
  }, [messagesDispatch, threadsDispatch]);

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey="0"
      onSelect={handleSelect}
    >
      <Card className="card-chat overflow-hidden">
        <Card.Body as={Flex} className="p-0 h-100">
          <ChatSidebar hideSidebar={hideSidebar} />
          <ChatContent setHideSidebar={setHideSidebar} />
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
