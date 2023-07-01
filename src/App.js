import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [newString, setNewString] = useState("");
  const [oldstring, setOldString] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setOldString(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      alert("Please enter a non-empty value!");
    } else {
      setNewString(inputValue.trim());
      setInputValue("");
    }
  };

  const handleDelete = (char, index) => {
    var filteredString = "";
    for (let i = 0; i < newString.length; i++) {
      if (newString[i] == char) {
        if (i == index) {
          filteredString += newString[i];
        }
      } else {
        filteredString += newString[i];
      }
    }
    setNewString(filteredString);
  };

  const renderCards = () => {
    const charCounts = {};
    const charColors = {}; // new object to hold mapping of characters to colors
    for (let i = 0; i < newString.length; i++) {
      const char = newString[i];
      if (!charCounts[char]) {
        charCounts[char] = 1;
        charColors[char] = `rgb(${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )})`; // assign a random color to this character
      } else {
        charCounts[char]++;
      }
    }

    const cards = [];
    for (let i = 0; i < newString.length; i++) {
      const char = newString[i];
      if (charCounts[char] > 1) {
        cards.push(
          <div
            className="card"
            key={i}
            style={{
              backgroundColor: charColors[char], // use the assigned color for this character
            }}
          >
            <button
              className="delete-button"
              onClick={() => handleDelete(char, i)}
            >
              X
            </button>
            <span className="char">{char}</span>
          </div>
        );
        charCounts[char] = 0;
      } else {
        cards.push(
          <div
            className="card"
            key={i}
            style={{
              backgroundColor: charColors[char],
            }}
          >
            <button
              className="delete-button"
              onClick={() => handleDelete(char, i)}
            >
              X
            </button>
            <span className="char">{char}</span>
          </div>
        );
      }
    }

    if (Object.values(charCounts).every((count) => count === 1)) {
      return (
        <div className="success">
          <h2>Success!</h2>
          <p>Every character in the string is unique.</p>
        </div>
      );
    }

    return (
      <>
        <h2 className="card-title">Cards:</h2>
        <div className="cards">{cards}</div>
      </>
    );
  };

  const renderScreen1 = () => {
    return (
      <div className="screenOne">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter a string:"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

  const renderScreen2 = () => {
    return (
      <div className="screenTwo">
        <button
          className="back-button"
          onClick={() => {
            setNewString("");
          }}
        >
          Back
        </button>
        <div className="strings">
          <h2 className="original-string">Original String: {oldstring}</h2>
          <h2 className="new-string">New String: {newString}</h2>
          {renderCards()}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {newString === "" ? renderScreen1() : renderScreen2()}
    </div>
  );
}

export default App;
