import React, { useEffect, useState } from 'react';
import ChatBar from '../ChatBar';
import Header from '../Header';
import LeftBar from '../LeftBar';
import './Home.scss';
import Pusher from 'pusher-js';
import axios from 'axios';
import { APIS } from '../../utils/apis/endpoint';
import { getItemFromLS } from '../../utils/helpers/localStorage';
import jwt_decode from 'jwt-decode';
import { io } from 'socket.io-client';
import { URL } from '../../config';

let endpoint = URL;
const socket = io(endpoint)

const Home = () => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const {name} = jwt_decode(getItemFromLS('token'))
    const chatroom = getItemFromLS('chatroom');

    // useEffect(() => {
    //     axios.get(APIS._getMessages)
    //     .then(res => {
    //         if (res && res.data && res.data.success) {
    //             setMessages(res.data.data)
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [])

    useEffect(() => {
        axios.get(APIS._getAllUsers)
        .then(res => {
            if (res && res.data && res.data.success) {
                setUsers(res.data.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
      }, [])

    useEffect(() => {
        const pusher = new Pusher('cf01180c00e11b4dd573', {
          cluster: 'ap2'
        });
    
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessages) => {
          setMessages([...messages, newMessages])
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }

      }, [messages])

      useEffect(() => {
          fetchMessage(chatroom)
      }, [chatroom])

      const fetchMessage = (chatroom) => {
        axios.get(`${APIS._getMessagesForChatroom}?chatroom=${chatroom}`)
        .then(res => {
            if (res && res.data && res.data.success) {
                setMessages(res.data.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="main-container--inner flex">
                    <LeftBar users={users} socket={socket} />
                    <ChatBar messages={messages} socket={socket} />
                </div>
            </div>
        </>
    )
}

export default Home;