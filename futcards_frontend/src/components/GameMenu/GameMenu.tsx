import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { UserPlayerInterface } from "../../interfaces/UserPlayerInterface";
import { Match } from "../../classes/Match";
import { Player } from "../../classes/Player";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs.js";

interface TaskFormProps {
  userPlayerFormData: UserPlayerInterface;
  setUserPlayerFormData: React.Dispatch<
    React.SetStateAction<UserPlayerInterface>
  >;
}

export function GameMenu(props: TaskFormProps) {
  //const options = ["Modo 1", "Modo 2", "Modo 3"];
  const [validateFields, setValidateFields] = useState(false);

  //const player1 = new Player(props.userPlayerFormData.nickName);
  const [match, setMatch] = useState(new Match());

  const [showVersusContainer, setShowVersusContainer] =
    useState<boolean>(false);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/messages", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

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
    if (message.trim()) {
      const chatMessage = {
        nickname,
        content: message,
      };

      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      //sendMessage("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    props.setUserPlayerFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  function startGame() {
    if (
      props.userPlayerFormData.nickName.length >= 5 &&
      props.userPlayerFormData.nickName.length <= 15
    ) {
      window.location.href = "/match";
    } else {
      setValidateFields(true);
      console.log("Nickname deve ter pelo menos 5 caracteres");
    }
  }

  function createARoom() {
    if (
      props.userPlayerFormData.nickName.length >= 5 &&
      props.userPlayerFormData.nickName.length <= 15
    ) {
      const player1 = new Player(props.userPlayerFormData.nickName);

      // Atualize o estado de match usando a função setMatch para manter a mesma instância
      setMatch((prevMatch) => {
        prevMatch.createRoom(player1);
        console.log(
          "O nome do player 1 em match é: " + prevMatch.player1?.nickName
        );
        return prevMatch;
      });

      setShowVersusContainer(true);

      // so vai direcionar para a tela da partida quando o segundo jogador entrar, e o primeiro jogador clicar em Iniciar
      //window.location.href = "/match";
    } else {
      setValidateFields(true);
      console.log("Nickname deve ter pelo menos 5 caracteres");
    }
  }
  // so vai direcionar para a tela da partida quando o segundo jogador entrar, e o primeiro jogador clicar em Iniciar
  //window.location.href = "/match";

  return (
    <div className={styles.container}>
      {!showVersusContainer && (
        <div className={styles.formContainer}>
          <span className={styles.formTitle}>Menu de jogo</span>
          <span className={styles.formClose}>&times;</span>
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

          <div className={styles.buttonContainer}>
            <button className="button" onClick={createARoom}>
              Criar partida
            </button>
            <button className="button" onClick={startGame}>
              Entrar com código
            </button>
          </div>
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
              Aguardando jogador 2 ...
            </div>
          </div>
          <div className={styles.startMatchButtonContainer}>
            <button className="button" onClick={match.startMatch}>
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
  );
}
