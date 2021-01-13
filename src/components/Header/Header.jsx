import React from 'react';
import { deleteItemFromLS } from '../../utils/helpers/localStorage';
import './Header.scss';

const Header = () => {

    const logout = () => {
        deleteItemFromLS('token')
        global.location.reload();
    }

    return (
        <div className="header-main flex flex-justify-between flex-align-center">
            <p>Chat Application</p>
            <p className="cursor" onClick={logout}>Logout</p>
        </div>
    )
}

export default Header;