import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = (props) => {
    const { isOpenLibrary, setIsOpenLibrary } = props

    const openLibraryHandler = () => {
        setIsOpenLibrary(!isOpenLibrary)
    }

    return (
        <nav>
            <h2>Music-app</h2>
            <button onClick={openLibraryHandler}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
}

export default Nav