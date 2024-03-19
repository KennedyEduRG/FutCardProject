import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import styles from "./styles.module.css";
import { PlayerCardInterface } from "../interfaces/PlayerCardInterface";
import axios from "axios";

export const MatchPage = () => {
  const [playerType, setPlayerType] = useState("/atacante.jpg");
  const [allCards, setAllCards] = useState<PlayerCardInterface[]>([]);
  const [handCards, setHandCards] = useState<PlayerCardInterface[]>([]);
  const [deckCardsCounter, setDeckCardsCounter] = useState(0);
  //const [theDeckCards, setTheDeckCards] = useState("/zagueiro.jpg");
  //const [otherCard, setOtherCard] = useState("/meioCampo.jpg");
  //const [allCards, setAllCardsData] = useState<PlayerCard[] | null>(null);


  useEffect(() => {
    findAllCards();
  }, []);

  async function findAllCards() {
    try {
      const response = await axios.get<PlayerCardInterface[]>(
        "http://localhost:8081/api/cards"
      );
      setAllCards([ ...response.data ]);
      setDeckCardsCounter(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const drawCard = () => {
    if (deckCardsCounter > 0) {
      setDeckCardsCounter((prevCount) => prevCount - 1);
      const newHandCard = allCards.shift();

      if (newHandCard) {

        setHandCards([...handCards, newHandCard]);
        console.log("A nova carta que vai para handCards: " + newHandCard.nome);

        showHandCards();
      } else {
        console.log("Erro ao retirar a carta do deck.");
      }
    }
  };

  function showHandCards(item: PlayerCardInterface): string | undefined {
    switch(item.posicaoJogador) {
      case "atacante":

        return "atacante.jpg"

      case "meioDeCampo":

        return "/meioCampo.jpg"

      case "zagueiro":

        return "/zagueiro.jpg"
    }
  }
  
  
  

  useEffect(() => {
    console.log(
      "Quantidade de cartas no deck: " +
        deckCardsCounter
    );
  }, [deckCardsCounter]);

  function verDados() {
    console.log(allCards[0]?.nome);
  }

  return (
    <>
      <Navbar />
      <div className="fieldContainer">
        <div style={{ display: "flex" }}>
          <img src="/campo.jpg" alt="Campo de Futebol" className="fieldImage" />
        </div>
        <div className="cartaColocada">
          <img src={playerType} alt="Carta 1" className="cartaImage" />
        </div>
        {deckCardsCounter > 0 && (
          <div className="deckCardsContainer" onClick={drawCard}>
            <span>{deckCardsCounter}</span>
          </div>
        )}

        {/* Adicione outras divs de cartas ou elementos conforme necessário */}
        <button onClick={verDados}>Ver dados</button>
        <div className={styles.handCardsContainer}>
            {handCards.map((item, index) => (
                <div key={index}><img src={showHandCards(item)} alt={item.posicaoJogador} /> - {item.nome}</div>
            ))}
        </div>
      </div>

      {/*<div className="card carta2">
          <img src={theDeckCards} alt="Carta 2" className="cartaImage" />
  </div>*/}
      {/* Adicione outras divs de cartas conforme necessário */}
    </>
  );
};
