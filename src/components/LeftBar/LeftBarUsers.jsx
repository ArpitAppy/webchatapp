import { Avatar } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import { APIS } from '../../utils/apis/endpoint';

const LeftBarUsers = ({ user }) => {

    const [selectedUser, setSelectedUser] = useState('');

    const createChatRoom = async () => {
            axios.post(APIS._createChatRoom, {
                name: user.fullName
            })
            .then(res => {
                if (res && res.data && res.data.success) {
                    console.log(res.data.data)
                    setSelectedUser(res.data.data.chatroom.name)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

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
        <div className="leftbar-users flex flex-align-center cursor">
            <Avatar />
            <div 
                onClick={createChatRoom} 
                className={`leftbar-users--info ${selectedUser === user.fullName ? 'leftbar-users--selected' : 'leftbar-users--nonselected' }`}
            >
                <h2>{user.fullName}</h2>
            </div>
        </div>
    )
}

export default LeftBarUsers
