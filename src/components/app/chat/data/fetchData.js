import { getMensagesAsync, getUsersAsync } from "api/chat/chat";


export async function fetchMessages(messagesDispatch,user) {
  try {
    console.log(user);
    if(user != null){
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
    }}catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

export async function fetchUsers(userDispatch,setCurrentUser){
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
        read: user.UltimoMensajeLeido,
        message: user.UltimoMensaje,
        messageID: user.UltimoMensajeID,
        time: user.UltimoMensajeFecha,
      }));
      
      if(transformedUsers){
        setCurrentUser(transformedUsers[0]);
      }
      // Set users in the state
      userDispatch({
        type: 'ADD_USERS',
        payload: transformedUsers
      });

    }
  }
  catch(error){
    console.error(error);
  }
}