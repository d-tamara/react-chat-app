import React from 'react';

function UserList({ users, onSelectUser, selectedUserId }) {
    return (
        <div className="user-list">
            {users.map(user => (
                <div
                    key={user.id}
                    onClick={() => onSelectUser(user.id)}
                    className={`user-item ${user.id === selectedUserId ? 'selected' : ''}`}
                    data-status={user.status}>
                    <img src="/fallback-person.jpg" alt="User Profile" className="user-profile-image" />
                    <p>{user.name}</p>
                </div>
            ))}
        </div>
    );
}

export default UserList;
