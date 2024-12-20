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
      
      case 'UPDATE':
        if (!id) {
          return state;
        }
        const status = readMessageAsync(payload);
        const updatedUser = state.map(user => {
          if(user.id === id){
            console.log(user);
            return {
              ...user,
              read: true
            }
          }
          return user;
        });
        return updatedUser;
      case 'UPDATE_MESSAGE':
        if (!id) {
          return state;
        }
        const updatedMessage = state.map(user => {
          if(user.id === id){
            console.log(user);
            return {
              ...user,
              message: payload.message,
              messageID: payload.messageID,
              FechaEnvio: payload.FechaEnvio,
              read: false 
            }
          }
          return user;
        }) 
        return updatedMessage;

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
      
      console.log(payload);
      // Agrupar y transformar mensajes por UsuarioID
      const groupedMessages = payload.reduce((acc, msg) => {
           // Split the SQL date format into parts
      const [dayName, year, day, month, time] = msg.FechaEnvio.split(' '); // Split by space
      const [hour, minute] = time.split(':'); // Split time into hours and minutes
      const hourInt = parseInt(hour, 10);
      const isPM = hourInt >= 12;
      const dayNamesMap = {
        Mon: 'Lun',
        Tue: 'Mar',
        Wed: 'Mié',
        Thu: 'Jue',
        Fri: 'Vie',
        Sat: 'Sáb',
        Sun: 'Dom'
      };

      const spanishDayName = dayNamesMap[dayName.replace(',', '')] || dayName;
    
      // Format the hour in 12-hour format with AM/PM
      const formattedHour = `${(hourInt % 12 || 12)}:${minute} ${isPM ? 'PM' : 'AM'}`;
      
        const messageObj = {
          senderUserId: msg.Remitente === 'agente' ? 3 : 1,
          message: msg.Mensaje,
          time: {
            day: day,
            hour: formattedHour,
            date: `${spanishDayName}, ${day} ${month} ${year}`
          }
          
        };
        
        console.log(messageObj);
        // Check if we already have messages for this user
        if (!acc[msg.UsuarioID]) {
          acc[msg.UsuarioID] = { id: msg.UsuarioID, content: [] };
        }

        // Push the new message to the user's content array
        acc[msg.UsuarioID].content.push(messageObj);

        return acc;

      }, {});

      console.log(groupedMessages);
    // Update the state with new messages, concatenating if they exist
    return state.map(user => {
      if (groupedMessages[user.id]) {
        // Concatenate new messages with existing content for this user
        return {
          ...user,
          content: [...user.content, ...groupedMessages[user.id].content]
        };
      }
      console.log(user);
      return user;
    }).concat(
      // Add new users if they are not already in the state
      Object.values(groupedMessages).filter(user => 
        !state.some(existingUser => existingUser.id === user.id)
      )
    );

    case 'ADD_USERS': {
      if (!Array.isArray(payload)) {
        console.error('Payload for ADD_USERS must be an array of users');
        return state;
      }
    
      // Add the new users to the state
      const groupedUsers = payload.map(user => {
        const [dayName, day, month, year, time] = user.time.split(' '); // Split by space
        const [hour, minute] = time.split(':'); // Split time into hours and minutes
        const hourInt = parseInt(hour, 10);
        const isPM = hourInt >= 12;
      
        const dayNamesMap = {
          Mon: 'Lun',
          Tue: 'Mar',
          Wed: 'Mié',
          Thu: 'Jue',
          Fri: 'Vie',
          Sat: 'Sáb',
          Sun: 'Dom'
        };
      
        const spanishDayName = dayNamesMap[dayName.replace(',', '')] || dayName;
      
        return {
          ...user,
          time: {
            day: spanishDayName,
            hour: `${hourInt % 12 || 12}:${minute} ${isPM ? 'PM' : 'AM'}`,
            date: `${spanishDayName}, ${day} ${month} ${year}`
          }
        };
      });
      return [...state, ...groupedUsers];
    }
    case 'RECIEVE_MESSAGE': {
      if (!payload) {
        return state;
      }
      
      const [dayName, year, day, month, time] = payload.FechaEnvio.split(' '); // Split by space
      const [hour, minute] = time.split(':'); // Split time into hours and minutes
      const hourInt = parseInt(hour, 10);
      const isPM = hourInt >= 12;
      const dayNamesMap = {
        Mon: 'Lun',
        Tue: 'Mar',
        Wed: 'Mié',
        Thu: 'Jue',
        Fri: 'Vie',
        Sat: 'Sáb',
        Sun: 'Dom'
      };

      const spanishDayName = dayNamesMap[dayName.replace(',', '')] || dayName;
    
      // Format the hour in 12-hour format with AM/PM
      const formattedHour = `${(hourInt % 12 || 12)}:${minute} ${isPM ? 'PM' : 'AM'}`;
      
      const messageObj = {
        senderUserId: payload.Remitente === 'agente' ? 3 : 1,
        message: payload.UltimoMensaje,
        time: {
          day: spanishDayName,
          hour: formattedHour,
          date: `${spanishDayName}, ${day} ${month} ${year}`
        }
      };
      
      return state.map(user => {
        if (user.id === payload.UsuarioID) {
          return {
            ...user,
            content: [...user.content, messageObj]
          };
        }
        return user;  
      });
    }

    

    default:
      return state;
  }
};
