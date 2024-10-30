import React from 'react';
import orderBy from 'lodash/orderBy';
import { toast } from 'react-toastify';

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
      if (id !== 0 && !id) {
        return state;
      }
      if (isUpdatedStart) {
        const filteredState = state.filter(item => item.id !== id);
        return [payload, ...filteredState];
      }
      return state.map(item => (item.id === id ? payload : item));

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
      console.log('Payload:', payload);
      return state.map(thread => {
        // Encontrar si hay mensajes nuevos para este hilo
        const newThreadMessages = payload.find(newMsg => newMsg.id === thread.id);
        if (newThreadMessages && Array.isArray(newThreadMessages.content)) {
          // Concatenar los mensajes nuevos al `content` existente
          return {
            ...thread,
            content: [...thread.content, ...newThreadMessages.content],
            read: newThreadMessages.content.some(msg => msg.senderUserId !== 1) ? false : true // Actualizar el estado `read`
            };
          }
          return thread;
        });

        

    default:
      return state;
  }
};
