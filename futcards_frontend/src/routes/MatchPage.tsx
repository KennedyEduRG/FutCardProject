import { useState } from "react";
import { Navbar } from "../components/Navbar";

export const MatchPage = () => {
  const [playerType, setPlayerType] = useState("/atacante.jpg");
  const [theDeckCards, setTheDeckCards] = useState("/zagueiro.jpg");
  const [otherCard, setOtherCard] = useState("/meioCampo.jpg");

  const [deckCardsCounter, setDeckCardsCounter] = useState(30);

  const drawCard = () => {

    setDeckCardsCounter(deckCardsCounter - 1);
  }

  return (
    <div className="App">
      <Navbar />
      <div className="fieldContainer">
        <img src="/campo.jpg" alt="Campo de Futebol" className="fieldImage" />
        <div className="card carta1">
          <img src={playerType} alt="Carta 1" className="cartaImage" />
        </div>
        <div className="blackRectangle" onClick={drawCard}>
          <span>{deckCardsCounter}</span>
        </div>
        {/* Adicione outras divs de cartas ou elementos conforme necessário */}
      </div>
        {/*<div className="card carta2">
          <img src={theDeckCards} alt="Carta 2" className="cartaImage" />
  </div>*/}
        {/* Adicione outras divs de cartas conforme necessário */}
    </div>
  );
};
