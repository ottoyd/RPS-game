import React, {useState} from "react";
import socket from "../config/socket"
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const handleSubmit = () => {
    localStorage.setItem('username', username)
    socket.emit('user-connect', username)
    history.push('/MainPage')
  }

  return (
    <div>
      <p>Insert Your Name</p>
      <input type="text" onChange={e => setUsername(e.target.value)}></input>
      <br></br>
      <button onClick={e => handleSubmit(e.target.value)}>Add</button>
    </div>
  )
}