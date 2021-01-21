import { Avatar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { APIS } from '../../utils/apis/endpoint';
import CheckIcon from '@material-ui/icons/Check';
import './ChatBar.scss';
import { useSelector } from 'react-redux';
import { getItemFromLS } from '../../utils/helpers/localStorage';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';
import { URL } from '../../config';


const ChatBar = ({ messages, socket }) => {

    const [text, setText] = useState('');
    const [isTyping, setTyping] = useState(false);
    const chatroomDetails = useSelector((state) => state.chatroomDetails)
    const userDetails = useSelector(state => state.userDetails)
    const { name } = jwt_decode(getItemFromLS('token'));
    const chatroom = getItemFromLS('chatroom')
    const toUser = getItemFromLS('toUser');
    const [senderName, setSenderName] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post(APIS._newMessage, {
            mid: new Date().getTime(),
            user: name,
            message: text,
            chatroom: chatroom,
            from: name,
            to: toUser,
            timestamp: new Date().toUTCString(),
            sent: true,
            read: false
        })

        setText('')
        socket.emit('message', {chatroom, text})
        socket.on('sendMessage', (data) => {
            console.log('mesage sent')
        })
    }

    const setMessage = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    useEffect(() => {
        socket.emit('onTyping', {chatroom, text, name})
        socket.on('typing', (data) => {
            setTyping(data.status)
            setSenderName(data.username)
        })
        socket.emit('markAsSeen', chatroom)
        socket.on('markAsRead', (data) => {
            console.log('we', data.message)
        })
      }, [text]);

    return (
        <div className="chatbar">
            <div className="chatbar--header flex flex-column">
                <div className="flex flex-align-center">
                    <Avatar />
                    <h3>{chatroomDetails.name || chatroom || ''}</h3>
                </div>
                <div className="flex, flex-align-center">
                    {isTyping && senderName && `${senderName} typing...`}
                </div>
                
            </div>
            <div className="chatbar--content">
                {
                    messages && messages.map((msg, index) => {
                        return (
                            <p className={`${msg.from === name ? 'chatbar--content--sender' : 'chatbar--content--receiver'} `}>
                                <span className="chatbar--content--name">{msg.user}</span>
                                {msg.message}
                                <span className="chatbar--content--time">
                                {msg.timestamp}
                                </span>
                                {
                                    msg.from === name &&
                                    <span className="chatbar--content--status">
                                        <div className="chatbar--content--status--sent">
                                            {msg.sent ? (msg.read ? <><CheckIcon /><CheckIcon /></> : <CheckIcon />) : <small>not sent</small> }
                                        </div> 
                                    </span>
                                }
                            </p>
                        )
                    })
                }
            </div>
            <div className="chatbar--bottom flex flex-align-center flex-justify-center">
                <form className="flex">
                    <input value={text} onChange={e => setMessage(e)} type="text" placeholder="Type your message here..." />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default ChatBar
