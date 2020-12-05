import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  isPlaying,
  setIsPlaying,
  isEnded,
  songInfo,
  setSongInfo,
  audioRef,
  currentSong,
  setCurrentSong,
  allSongs,
  setSongs,
}) => {

    useEffect(() => {
        //Mettre active à true
        const newSongs = allSongs.map(song => {
            if(song.id === currentSong.id){
                return{
                    ...song,
                    active: true
                }
            }else{
                return{
                    ...song,
                    active: false
                }
            }
        });
        setSongs(newSongs);
    }, [currentSong]) //Executer la fonction à chaque fois que le currentSong change

  //Lecture
  const playHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  //Replay
  const replayHandler = () => {
    const newCurrentTime = 0.0;
    setSongInfo({ ...songInfo, currentTime: newCurrentTime });
    audioRef.current.play();
    setIsPlaying(true);
  };

  //Formater l'affichage temps en minutes et secondes
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Gerer le déplacement du bouton pour avancer ou reculer à un moment donné
  const grabHandler = (e) => {
    const newCurrentTime = e.target.value;
    audioRef.current.currentTime = newCurrentTime;
    setSongInfo({ ...songInfo, currentTime: newCurrentTime });
  };

  //Gerer le son suivant / precedent
  const skipSongHandler = async (direction) => {
    let currentIndex = allSongs.findIndex(song => song.id === currentSong.id);
    if(direction === 'skip-back'){
        if(currentIndex!== 0){
            let prevSong = currentIndex - 1;
            await setCurrentSong(allSongs[prevSong]);
        }
        else if(currentIndex === 0){
            let prevSong = allSongs.length - 1;
            await setCurrentSong(allSongs[prevSong]);
        }
    }else if(direction === 'skip-forward'){
        if(currentIndex !== allSongs.length - 1){
            let nextSong = currentIndex + 1;
            await setCurrentSong(allSongs[nextSong]);
        }
        else if(currentIndex === allSongs.length -1){
            let nextSong = 0;
            await setCurrentSong(allSongs[nextSong]);
        }
    }
    if(isPlaying) audioRef.current.play();
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p> {getTime(songInfo.currentTime)} </p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          onChange={grabHandler}
        />
        <p> { songInfo.duration ? getTime(songInfo.duration) : "0:00"} </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipSongHandler("skip-back")}
          size="2x"
          icon={faAngleLeft}
        />
        {isEnded ? (
          <FontAwesomeIcon
            className="replay"
            size="2x"
            icon={faRedo}
            onClick={replayHandler}
          />
        ) : (
          <FontAwesomeIcon
            className="play"
            size="2x"
            icon={isPlaying ? faPause : faPlay}
            onClick={playHandler}
          />
        )}
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipSongHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
