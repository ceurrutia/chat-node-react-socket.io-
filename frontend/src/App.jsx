import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './Chat'


const socket = io.connect('http://localhost:3000')


function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (!username == '' && !room == '') {
      socket.emit("join_room", room)
    }
  }


  return (
    <>
      <div className='chat'>
        <h1> Join us!</h1>

        <input type="text" placeholder='Type your name...'
          onChange={e => setUsername(e.target.value)} />

        <input type="text" placeholder='ID room: '
          onChange={e => setRoom(e.target.value)} />

        <button onClick={joinRoom}> Join us!</button>

        <Chat socket={socket} username={username} room={room} />


      </div>

    </>
  )
}

export default App
