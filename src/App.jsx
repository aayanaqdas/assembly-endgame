import { useState } from "react";
import { languages } from "./languages";

export default function AssemblyEndgame() {
  const [currWord, setCurrWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  console.log(guessedLetters)
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const languagesElements = languages.map((language) => {
    return (
      <span
        key={language.name}
        style={{ backgroundColor: language.backgroundColor, color: language.color }}
      >
        {language.name}
      </span>
    );
  });

  const word = currWord.split("").map((letter, index) => {
    return (
      <span className="letter" key={index}>
        {letter}
      </span>
    );
  });

  const keyboard = alphabet.split("").map((key) => {
    return (
      <button className="keyboard-key" key={key} onClick={() => addGuessedLetters(key)}>
        {key}
      </button>
    );
  });

  function addGuessedLetters(letter) {
    setGuessedLetters((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  }
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="languages-container">{languagesElements}</section>
      <section className="word-container">{word}</section>
      <section className="keyboard-container">{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
