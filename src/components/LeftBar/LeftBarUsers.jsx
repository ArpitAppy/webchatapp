import { Avatar } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newChatRoomReducer } from '../../redux/reducers/userDetails';
import { APIS } from '../../utils/apis/endpoint';
import { getItemFromLS, setItemInLS } from '../../utils/helpers/localStorage';
import jwt_decode from 'jwt-decode';

const LeftBarUsers = ({ user }) => {

    const [selectedUser, setSelectedUser] = useState('');
    const dispatch = useDispatch()
    // const userDetails = useSelector((state) => state.userDetails)
    const owner = jwt_decode(getItemFromLS('token')).name

    const createChatRoom = async () => {
            axios.post(APIS._createChatRoom, {
                name: user.fullName,
                from: owner,
                to: user.fullName
            })
            .then(res => {
                if (res && res.data && res.data.success) {
                    console.log(res.data.data)
                    setItemInLS('chatroom', res.data.data.chatroom.name)
                    // dispatch(
                    //     newChatRoomReducer({name: res.data.data.chatroom.name})
                    // )
                    window.location.reload()
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
        <div className={`leftbar-users flex flex-align-center cursor ${user.fullName === getItemFromLS('chatroom') ? 'leftbar-users--selected' : 'leftbar-users--nonselected' }`}>
            <Avatar />
            <div 
                onClick={createChatRoom} 
                className={`leftbar-users--info ${user.fullName === getItemFromLS('chatroom') ? 'leftbar-users--selected' : 'leftbar-users--nonselected' }`}
            >
                <h2>{user.fullName}</h2>
            </div>
        </div>
    )
}

export default LeftBarUsers
