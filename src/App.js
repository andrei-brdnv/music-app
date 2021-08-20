import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import "./styles/app.scss";
import data from "./data";

const App = () => {
    const [songs, setSongs] = useState(data)
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [isOpenLibrary, setIsOpenLibrary] = useState(false)

    return (
        <div className="App">
            <Nav
                isOpenLibrary={isOpenLibrary}
                setIsOpenLibrary={setIsOpenLibrary}
            />
            <Song
                currentSong={currentSong}
            />
            <Player
                songs={songs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            <Library
                songs={songs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isOpenLibrary={isOpenLibrary}
            />
        </div>
    );
}

export default App;
