import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";
import {
  Container,
  Form,
  Button,
  Divider,
  Card,
  Icon,
} from "semantic-ui-react";

const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (!username == "" && !room == "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <Container>
      { !showChat ? (
      <Card fluid>
        <Card.Content header="Join us!" />
        <Card.Content>
          <Form>
            <Form.Field>
              <label>User Name: </label>
              <input
                type="text"
                placeholder="Type your name..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Room: </label>
              <input
                type="text"
                placeholder="ID room: "
                onChange={(e) => setRoom(e.target.value)}
              />
            </Form.Field>

            <Button onClick={joinRoom}> Join us!</Button>
          </Form>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />4 Friends
        </Card.Content>
      </Card>
      ) : (
      <Chat socket={socket} username={username} room={room} />
    )}
    </Container>
  );
}

export default App;
