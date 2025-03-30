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
            userId: 1,  // Assuming '1' is the ID of the current user
            receiverId: selectedUserId,  // ID of the user to whom the message is sent
            text: newMessage,
            likes: 0,
            likedByCurrentUser: false
        };

        // Update messages state by adding the new message
        setMessages(prevMessages => [...prevMessages, myMessage]);
        setNewMessage('');  // Clear input after sending

        // Simulate receiving a response
        setTimeout(() => {
            const randomMessageIndex = Math.floor(Math.random() * messages.length);
            const randomMessage = messages[randomMessageIndex];
            const responseMessage = {
                ...randomMessage,
                id: messages.length + 2,
                userId: selectedUserId,  // Simulated response from the selected user
                receiverId: 1,  // Response to the current user
                likedByCurrentUser: false
            };

            setMessages(prevMessages => [...prevMessages, responseMessage]);
        }, 1000);
    };

    // Find the selected user by ID to display the name
    const selectedUser = users.find(user => user.id === selectedUserId);

    return (
        <div className="chat-app">
            <UserList users={users} onSelectUser={selectUser} />
            <div className="message-section">
                {selectedUserId && (
                    <>
                        <h2>{`${selectedUser.name}`}</h2>
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
