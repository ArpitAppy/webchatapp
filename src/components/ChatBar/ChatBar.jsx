import { Avatar } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { APIS } from '../../utils/apis/endpoint';
import CheckIcon from '@material-ui/icons/Check';
import './ChatBar.scss';
import { useSelector } from 'react-redux';
import { getItemFromLS } from '../../utils/helpers/localStorage';
import jwt_decode from 'jwt-decode';

const ChatBar = ({ messages }) => {

    const [text, setText] = useState('');
    const chatroomDetails = useSelector((state) => state.chatroomDetails)
    const { name } = jwt_decode(getItemFromLS('token'));
    const chatroom = getItemFromLS('chatroom')

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post(APIS._newMessage, {
            user: name,
            message: text,
            chatroom: chatroom,
            timestamp: new Date().toUTCString(),
            receiver: false,
            read: false
        })

        setText('')
    }

    return (
        <div className="chatbar">
            <div className="chatbar--header flex flex-align-center">
                <Avatar />
                <h3>{chatroomDetails.name || chatroom || ''}</h3>
            </div>
            <div className="chatbar--content">
                {
                    messages.map((msg, index) => {
                        return (
                            <p className={` ${!msg.receiver ? 'chatbar--content--sender' : 'chatbar--content--receiver'} `}>
                                <span className="chatbar--content--name">{msg.user}</span>
                                {msg.message}
                                <span className="chatbar--content--time">
                                {msg.timestamp}
                                </span>
                                {
                                    !msg.receiver &&
                                    <span className="chatbar--content--status">
                                        { 
                                            msg.read ? 
                                                <div className="chatbar--content--status--received">
                                                    <CheckIcon /><CheckIcon />
                                                </div> 
                                                : 
                                                <div className="chatbar--content--status--sent">
                                                    <CheckIcon />
                                                </div> 
                                        }
                                    </span>
                                }
                            </p>
                        )
                    })
                }
            </div>
            <div className="chatbar--bottom flex flex-align-center flex-justify-center">
                <form className="flex">
                    <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="Type your message here..." />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default ChatBar
