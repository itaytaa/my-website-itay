import React, { useState, useEffect } from 'react'
import photo from './images/circle-cropped.png';
import './Main.css'
import Typewriter from "typewriter-effect";

function Main(props) {


    return (
        <div className="main d-flex flex-column align-items-center">
            <img src={photo} /><br />
            <Typewriter
                onInit={(typewriter) => {
                    typewriter.typeString("Hi, ").pauseFor(2000).start()
                    typewriter.typeString("My name is Itay.<br>").pauseFor(2000).start()
                    typewriter.typeString("I'm a Web Developer.<br>").pauseFor(2000).start()
                    typewriter.typeString("I've built this website using React.<br>").pauseFor(2000).start()
                    typewriter.typeString("I can build yours too...<br>").pauseFor(1500).start()
                    typewriter.typeString("if you pay me").pauseFor(1500).deleteChars(6).start()
                    typewriter.typeString("want :)<br>").pauseFor(2000).start()
                    typewriter.typeString("Lets talk!").pauseFor(1000).start()
                    //  <br>   umm  <br>I\'ve add my projects that I built and it\'s all in the Gallery Tab .<br> click it and see what i\'ve been doing on friday nights in the last six months.  "
                }}

            />

        </div>
    )
}

export default Main
