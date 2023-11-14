import "./messenger.css";
import { useEffect, useState, useRef } from "react";
import { socket } from "../../../../components/Socket/SocketManager";
import { BiSend } from "react-icons/bi";
import { useUser } from "../../../../context/UserContext";

const Messenger = ({ setIsChatFocused }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useUser();
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        const handleMessage = (message) => {
            setMessages((messages) => [...messages, message]);
        };
        socket.on("newMessage", handleMessage);
    
        return () => {
            socket.off("newMessage", handleMessage);
        };
    }, []);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        const payload = {
            nickname: user.nickname,
            text: newMessage,
        };
        socket.emit("message", payload);
        setNewMessage("");
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const onWriteMessage = (event) => {
        setNewMessage(event.target.value);
    };

    return (
        <div className="container-messenger">
            <div className="messages-messenger">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message-messenger ${message.nickname === user.nickname ? 'message-mine' : 'message-other'}`}>
                        <div className="message-username-messenger">{message.nickname}</div>
                        <div className="message-text-messenger">{message.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} /> 
            </div>
            <div className="input-send-container">
                <input
                    className="input-messenger"
                    value={newMessage}
                    onChange={onWriteMessage}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsChatFocused(true)}
                    onBlur={() => setIsChatFocused(false)}
                    placeholder="Escribe algo..."
                />
                <div className="send-messenger">
                    <button onClick={sendMessage}>
                        <BiSend className="icon-messenger" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Messenger;
