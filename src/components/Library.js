import React from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Library = (props) => {
    const { songs, setCurrentSong, currentSong, isOpenLibrary, setIsOpenLibrary } = props

    const openLibraryHandler = () => {
        setIsOpenLibrary(!isOpenLibrary)
    }

    return (
        <div className={`library ${isOpenLibrary ? "active" : ""}`}>
            <h2>
                Library
                <FontAwesomeIcon icon={faTimes} onClick={openLibraryHandler} />
            </h2>
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