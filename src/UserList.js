import React from 'react';

function UserList({ users, onSelectUser }) {
    return (
        <div className="user-list">
            {users.map(user => (
                <div
                    key={user.id}
                    onClick={() => onSelectUser(user.id)}
                    className="user-item"
                    data-status={user.status}>
                    {user.name}
                </div>

            ))}
        </div>
    );
}


export default UserList;
