import { SearchOutlined } from '@material-ui/icons';
import React from 'react'
import './LeftBar.scss';
import LeftBarUsers from './LeftBarUsers';

const LeftBar = ({ users }) => {
    return (
        <div className="leftbar flex flex-column">
            <div className="leftbar--header">
                Arpit Agarwal
            </div>
            <div className="leftbar--search flex flex-align-center">
                <div className="leftbar--search--input flex flex-align-center">
                    <SearchOutlined />
                    <input type="text" placeholder="Type here to search User" />
                </div>
            </div>
            <div className="leftbar--user">
                {
                    users && users.map(user => {
                        return <LeftBarUsers user={user} />
                    })
                }
            </div>
        </div>
    )
}

export default LeftBar
