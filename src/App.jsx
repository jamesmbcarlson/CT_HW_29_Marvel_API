/* 
  James Carlson
  Coding Temple - SE FT-144
  Frontend, Module 11 Lesson 3 Assignment: Component Lifecycle Events and Forms
*/

import { useState } from 'react'
import './App.css'
import CharacterList from './components/CharacterList.jsx'
import CharacterDetail from './components/CharacterDetail.jsx'

function App() {
  const [selectedCharacter, selectCharacter] = useState(null);

  const handleCharacterSelect = (characterId) => {
    selectCharacter(characterId);
  }

  return (
    <>
    <div className='body-header'>
      <img src='./src/assets/images/logo_shield.png'/>
      <h1>SHIELD Database</h1>
    </div>
    <div className='body-content'>
      {selectedCharacter != null &&
      <>
        <CharacterDetail characterIdDetail={selectedCharacter} onClose={handleCharacterSelect}/> 
      </>}
      <CharacterList onCharacterSet={handleCharacterSelect} />
    </div>
    </>
  )
}

export default App
