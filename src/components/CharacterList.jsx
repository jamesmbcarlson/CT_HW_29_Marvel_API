/* 
  James Carlson
  Coding Temple - SE FT-144
  Frontend, Module 11 Lesson 3 Assignment: Component Lifecycle Events and Forms
*/

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './CharacterList.module.css'

function CharacterList(props) {
    const [characterList, setCharacterList] = useState(null);
    const [offset, setOffset] = useState(0);
    const {onCharacterSet} = props;


    // get list of 25 characters on load or when list offset is updated 
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=7d688b5e0e4aa54d476269d9a8d66ff3&hash=2971945741b8323fdd1eaeb3085f716e&limit=25&offset=${offset}`);
            // console.log(response);
            setCharacterList(response.data.data.results);
        }
        fetchData();
    }, [onCharacterSet, offset]);

    // update offset using arrow buttons
    const updateOffset = (offsetDelta) => {
        let newOffset = offset + offsetDelta;
        if(newOffset < 0) {
            newOffset = 1550; // hardcoded so I can go to bed :)
        }
        else if (newOffset > 1550) {
            newOffset = 0;
        }
        setOffset(newOffset);
    }

  return (
    <div className={styles.listContainer}>
        {(characterList) &&
        <div>
            <div className={styles.offsetButtons}>
                <button onClick={() => {updateOffset(-25)}}>◀◀</button>
                <button onClick={() => {updateOffset(25)}}>▶▶</button>
            </div>
        {characterList.map((character => (
            <div className={styles.characterCard} onClick={() => {
                onCharacterSet(character.id);
            }}>
                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`}/>
                <h3 key={character.id}>
                    {character.name}
                </h3>
            </div>
        )))}
            <div className={styles.offsetButtons}>
                <button onClick={() => {updateOffset(-25)}}>◀◀</button>
                <button onClick={() => {updateOffset(25)}}>▶▶</button>
            </div>
        </div>}
    </div>
  )
}

export default CharacterList

