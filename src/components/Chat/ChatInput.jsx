import { Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { config } from 'react-spring';
import { io } from 'socket.io-client';
import './Chat.scss'
import ChatContent from './ChatContent';

let socket = io('http://localhost:8080');
const ChatInput = (props) => {

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }

    const submit = () => {
        socket.emit('message', {
            name: 'Arpit',
            content: message
        })
    }

    useEffect(() => {

        socket.on('init', (msg) => {
            let msgReversed = msg.reverse();
            setChat((chat) => [...chat, ...msgReversed])
        })

        socket.on('push', (msg) => {
            setChat((chat) => [...chat, msg])
        })
    })

    return (
        <>
            <ChatContent data={message} />
            <div className="chat-input flex flex-row flex-align-center flex-justify-center">
                <div>
                    <input className="chat-message-input" 
                        type="text" 
                        name="chat-message"
                        placeholder="Type Message Here... Press Enter to send"
                        onChange={(e) => sendMessage(e)}
                        onKeyDown={submit}
                        value={message || ''}
                    />
                </div>
            </div>
        </>
    )
}

export default ChatInput