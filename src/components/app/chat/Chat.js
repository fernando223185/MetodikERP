import Flex from 'components/common/Flex'; 
import { ChatContext } from 'context/Context';
import React, { useContext, useState, useEffect } from 'react';
import { Card, Tab, Nav } from 'react-bootstrap';
import Loading from 'widgets/Loading';
import { io } from 'socket.io-client';

import ChatProvider from './ChatProvider';
import ChatContent from './content/ChatContent';
import ChatSidebar from './sidebar/ChatSidebar';

import { fetchMessages, fetchUsers } from './data/fetchData';


const ChatTab = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    userDispatch,
    setIsOpenUserInfo,
    messages,
    messagesDispatch,
    getMessages,
    setScrollToBottom,
  } = useContext(ChatContext);

  const [hideSidebar, setHideSidebar] = useState(false);

  
  const handleSelect = userId => {
    console.log(userId)
    setHideSidebar(false);
    setIsOpenUserInfo(false);
    const user = users.find(({id}) => id == userId);
    const arrayMessages = getMessages(user);
    if (!Array.isArray(arrayMessages) || arrayMessages.length === 0) {
      console.log('Fetching messages for user:', user);
      fetchMessages(messagesDispatch, user);
    }

    if(user != null){
      userDispatch({
        type: 'UPDATE',
        id: user.id,
        payload: {
          MensajeID : user.messageID,
        }
      })
    }
    setCurrentUser(user);
    setScrollToBottom(true);
    }

  const fetchInitialData = async () => {
   await fetchUsers(userDispatch,setCurrentUser);
  }

  useEffect(() => {
    if (currentUser && messages.length === 0) {
      fetchMessages(messagesDispatch, currentUser);
    }
  }, [currentUser]);
  
  useEffect(() => {
    fetchInitialData();
  }, []);

  
  
  useEffect(() => {
    const socket = io('http://localhost:5001'); 

    // Escuchar el evento 'new_message' para recibir nuevos mensajes desde el servidor
    socket.on('new_message', (newMessage) => {
      console.log('Nuevo mensaje recibido:', newMessage);
      
      if(newMessage[0].Aviso === 'Se agregó un nuevo usuario'){
        userDispatch({
          type: 'ADD',
          isAddToStart: true,
          payload: {
            id: newMessage[0].UsuarioID,
            name: newMessage[0].Nombre,
            wa_id: newMessage[0].wa_id,
            status: newMessage[0].status === 'activo' ? 'status-online' : 'status-away',
            read: newMessage[0].UltimoMensajeLeido,
            message: newMessage[0].UltimoMensaje,
            messageID: newMessage[0].UltimoMensajeID,
            time: newMessage[0].FechaEnvio,
          }
        })
        messagesDispatch({
          type: 'ADD_MANY',
          payload: newMessage[0]
        })
      } 
      else {
        // actualizar el nuevo mensaje en la lista de usuarios
        userDispatch({
          type: 'UPDATE_MESSAGE',
          id: newMessage[0].UsuarioID,
          payload: {
            message: newMessage[0].Mensaje,
            messageID: newMessage[0].UltimoMensajeID,
          }
        })
        // actualizar el estado de los mensajes
        messagesDispatch({
          type: 'ADD_MANY',
          payload: newMessage
        })
      }


      console.log('Messages',messages);
    })

    setScrollToBottom(true);
    return () => {
      socket.disconnect(); // Limpiar conexión al desmontar el componente
    };

    },[])

  if (users.length === 0 || messages.length === 0) {
    return <Loading />;
  }
  
  return (
    console.log(users),
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={users[0]?.id.toString()}
      onSelect={handleSelect}
    >
      <Card className="card-chat overflow-hidden" >
        <Card.Body as={Flex} className="p-0 h-100">
          <ChatSidebar hideSidebar={hideSidebar}/>
          <ChatContent setHideSidebar={setHideSidebar} currentUser={currentUser}/>
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
