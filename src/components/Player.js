import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
    const { setCurrentSong, currentSong, isPlaying, setIsPlaying, songs } = props
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    })

    const audioRef = useRef(null)

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime
        const duration = e.target.duration || 0

        const roundedCurrent = Math.round(currentTime)
        const roundedDuration = Math.round(duration)
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100)

        setSongInfo({
            ...songInfo,
            currentTime,
            duration,
            animationPercentage
        })
    }

    const getFormattedTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        setSongInfo({ ...songInfo, currentTime: e.target.value })
        audioRef.current.currentTime = e.target.value
    }

    const autoPlayHandler = () => {
        if (isPlaying) {
            audioRef.current.play()
        }
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        if (direction === "skip-forward") {
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        } else {
            setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length])
        }
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getFormattedTime(songInfo.currentTime)}</p>
                <div
                    style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }}
                    className="track"
                >
                    <input
                        min={0}
                        max={songInfo.duration}
                        value={songInfo.currentTime}
                        type="range"
                        onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track" />
                </div>
                <p>{getFormattedTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-back")}
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    icon={isPlaying ? faPause : faPlay}
                    size="2x"
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-forward")}
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x"
                />
            </div>
            <audio
                onLoadedData={autoPlayHandler}
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                onEnded={() => skipTrackHandler("skip-forward")}
                src={currentSong.audio}
                ref={audioRef}
            />
        </div>
    )
}

export default Player