import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

const socket = io('http://localhost:5000'); // サーバーのURLに適宜変更してください

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    scroll.scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Chat;
