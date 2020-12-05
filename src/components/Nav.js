import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from "@fortawesome/free-solid-svg-icons"

const Nav = ({ isLibraryOpen, setIsLibraryOpen }) => {
    return ( 
        <nav>
            <h1>Music Dealer</h1>
            <button onClick={() => setIsLibraryOpen(!isLibraryOpen)} >
                Library
                <FontAwesomeIcon icon={faMusic} className="music-icon"/>
            </button>
        </nav>
     );
}
 
export default Nav;