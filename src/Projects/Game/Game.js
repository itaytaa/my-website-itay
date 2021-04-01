import React from 'react'
import './Game.css'
function Game(props) {


    return (
        <div className="Game col-sm d-flex ">

            <a href={props.src} className="game-name">{props.name} </a>
            <a href={props.src}>  <img src={props.image} ></img></a>
        </div>
    )
}

export default Game
