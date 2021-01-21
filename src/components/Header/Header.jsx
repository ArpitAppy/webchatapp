import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { APIS } from '../../utils/apis/endpoint';
import { deleteItemFromLS, getItemFromLS } from '../../utils/helpers/localStorage';
import './Header.scss';
import jwt_decode from 'jwt-decode';
import { setNewUserDetails } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Header = () => {

    const logout = () => {
        deleteItemFromLS('token')
        deleteItemFromLS('chatroom')
        deleteItemFromLS('toUser')
        global.location.reload();
    }

    const dispatch = useDispatch();
    const { name } = jwt_decode(getItemFromLS('token'))

    useEffect(() => {
       axios.get(`${APIS._getUserDetails}?fullName=${name}`)
       .then(async res => {
        if (res && res.data && res.data.data) {
            let user = res.data.data
            console.log('user', user)
             await dispatch(
                setNewUserDetails({
                  fullName: user.fullName,
                  emailAddress: user.emailAddress,
                  mobileNumber: user.mobileNumber,
                  password: user.password,
                })
              );
        }
       })
       .catch(err => {
        console.log(err)
       })
    }, [])

    return (
        <div className="header-main flex flex-justify-between flex-align-center">
            <p>Chat Application</p>
            <p className="cursor" onClick={logout}>Logout</p>
        </div>
    )
}

export default Header;