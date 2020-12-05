import React, { useState, useRef } from "react";
import "./styles/App.scss";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import data from "./data";
import Nav from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  //States
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  //Le Ref permet d'appeler des fcts prédéfinies d'une balise HTML équivalent du document.getElement
  const audioRef = useRef(null);

  //Recupérer le currentTime et la duration avec des propriétés html prédéfinies de la balise audio
  const timeUpdateHandler = (e) => {
    let currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
    if (audioRef.current.ended) {
      setIsEnded(true);
    } else {
      setIsEnded(false);
    }
  };

  //Auto Skip
  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex !== songs.length - 1) {
      let nextSong = currentIndex + 1;
      await setCurrentSong(songs[nextSong]);
    } else if (currentIndex === songs.length - 1) {
      let nextSong = 0;
      await setCurrentSong(songs[nextSong]);
    }
    if(isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${isLibraryOpen ? "library-open" : ""}`}>
      <Nav isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        allSongs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isEnded={isEnded}
        setIsEnded={setIsEnded}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        isLibraryOpen={isLibraryOpen}
        setIsLibraryOpen={setIsLibraryOpen}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
