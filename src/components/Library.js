import React from "react";
import LibrarySong from "./LibrarySong";

const Library = (props) => {
    const { songs, setCurrentSong, currentSong, isOpenLibrary } = props

    return (
        <div className={`library ${isOpenLibrary ? "active" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                    <LibrarySong
                        key={song.id}
                        song={song}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library