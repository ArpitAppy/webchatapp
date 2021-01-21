import { Avatar } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newChatRoomReducer } from '../../redux/reducers/userDetails';
import { APIS } from '../../utils/apis/endpoint';
import { getItemFromLS, setItemInLS } from '../../utils/helpers/localStorage';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';
import { URL } from '../../config';
import { compareTwoNames, getChatRoomString } from '../../utils/helpers/textUtils';

const LeftBarUsers = ({ user, socket }) => {

    const [selectedUser, setSelectedUser] = useState('');
    const dispatch = useDispatch()
    // const userDetails = useSelector((state) => state.userDetails)
    const { name } = jwt_decode(getItemFromLS('token'))
    const chatroom = getItemFromLS('chatroom');

    const createChatRoom = async () => {
        
            axios.post(APIS._createChatRoom, {
                name: compareTwoNames(name, user.fullName) > 0 ? `${name}-${user.fullName}` : `${user.fullName}-${name}` ,
                from: name,
                to: user.fullName
            })
            .then(async res => {
                if (res && res.data && res.data.success) {
                    console.log(res.data.data)
                    setItemInLS('chatroom', res.data.data.chatroom.name)
                    setItemInLS('toUser', user.fullName)
                    await axios.post(APIS._updateReadStatus, {chatroom})
                    .then(res => {
                        if (res && res.data && res.data.success) {
                            window.location.reload()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        socket.emit('join', chatroom)
      }, []);

    const getChatRoom = (name) => {
        axios.get(`${APIS._getChatRoom}?name=${name}`)
        .then(res => {
            if (res?.data?.data?.chatroom?.name) {
                console.log('here')
                return false
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={`leftbar-users flex flex-align-center cursor ${getChatRoomString(name, user.fullName) === getItemFromLS('chatroom') ? 'leftbar-users--selected' : 'leftbar-users--nonselected' }`}>
            <Avatar />
            <div 
                onClick={createChatRoom} 
                className={`leftbar-users--info ${getChatRoomString(name, user.fullName) === getItemFromLS('chatroom') ? 'leftbar-users--selected' : 'leftbar-users--nonselected' }`}
            >
                <h2>{user.fullName}</h2>
            </div>
        </div>
    )
}

export default LeftBarUsers
