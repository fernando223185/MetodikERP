import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ChatContext } from 'context/Context';
import Picker from '@emoji-mart/react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppContext } from 'Main';
import { sendMessageAsync } from 'api/chat/chat';
import { fetchMessages } from '../data/fetchData';

const formatDate = date => {
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const now = date
    .toLocaleString('en-US', options)
    .split(',')
    .map(item => item.trim());

  return {
    day: now[0],
    hour: now[3],
    date: now[1] + ', ' + now[2]
  };
};

const MessageTextArea = () => {
  const {
    messagesDispatch,
    messages,
    threadsDispatch,
    currentUser,
    setScrollToBottom,
    isOpenThreadInfo,
    getUser
  } = useContext(ChatContext);


  console.log(currentUser);

  const [previewEmoji, setPreviewEmoji] = useState(false);
  const [message, setMessage] = useState('');

  const {
    config: { isDark }
  } = useAppContext();

  const addEmoji = e => {
    let emoji = e.native;
    setMessage(message + emoji);
    setPreviewEmoji(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    const status = await sendMessageAsync({ recipient_WAID: currentUser.wa_id ,text: message });
    fetchMessages(messagesDispatch,currentUser);
    console.log(status);
  }

  //   const date = new Date();
  //   let newMessage = {
  //     senderUserId: 3,
  //     message: `${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}`,
  //     status: 'delivered',
  //     time: formatDate(date)
  //   };

  //   const { content } = messages.find(
  //     ({ id }) => id === currentThread.messagesId
  //   );

  //   if (message) {
  //     messagesDispatch({
  //       type: 'EDIT',
  //       payload: {
  //         id: currentThread.messagesId,
  //         content: [...content, newMessage]
  //       },
  //       id: currentThread.messagesId
  //     });

  //     threadsDispatch({
  //       type: 'EDIT',
  //       payload: currentThread,
  //       id: currentThread.id,
  //       isUpdatedStart: true
  //     });
  //   }
  //   setMessage('');
  //   setScrollToBottom(true);
  // };

  useEffect(() => {
    if (isOpenThreadInfo) {
      setPreviewEmoji(false);
    }
  }, [isOpenThreadInfo]);

  return (
    <Form className="chat-editor-area" onSubmit={handleSubmit}>
      <TextareaAutosize
        minRows={1}
        maxRows={6}
        value={message}
        placeholder="Inscribe un mensaje..."
        onChange={({ target }) => setMessage(target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents newline insertion
            handleSubmit(e);
          }
        }}
        className="form-control outline-none resize-none rounded-0 border-0 emojiarea-editor"
      />

      {/* <Form.Group controlId="chatFileUpload">
        <Form.Label className="chat-file-upload cursor-pointer">
          <FontAwesomeIcon icon="paperclip" />
        </Form.Label>
        <Form.Control type="file" className="d-none" />
      </Form.Group> */}

      <Button
        variant="falcon-primary"
        size="sm"
        className={classNames('shadow-none',  {
          'text-primary ': message.length > 0,

        })}
        type="submit"
      >
        Enviar
      </Button>
    </Form>
  );
};

MessageTextArea.propTypes = {
  thread: PropTypes.object
};

export default MessageTextArea;
