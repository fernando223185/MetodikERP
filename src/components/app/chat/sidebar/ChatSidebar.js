import React, { useContext, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import ChatThread from './ChatThread';
import SimpleBarReact from 'simplebar-react';
import ChatContactsSearch from './ChatContactSearch';
import classNames from 'classnames';
import { ChatContext } from 'context/Context';
import Loading from 'widgets/Loading';


const ChatSidebar = ({ hideSidebar }) => {
  const { users } = useContext(ChatContext);

  const [isLoading, setIsLoading ] = useState(false);


   if(isLoading){
    return (
      <Loading></Loading>
    )
   }
 
  return (
    <div className={classNames('chat-sidebar', { 'start-0': hideSidebar })}>
      <div className="contacts-list">
        <SimpleBarReact style={{ height: '100%', minWidth: '65px' }}>
          <Nav className="border-0">
            {users.map((user) => (
              <ChatThread user={user} key={user.id} />
            ))}
          </Nav>
        </SimpleBarReact>
      </div>
      <ChatContactsSearch />
    </div>
  );
};

ChatSidebar.propTypes = {
  hideSidebar: PropTypes.bool
};

export default ChatSidebar;
