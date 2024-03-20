import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import styles from "./styles.module.css";
//import { PlayerCardInterface } from "../interfaces/PlayerCardInterface";
import axios from "axios";
import { PlayerCardScreenInterface } from "../interfaces/PlayerCardScreenInterface";


const defaultPlayerCardScreen = {
  nome: "",
  posicaoJogador: "",
  altura: 0,
  massa: 0,
  forca: 0,
  velocidadeX: 0,
  velocidadeY: 0,
  aceleracao: 0,
  id: 0,
  screenPosition: ""
}
export const MatchPage = () => {
  
  //const [playerType, setPlayerType] = useState("/atacante.jpg");
  const [allCards, setAllCards] = useState<PlayerCardScreenInterface[]>([]);
  const [handCards, setHandCards] = useState<PlayerCardScreenInterface[]>([]);
  const [deckCardsCounter, setDeckCardsCounter] = useState(0);
  const [playerCardScreen, setPlayerCardScreen] = useState<PlayerCardScreenInterface>(defaultPlayerCardScreen);
  //const [theDeckCards, setTheDeckCards] = useState("/zagueiro.jpg");
  //const [otherCard, setOtherCard] = useState("/meioCampo.jpg");
  //const [allCards, setAllCardsData] = useState<PlayerCard[] | null>(null);

  useEffect(() => {
    findAllCards();
  }, []);

  async function findAllCards() {
    try {
      const response = await axios.get<PlayerCardScreenInterface[]>(
        "http://localhost:8081/api/cards"
      );
      setAllCards([...response.data]);
      setDeckCardsCounter(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const drawCard = () => {
    if (deckCardsCounter > 0 && handCards.length < 4) {
      setDeckCardsCounter((prevCount) => prevCount - 1);
      const newHandCard = allCards.shift();

      if (newHandCard) {
        setHandCards([...handCards, newHandCard]);
        console.log("A nova carta que vai para handCards: " + newHandCard.nome);
      } else {
        console.log("Erro ao retirar a carta do deck.");
      }
    }
  };

  function showHandCards(item: PlayerCardScreenInterface): string | undefined {
    switch (item.posicaoJogador) {
      case "atacante":
        return "atacante.jpg";

      case "meioDeCampo":
        return "/meioCampo.jpg";

      case "zagueiro":
        return "/zagueiro.jpg";
    }
  }

  /*function setPlayerPlayPosition(): string | undefined {
    switch (playerCardScreen?.posicaoJogador) {
      case "atacante":
        return "atacante.jpg";

      case "meioDeCampo":
        return "/meioCampo.jpg";

      case "zagueiro":
        return "/zagueiro.jpg";
    }
  }*/

  function setCardIntoField(index: number) {
    const removedHandCard: PlayerCardScreenInterface = handCards.splice(index, 1)[0];
    const cardOnFieldPos: PlayerCardScreenInterface = removedHandCard;
    cardOnFieldPos.screenPosition = "cardOnField";
    console.log(cardOnFieldPos.screenPosition)
    cardOnFieldPos.posicaoJogador = showHandCards(cardOnFieldPos);
    setPlayerCardScreen(cardOnFieldPos);
  }

  useEffect(() => {
    console.log("Carta tem que ir da mão para o campo");
  }, [playerCardScreen]);

  useEffect(() => {
    console.log("Quantidade de cartas no deck: " + deckCardsCounter);
  }, [deckCardsCounter]);

  /*function verDados() {
    console.log(allCards[0]?.nome);
  }*/

  return (
    <>
      <Navbar />
      <div className="fieldContainer">
        <div style={{ display: "flex" }}>
          <img src="/campo.jpg" alt="Campo de Futebol" className="fieldImage" />
        </div>
        <div className={playerCardScreen?.screenPosition}>
          {/*<img src={playerType} alt="Carta 1" className="cartaImage" />*/}
          <img src={`${playerCardScreen?.posicaoJogador}`} alt="" />

        </div>
        {deckCardsCounter > 0 && (
          <div className="deckCardsContainer" onClick={drawCard}>
            <span>{deckCardsCounter}</span>
          </div>
        )}

        {/* Adicione outras divs de cartas ou elementos conforme necessário */}
        {/*<button onClick={verDados}>Ver dados</button>*/}
        <div className={styles.handCardsContainer}>
  {handCards.map((item, index) => (
    <div key={index} onClick={() => setCardIntoField(index)}>
      <img src={showHandCards(item)} alt={item.posicaoJogador} className={styles.cardOnHand} /> -{" "}
      {item.nome}
    </div>
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