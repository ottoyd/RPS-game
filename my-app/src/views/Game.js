import React, { useState } from "react";
import {
  useParams
} from "react-router-dom";

export default function Game() {
  let { id } = useParams()
  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const [player1RPS, setPlayer1RPS] = useState('');
  const [player2RPS, setPlayer2RPS] = useState('');

  const [player1Win, setPlayer1Win] = useState(false);
  const [player2Win, setPlayer2Win] = useState(false);

  let [match, setMatch] = useState(1);
  let [timer, setTimer] = useState(5);

  const [errMsg, setErrMsg] = useState('');

  const play = () => {
    if (!player1Ready && !player2Ready) {
      while (match !== 5) {
        while (timer !==0) {
          
        }
        setMatch(match + 1)
      }
    } else {
      setErrMsg('Another Player Not Ready')
    }
  }
  
  return (
    <div>
      {play()}
      <p>{match}</p>
      <p>{timer}</p>
    </div>
  )
}