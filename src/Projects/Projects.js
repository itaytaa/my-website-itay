import React from 'react'
import Game from './Game/Game'
import './Projects.css'
import pacmanImage from '../../src/images/pacman-screen-shot.png'
import balloons from '../../src/images/pop-balloons.png'
import cars from '../../src/images/racing-cars.png'
import mineSweeper from '../../src/images/mine-sweeper.png'


function Projects() {
    const games = [
        { name: 'Pacman', src: '../games/pacman-new/pacman-new.html', image: pacmanImage },
        { name: 'Pop-Balloons', src: '../games/Balloon-pop/touch-ballons.html', image: balloons },
        { name: 'Racing-Cars', src: '../games/racing-cars/index.html', image: cars },
        { name: 'Mine-Sweeper', src: '../games/mine-sweeper/index.html', image: mineSweeper }


    ]


    return (
        <div className="Projects container">
            <h2 className="title-games">Apps</h2>
            <div className="games-container  mx-4 d-flex flex-column justify-content-center align-items-center">
                <a href="https://limitless-headland-70665.herokuapp.com/" style={{color:"black"}}>Link to Instagram App</a>
                <video controls autoPlay className="m-5">
                    <source src="../video.mov" type="video/mp4" />
                </video>
            </div>
            <h2 className="title-games">Games</h2>



            <div className="games-container row mx-4">
                {games.map((game, index) => {

                    return <Game name={game.name} image={game.image} src={game.src} key={index}/>
                })}

            </div>





        </div>
    )
}

export default Projects
