import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import UserList from './UserList';

function ChatApp() {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetch('/messages.json')
            .then(response => response.json())
            .then(data => {
                setUsers(data.users);
                setMessages(data.messages);
                if (data.users.length > 0) {
                    setSelectedUserId(data.users[0].id);
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const selectUser = (userId) => {
        setSelectedUserId(userId);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        const myMessage = {
            id: messages.length + 1,
            userId: 1,
            receiverId: selectedUserId,
            text: newMessage,
            likes: 0,
            likedByCurrentUser: false
        };

        setMessages(prevMessages => [...prevMessages, myMessage]);
        setNewMessage('');

        setTimeout(() => {
            const randomMessageIndex = Math.floor(Math.random() * messages.length);
            const randomMessage = messages[randomMessageIndex];
            const responseMessage = {
                ...randomMessage,
                id: messages.length + 2,
                userId: selectedUserId,
                receiverId: 1,
                likedByCurrentUser: false
            };

            setMessages(prevMessages => [...prevMessages, responseMessage]);
        }, 1000);
    };

    const selectedUser = users.find(user => user.id === selectedUserId);

    return (
        <div className="chat-app">
            <UserList users={users} onSelectUser={selectUser} selectedUserId={selectedUserId} />
            <div className="message-section">
                {selectedUserId && (
                    <>
                        <div className="user-heading">
                            <img src="/fallback-person.jpg" alt="Profile" />
                            <h2 data-status={selectedUser.status}>{selectedUser.name} </h2>
                        </div>
                        <MessageList messages={messages.filter(msg =>
                            (msg.userId === 1 && msg.receiverId === selectedUserId) ||
                            (msg.userId === selectedUserId && msg.receiverId === 1))} />
                        <form onSubmit={sendMessage}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="message-input"
                            />
                            <button type="submit">Send</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default ChatApp;
