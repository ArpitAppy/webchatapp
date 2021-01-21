import { SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './LeftBar.scss';
import LeftBarUsers from './LeftBarUsers';
import jwt_decode from 'jwt-decode';
import { getItemFromLS } from '../../utils/helpers/localStorage';

const LeftBar = ({ users, socket }) => {

    // const { name } = jwt_decode(getItemFromLS('token'));
    const userDetails = useSelector(state => state.userDetails)
    const [searchText, setSearchText] = useState('');

    const searchFilter = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    let filteredUser = users.filter((user) => user.fullName.toLowerCase().includes(searchText.toLowerCase()))

    return (
        <div className="leftbar flex flex-column">
            <div className="leftbar--header">
                {console.log(userDetails)}
                {userDetails.fullName}
            </div>
            <div className="leftbar--search flex flex-align-center">
                <div className="leftbar--search--input flex flex-align-center">
                    <SearchOutlined />
                    <input type="text" placeholder="Search User" onChange={searchFilter} />
                </div>
            </div>
            <div className="leftbar--user">
                {
                    filteredUser && filteredUser.map(user => {
                        return <LeftBarUsers user={user} socket={socket} />
                    })
                }
            </div>
        </div>
    )
}

export default LeftBar
