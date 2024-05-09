/* 
  James Carlson
  Coding Temple - SE FT-144
  Frontend, Module 11 Lesson 3 Assignment: Component Lifecycle Events and Forms
*/

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './CharacterDetail.module.css';

function CharacterDetail({characterIdDetail, onClose}) {
    const [characterDetails, setCharacterDetails] = useState(null);

    // get new character details when a new character is selected
    useEffect(() => {
        const fetchCharacter = async (id) => {
            if (id !== null) {
                console.log(id);
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=7d688b5e0e4aa54d476269d9a8d66ff3&hash=2971945741b8323fdd1eaeb3085f716e`);
                console.log(response);
                setCharacterDetails(response.data.data.results[0]);
            }
        }
        fetchCharacter(characterIdDetail);
    }, [characterIdDetail]);

    // set charcter selection to null when module is closed
    const closeDetails = () => {
        onClose(null);
    }

    // render module when a character is selected
  return (
    <>{characterDetails &&
    <div className={styles.detailContainer}>
        <div className={styles.detailPane}>
            <div className={styles.windowHead}>
                <h3>File_{characterDetails.id}</h3>
                <button onClick={closeDetails}><h6>×</h6></button>
            </div>
            <div className={styles.windowBody}>
                <div className={styles.imageContainer}>
                    <img src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`}/>
                </div>
                <div className={styles.textContainer}>
                    <h2>{characterDetails.name}</h2>

                    {/* Show description if available; otherwise, it must be classified! */}
                    {characterDetails.description === '' ?
                        <p>Description: [CLASSIFIED]</p>:
                        <p>{characterDetails.description}</p>
                    }

                    {/* Show up to 20 comic appearances if available */}
                    {(characterDetails.comics.available > 0) ? 
                        <h4>Appears in Comics:</h4> :
                        <p>No further data available.</p>}
                    <ul>
                        {characterDetails.comics.items.map((comic => (
                            <li>{comic.name}</li>
                        )))}
                        {(characterDetails.comics.available > 20) &&
                            <li>+ {characterDetails.comics.available - 20} more...</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    </div>}
    </>
  )
}

export default CharacterDetail