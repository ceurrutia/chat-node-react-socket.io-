import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Container,
  Form,
  Message,
  Divider,
} from "semantic-ui-react";
import ScrollToBottom from 'react-scroll-to-bottom'


const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room,
        author: username,
        time: new Date(Date.now()).getHours() + ": " + new Date().getMinutes(),
      };

      await socket.emit("send_message", info);
      setMessageList((list) => [...list, info]);
      setCurrentMessage("")
    }
  };

  useEffect(() => {
    const messageHandle = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", messageHandle);

    return () => socket.off("receive_message", messageHandle);
  }, [socket]);

  return (
    <Container>
      <Card fluid>
        <Card.Content header={`Live Chat | Room: ${room} | User ${username}`} />
        <ScrollToBottom>
        <Card.Content style={{ height: "400px", padding: "10px" }} >

          {messagesList.map((item, i) => {
            return (
              <span key={i}>
                <Message
                  style={{
                    textAlign: username === item.author ? "right" : "left",
                  }}
                  success={username === item.author}
                  info={username !== item.author}
                >
                  <Message.Header> {item.message}</Message.Header>
                  <p>
                    sended by <strog>{item.author} </strog>at <i>{item.time}</i>{" "}
                  </p>
                </Message>
                <Divider />
              </span>
            );
          })}
         
        </Card.Content>
        </ScrollToBottom>
        <Card.Content extra>
          <Form fluid>
            <Form.Field className="ui action input">
              <div className="ui action input">
                <input 
                value={currentMessage}
                  type="text"
                  placeholder="Write here ..."
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    sendMessage();
                  }}
                  className="ui teal icon right labeled button"
                >
                  <Icon name="send" /> Enviar{" "}
                </button>
              </div>
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default Chat;
Chat.propTypes = {
  socket: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};
