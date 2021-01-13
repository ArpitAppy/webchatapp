import React from 'react';
import ChatContent from './ChatContent';
import ChatInput from './ChatInput';

const Chat = (props) => {
    return (
        <div className="chat-content-layout flex flex-column flex-justify-between flex-align-center">  
            <ChatContent />
            <ChatInput />
        </div>
    )
}

export default Chat;