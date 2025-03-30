import React, { useState } from 'react';

function MessageList({ messages }) {
    const MessageItem = ({ message }) => {
        const [liked, setLiked] = useState(false);
        const sendTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const handleDoubleClick = () => {
            setLiked(!liked);
        };

        return (
            <div className={`message-item ${message.userId === 1 ? 'mine' : ''}`} onDoubleClick={handleDoubleClick}>
                <div className="message-text">
                    {message.text}
                    {liked && <span className="heart-icon animate">❤️</span>}
                </div>
                {message.userId === 1 && (
                    <div className="message-time">
                        Sent at {sendTime}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="message-list">
            {messages.map(message => (
                <MessageItem key={message.id} message={message} />
            ))}
        </div>
    );
}

export default MessageList;
