import { getMensagesAsync, getUsersAsync } from "api/chat/chat";


export async function fetchMessages(messagesDispatch,user) {
  try {
    console.log(user);
    const newMessages = await getMensagesAsync(user);
    
    console.log('Messages',newMessages);
    
    if (Array.isArray(newMessages)) {
      
      messagesDispatch({
        type: 'ADD_MANY',
        payload: newMessages,
      });

    } else {
      console.error('The fetched data is not an array:', newMessages);
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

export async function fetchUsersAndThreads (setUsers, setCurrentThread, threadsDispatch) {
    try {
      const users = await getUsersAsync();
      console.log('User' ,users);
       
      if (Array.isArray(users)) {
        // Transform users to the desired format
        const transformedUsers = users.map(user => ({
          id: user.UsuarioID,
          name: user.Nombre,
          wa_id: user.wa_id,
          status: user.status === 'activo' ? 'status-online' : 'status-away',
        }));
  
        // Set users in the state
        setUsers(transformedUsers);
  
        // Transform threads based on users data
        const transformedThreads = users.map(user => ({
          id: user.UsuarioID,
          userId: user.UsuarioID,
          wa_id: user.wa_id,
          type: 'user',
          messageId: user.UltimoMensajeID,
          message : user.UltimoMensaje,
          read: user.UltimoMensajeLeido,
        }));
        
        console.log(transformedThreads)
        // Set the first thread (user) as the current thread/user
        if (transformedThreads.length > 0) {
          setCurrentThread(transformedThreads[0]);
        }
        
        // Dispatch transformed threads if still needed
        if (threadsDispatch) {
          threadsDispatch({
            type: 'ADD_THREADS',
            payload: transformedThreads,
          });
        }
      }
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  