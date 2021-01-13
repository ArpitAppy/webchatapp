import React from 'react';

const ChatContent = (props) => {
    return (
        <div className="chat-content">
            {props.data}
        </div>
    )
}

export default ChatContent;