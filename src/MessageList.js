import React, { useState } from 'react';

function MessageList({ messages }) {
    const MessageItem = ({ message }) => {
        const [liked, setLiked] = useState(false);

        const handleDoubleClick = () => {
            setLiked(!liked);
        };

        return (
            <div className={`message-item ${message.userId === 1 ? 'mine' : ''}`}
                 onDoubleClick={handleDoubleClick}>
                <div className="message-text">
                    {message.text}
                    {liked && <span className="heart-icon animate">❤️</span>}
                </div>
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
