import React from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Library = ({ songs, setSongs, setCurrentSong, audioRef, isPlaying, isLibraryOpen, setIsLibraryOpen }) => {
  return (
    <div className={`library ${isLibraryOpen ? "open" : ""}`}>
        <div className="title">
            <h2>Library</h2>
            <FontAwesomeIcon className="close"
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                size="2x"
                icon={faTimes}
            />
        </div>
      <div className="songs-container">
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            audioRef={audioRef}
            key={song.id}
            id={song.id}
            song={song}
            allSongs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
