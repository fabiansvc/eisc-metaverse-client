import { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import "./messenger.css"
import { socket } from "../../../Components/Socket/SocketManager";
import { BiSend } from "react-icons/bi"

const Messenger = ({ setIsChatFocused }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useUser();

    useEffect(() => {
        socket.on("messages", (messages) => {
            setMessages(messages);
        });
    }, []);

    const sendMessage = () => {
        const payload = {
            nickname: user.nickname,
            text: newMessage,
        };
        socket.emit("message", payload);
        setNewMessage("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    const onWriteMessage = (event) => {
        setNewMessage(event.target.value);
    }

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
                </div>
                <div className="input-send-container">
                    <input
                          className="input-messenger"
                          value={newMessage}
                          onChange={(e) => onWriteMessage(e)}
                          onKeyDown={handleKeyDown}
                          onFocus={() => setIsChatFocused(true)} // Deshabilita el movimiento cuando el chat está en foco
                          onBlur={() => setIsChatFocused(false)} // Habilita el movimiento cuando el chat pierde el foco
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