import { useState } from "react";
import { clsx } from "clsx";
import { languages } from "./languages";
import { getFarewellText, getWord } from "./utils";

export default function AssemblyEndgame() {
  const [currWord, setCurrWord] = useState(() => getWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessCount = guessedLetters.filter((letter) => !currWord.includes(letter)).length;

  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameWon = currWord.split("").every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessWrong = lastGuessedLetter && !currWord.includes(lastGuessedLetter);
  const missingLetters = currWord.split("").filter((letter) => !guessedLetters.includes(letter));

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((lang, index) => {
    const isLost = index < wrongGuessCount;

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className={clsx("chip", { lost: isLost })} style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

    const word = currWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            "letter", 
            isGameLost && !guessedLetters.includes(letter) && "missing",
            isGameWon && "won"
        )
        return (
            <span className={letterClassName} key={index}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

  const keyboard = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isRight = isGuessed && currWord.includes(letter);
    const isWrong = isGuessed && !currWord.includes(letter);
    const className = clsx({ "right-letter": isRight, "wrong-letter": isWrong });
    return (
      <button
        className={className}
        key={letter}
        disabled={isGameOver}
        onClick={() => addGuessedLetters(letter)}
      >
        {letter}
      </button>
    );
  });

  function addGuessedLetters(letter) {
    if (!isGameOver) {
      setGuessedLetters((prevLetter) =>
        prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
      );
    }
  }

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessWrong,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessWrong) {
      return (
        <p className="farewell-message">{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }

    return null;
  }

  function newGame() {
    if (isGameOver) {
      setGuessedLetters([]);
      setCurrWord(getWord());
    }
  }
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>{renderGameStatus()}</section>
      <section className="language-chips">{languageElements}</section>
      <section className="word-container">{word}</section>
      <section className="keyboard-container">{keyboard}</section>
      {isGameOver && (
        <button className="new-game" onClick={newGame}>
          New Game
        </button>
      )}
    </main>
  );
}
