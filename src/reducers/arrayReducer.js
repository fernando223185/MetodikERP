import React from 'react';
import orderBy from 'lodash/orderBy';
import { toast } from 'react-toastify';
import { readMessageAsync } from 'api/chat/chat';

export const arrayReducer = (state, action) => {
  const { type, id, payload, sortBy, order, isAddToStart, isUpdatedStart } =
    action;
  switch (type) {
    case 'ADD':
      if (!payload) {
        return state;
      }
      if (state.find(item => item.id === payload.id)) {
        toast(
          <span className="text-warning">Item already exists in the list!</span>
        );
        return state;
      }
      if (isAddToStart) {
        return [payload, ...state];
      }
      return [...state, payload];
    case 'REMOVE':
      if (id !== 0 && !id) {
        return state;
      }
      return state.filter(item => item.id !== id);
      
    case 'EDIT':
      if(payload.MensajeID){
        const status = readMessageAsync(payload);
        console.log(status)
        return state.map(item => (item.id === id ? payload : item)); 
      }
      

    case 'SORT':
      if (!sortBy || !order) {
        return state;
      }
      return orderBy(state, sortBy, order);
      
    case 'ADD_MANY':
  if (!Array.isArray(payload)) {
    console.error('Payload is not an array:', payload);
    return state;
  }

  // Agrupar y transformar mensajes por UsuarioID
  const groupedMessages = payload.reduce((acc, msg) => {
    const dateObj = new Date(msg.FechaEnvio);
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

    const messageObj = {
      senderUserId: msg.Remitente === 'agente' ? 3 : 1,
      message: msg.Mensaje,
      time: {
        day: day,
        hour: hour,
        date: formattedDate
      }
       
    };

    // Check if we already have messages for this user
    if (!acc[msg.UsuarioID]) {
      acc[msg.UsuarioID] = { id: msg.UsuarioID, content: [] };
    }

    // Push the new message to the user's content array
    acc[msg.UsuarioID].content.push(messageObj);

    return acc;

  }, {});

  // Update the state with new messages, concatenating if they exist
  return state.map(user => {
    if (groupedMessages[user.id]) {
      // Concatenate new messages with existing content for this user
      return {
        ...user,
        content: [...user.content, ...groupedMessages[user.id].content]
      };
    }
    return user;
  }).concat(
    // Add new users if they are not already in the state
    Object.values(groupedMessages).filter(user => 
      !state.some(existingUser => existingUser.id === user.id)
    )
  );


    case 'ADD_THREADS':
      if (!Array.isArray(payload)) {
        console.error('Payload is not an array:', payload);
        return state;
      }
      // Filtrar para evitar duplicados de `id`
      const newThreads = payload.filter(newThread => 
        !state.some(existingThread => existingThread.id === newThread.id)
      );
      return [...state, ...newThreads];
        
    case 'UPDATE_THREAD_FROM_WEBHOOK':
      const { UsuarioID, Mensaje, MensajeID } = action.payload;
     
    return state.map((thread) => {
      if (thread.id === UsuarioID) {
        return {
          ...thread,
          message: Mensaje, // Update the last message
          messageId : MensajeID,
          read: false, // Mark as unread
        };
      }
      return thread;
    });

    default:
      return state;
  }
};
