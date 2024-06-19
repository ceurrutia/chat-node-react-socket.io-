import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState('')

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time: new Date(Date.now()).getHours() + " " + new Date().getMinutes()

            }

            await socket.emit('send_message', info)
        }
    }

    useEffect(()=> {
        socket.on("receive_message", (data) => {
            console.log(data)
        })
    }, [socket] )

    return (
        <div>
            <section className="chat-header">
                <p>Chat on real time</p>
            </section>

            <section id="messages"></section>

            <section className="chat-footer">
                <input type="text" placeholder="Message..."
                    onChange={e => setCurrentMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send &#9658;</button>
            </section>
        </div>
    )
}

export default Chat;