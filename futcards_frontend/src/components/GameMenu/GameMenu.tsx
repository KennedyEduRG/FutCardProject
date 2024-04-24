import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { UserPlayerInterface } from "../../interfaces/UserPlayerInterface";
//import { Match } from "../../classes/Match";
//import { Player } from "../../classes/Player";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs.js";
import { Match } from "../../interfaces/Match";
import { Navbar } from "../Navbar/Navbar";
import { PlayerCardScreenInterface } from "../../interfaces/PlayerCardScreenInterface";
import axios from "axios";
import { HandCards } from "../Card/HandCards";

interface AppProps {
  userPlayerFormData: UserPlayerInterface;
  setUserPlayerFormData: React.Dispatch<
    React.SetStateAction<UserPlayerInterface>
  >;
}

export function GameMenu(props: AppProps) {
  //const options = ["Modo 1", "Modo 2", "Modo 3"];
  const [validateFields, setValidateFields] = useState(false);

  //const player1 = new Player(props.userPlayerFormData.nickName);
  //const [match, setMatch] = useState(new Match());
  const [match, setMatch] = useState<Match>({
    player1: { nickName: "", startToPlay: false },
    player2: { nickName: "", startToPlay: false },
    matchCode: "",
  });

  const [showVersusContainer, setShowVersusContainer] =
    useState<boolean>(false);
  const [showRoomCodeInput, setShowRoomCodeInput] = useState<boolean>(true);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const [stompClient, setStompClient] = useState(null);
  const [roomCode, setRoomCode] = useState<string>("");

  // por enquanto fica assim(depoins inverter)
  const [showGame, setShowGame] = useState<boolean>(true);
  const [showGameMenu, setShowGameMenu] = useState<boolean>(false);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/matchState", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMatch(receivedMessage);
      });
    });

    /*client.connect({}, () => {
      client.subscribe("/topic/messages", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });*/

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  const handleNickNameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    stompClient.send("/app/match", {}, JSON.stringify(match));
    //stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
    //sendMessage("");
    /*if (message.trim()) {
      const chatMessage = {
        nickname,
        content: message,
      };

      stompClient.send("/app/match", {}, JSON.stringify(chatMessage));
      //stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      //sendMessage("");
    }*/
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    props.setUserPlayerFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomCodeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
  };

  const enterWithRoomCode = () => {
    console.log("roomCode é: " + roomCode);
    console.log("match.matchCode é: " + match.matchCode);
    if (roomCode === match.matchCode) {
      match.player2.nickName = props.userPlayerFormData.nickName;
      match.player2.startToPlay = true;
      setMatch(match);
      /*const newMatchState = { ...match };
      newMatchState.player2.nickName = props.userPlayerFormData.nickName;
      newMatchState.player2.startToPlay = true;
      setMatch(newMatchState);*/
      console.log(match.player2.startToPlay);
      console.log("O código da sala digitado foi: " + roomCode);
      sendMessage();

      //window.location.href = "/match";
    }
  };

  /*const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setUserPlayerFormData((prevState) => ({
      ...prevState,
      status: convertStringToIntegerStatus(event.target.value),
    }));
  };*/

  /*function convertStringToIntegerStatus(status: string) {
    switch (status) {
      case "Modo 1":
        return 1;
      case "Modo 2":
        return 2;
      case "Modo 3":
        return 3;
      default:
        return 0;
    }
  }*/

  function createARoom() {
    if (
      props.userPlayerFormData.nickName.length >= 5 &&
      props.userPlayerFormData.nickName.length <= 15
    ) {
      match.player1.nickName = props.userPlayerFormData.nickName;
      match.matchCode = "j123";
      //match.player1.startToPlay = true;
      // parei aqui, tentar setar "p123" em matchCode

      // Atualize o estado de match usando a função setMatch para manter a mesma instância

      setShowVersusContainer(true);

      // so vai direcionar para a tela da partida quando o segundo jogador entrar, e o primeiro jogador clicar em Iniciar
      //window.location.href = "/match";
    } else {
      setValidateFields(true);
      console.log("Nickname deve ter pelo menos 5 caracteres");
    }
  }

  useEffect(() => {
    if (match.player1?.startToPlay && match.player2?.startToPlay) {
      //localStorage.setItem("matchState", "match");
      //window.location.href = "/match";
      setShowGame(true);
      setShowGameMenu(false);
    }
  }, [match.player1?.startToPlay, match.player2?.startToPlay]);
  // so vai direcionar para a tela da partida quando o segundo jogador entrar, e o primeiro jogador clicar em Iniciar
  //window.location.href = "/match";

  function roomCodeInput() {
    setShowRoomCodeInput(false);
  }

  function startMatch() {
    // iniciar a partida
    const newMatchState = { ...match };
    newMatchState.player1.startToPlay = true;
    setMatch(newMatchState);
    sendMessage();
    console.log("match.player1.startToPlay é: " + match.player1.startToPlay);
    //setMatch(match);
  }

  // Script de MatchGame começa aqui

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
    screenPosition: "",
  };
  //const [playerType, setPlayerType] = useState("/atacante.jpg");
  const [allCards, setAllCards] = useState<PlayerCardScreenInterface[]>([]);

  const [handCards, setHandCards] = useState<PlayerCardScreenInterface[]>([]);
  const [deckCardsCounter, setDeckCardsCounter] = useState(0);
  const [playerCardScreen, setPlayerCardScreen] =
    useState<PlayerCardScreenInterface>(defaultPlayerCardScreen);
  //const [theDeckCards, setTheDeckCards] = useState("/zagueiro.jpg");
  //const [otherCard, setOtherCard] = useState("/meioCampo.jpg");
  //const [allCards, setAllCardsData] = useState<PlayerCard[] | null>(null);

  /*const [gameState, setGameState] = useState<Match>(
      localStorage.getItem("matchState")
    );*/

  useEffect(() => {
    // Obtenha o valor de param1 da localStorage e inicialize gameState
    //const storedParam1 = localStorage.getItem("matchState");
    //setGameState(storedParam1);

    //findAllCards();
    findAlllCardsJson();
  }, []);

  /*async function findAllCards() {
      try {
        const response = await axios.get<PlayerCardScreenInterface[]>(
          "http://localhost:8081/api/cards"
        );
        setAllCards([...response.data]);
        setDeckCardsCounter(response.data.length);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }*/

  async function findAlllCardsJson() {
    try {
      const response = await axios.get<PlayerCardScreenInterface[]>(
        "src/components/Card/allCardsData.json"
      );
      let cards = [...response.data];
      cards = embaralhar(cards);

      setAllCards([...cards]);
      setDeckCardsCounter(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  function embaralhar(
    cards: PlayerCardScreenInterface[]
  ): PlayerCardScreenInterface[] {
    return cards.sort(() => Math.random() - 0.5);
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
        return "/atacante.jpg";

      case "meioDeCampo":
        return "/meioCampo.jpg";

      case "zagueiro":
        return "/zagueiro.jpg";

      case "goleiro":
        return "/goleiro.jpg";
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
    const removedHandCard: PlayerCardScreenInterface = handCards.splice(
      index,
      1
    )[0];
    const cardOnFieldPos: PlayerCardScreenInterface = removedHandCard;
    cardOnFieldPos.screenPosition = "cardOnField";
    console.log(cardOnFieldPos.screenPosition);
    cardOnFieldPos.posicaoJogador = showHandCards(cardOnFieldPos);
    setPlayerCardScreen(cardOnFieldPos);
  }

  useEffect(() => {
    console.log("Carta tem que ir da mão para o campo");
  }, [playerCardScreen]);

  useEffect(() => {
    console.log("Quantidade de cartas no deck: " + deckCardsCounter);
  }, [deckCardsCounter]);

  return (
    <div>
      <Navbar />
      {showGameMenu && (
        <div className={styles.container}>
          <div>roomCode é: {roomCode}</div>

          <div>matchCode é: {match.matchCode}</div>
          {!showVersusContainer && (
            <div className={styles.formContainer}>
              <span className={styles.formTitle}>Menu de jogo</span>
              <span className={styles.formClose}>&times;</span>

              {showRoomCodeInput && (
                <div className={styles.inputContainer}>
                  {validateFields && (
                    <p className="text-red-600">
                      Nickname precisa ter de 5 até 15 caracteres
                    </p>
                  )}
                  <input
                    className="input"
                    name="nickName"
                    value={props.userPlayerFormData.nickName}
                    onChange={handleInputChange}
                    placeholder="Nickname"
                    type="text"
                  />
                  {/*<select className="input" onChange={handleSelectChange}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>*/}
                </div>
              )}

              {showRoomCodeInput && (
                <div className={styles.buttonContainer}>
                  <button className="button" onClick={createARoom}>
                    Criar partida
                  </button>
                  <button className="button" onClick={roomCodeInput}>
                    Entrar com código
                  </button>
                </div>
              )}

              {!showRoomCodeInput && (
                <div className="flex flex-col items-center">
                  <input
                    className="input"
                    type="text"
                    placeholder="Insira o código"
                    value={roomCode}
                    onChange={handleRoomCodeInputChange}
                  />
                  <button className="button" onClick={enterWithRoomCode}>
                    Entrar na partida
                  </button>
                </div>
              )}
            </div>
          )}
          {showVersusContainer && (
            <div className="mt-5">
              <span>Código da sala: {match.matchCode}</span>
              <div className={styles.versusContainer}>
                <div className={styles.playerImageContainer}>
                  {/* Use operador de acesso opcional ?. para evitar erros se match.player1 for nulo ou indefinido */}
                  {match.player1?.nickName}
                </div>
                <span className={styles.versusText}>Versus</span>
                <div className={styles.playerImageContainer}>
                  {match.player2?.nickName}
                </div>
              </div>
              <div className={styles.startMatchButtonContainer}>
                <button className="button" onClick={startMatch}>
                  Iniciar partida
                </button>
              </div>
              <h2>Mensagens</h2>
              <input
                type="text"
                value={nickname}
                onChange={handleNickNameChange}
                placeholder="Nickname"
              />
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Mensagem"
              />
              <button onClick={sendMessage} className="button">
                Mandar
              </button>
              <div>
                <ul>
                  3
                  {messages.map((msg, index) => (
                    <li key={index}>
                      {msg.nickname} - {msg.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {/*<div>
        {Object.keys(players).map((key) => (
          <div>{players[key].name}</div>
        ))}
      </div>*/}
        </div>
      )}

      {/*MatchPage começa aqui */}
      {showGame && (
        <div className="fieldContainer">
          <div style={{ display: "flex" }}>
            <img
              src="/campo.jpg"
              alt="Campo de Futebol"
              className="fieldImage"
            />
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
            <HandCards
              handCards={handCards}
              setCardIntoField={setCardIntoField}
              showHandCards={showHandCards}
            />
          </div>
        </div>
      )}

      {/*<div className="card carta2">
          <img src={theDeckCards} alt="Carta 2" className="cartaImage" />
  </div>*/}
      {/* Adicione outras divs de cartas conforme necessário */}
    </div>
  );
}
