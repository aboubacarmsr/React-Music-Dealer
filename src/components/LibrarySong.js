import React from 'react'

const LibrarySong = ({ id, song, allSongs, setCurrentSong, setSongs, isPlaying, audioRef }) => {

    const songSelectHandler = async () => {
        const selectedSong = allSongs.filter((song) => song.id === id);
        await setCurrentSong(selectedSong[0]);
        //Mettre active à true
        const newSongs = allSongs.map(song => {
            if(song.id === id){
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
        if(isPlaying) audioRef.current.play();
    }

    return ( 
        <div className={`library-song ${song.active ? "active" : ""}`} onClick={songSelectHandler} >     
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3> {song.name} </h3>
                <h4> {song.artist} </h4>
            </div>
        </div>
     );
}
 
export default LibrarySong;