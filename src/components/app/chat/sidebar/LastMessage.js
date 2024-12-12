import React from 'react';
import PropTypes from 'prop-types';
import { users } from 'data/dashboard/default';

const LastMessage = ({ lastMessage }) => {
  console.log(lastMessage)
  const user = users.find(({ id }) => id === lastMessage?.senderUserId);
  const name = user?.name.split(' ');

  const lastMassagePreview =
    lastMessage?.messageType === 'attachment'
      ? `${name[0]} sent ${lastMessage.attachment}`
      : lastMessage?.message.split('<br>');

  if (lastMessage) {
    
      return `${lastMassagePreview[0]}`;
  }

  return <div>Say hi to your new friend</div>;
};

LastMessage.propTypes = {
  thread: PropTypes.object.isRequired,
  lastMessage: PropTypes.object
};

export default LastMessage;