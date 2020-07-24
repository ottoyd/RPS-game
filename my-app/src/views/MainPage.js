import '../styles/MainPage.css';
import React, { useState, useEffect} from "react";
import socket from "../config/socket"
import { useHistory } from "react-router-dom";

export default function MainPage() {
  const history = useHistory()
  const [userLogin, setUserLogin] = useState([]);
  const [allChatMsg, setAllChatMsg] = useState([]);
  const [room, setRoom] = useState([]);
  const [textMsg, setTextMsg] = useState('');
  const currentUser = localStorage.getItem('username')

  useEffect(() => {
    socket.on('user-connect-list', dataUser => {
      setUserLogin(dataUser)
    })

    socket.on('all-messages', dataChat => {
      setAllChatMsg(dataChat)
    })

    socket.on('all-room', dataRoom => {
      setRoom(dataRoom)
    })

  }, [userLogin, allChatMsg, room])

  const handleSend = () => {
    let dataChat = {
      sender: currentUser,
      text: textMsg
    }
    socket.emit('send-message', dataChat)
    setTextMsg('')
  }

  const handleCreateRoom = () => {
    let dataRoom = {
      capacity: 1
    }
    socket.emit('create-room', dataRoom)
    console.log(room.length)
    if (room.length === 0) history.push(`/Game/1`)
    else history.push(`/Game/${room[room.length-1].id + 1}`)
    
  }

  const handleJoin = (roomId) => {
    for (let i in room) {
      if (room[i].id === roomId) room[i].capacity += 1
    }
    history.push(`/Game/${roomId}`)
  }

  const checkFull = (room) => {
    if (room.capacity === 1) {
      return <button className = "roomBoxBtn" onClick={() => handleJoin(room.id)}>Join</button>
    } else {
      return <button className = "roomBoxBtn">FULL</button>
    }
  }

  return (
    <div className = "main">

      <div className = "userBox">
        <p className = "currentUser">Halo, {currentUser}</p>
        {/* <p>{JSON.stringify(userLogin)}</p> */}
        {userLogin.map((user) => {
          return <p className = "allUser">{user}</p>
        })}
        <div className = "roomContainer">
          <p>Room</p>
          <button className = "btnCreateRoom" onClick={() => handleCreateRoom()}>+</button>
        </div>
        {room.map((r) => {
          console.log(room)
          return (
            <div className = "roomBox">
              <p>{r.id}</p>
              {checkFull(r)}
            </div>
          )
        })}

      </div>

      <div className = "chatBox">
        <div className = "allChat">
          {allChatMsg.map((chat) => {
          return (
            <div className = "chatContainer">
              <p>{chat.sender} : {chat.text}</p>
            </div>
          )
        })}
        </div>

        <div className = "chatTextBox">
          <input type="text" className = "chatTextInput" onChange={e => setTextMsg(e.target.value)}></input>
          <button className = "chatTextButton" onClick={() => handleSend()}>Send</button>
        </div>
      </div>

    </div>
  )
}