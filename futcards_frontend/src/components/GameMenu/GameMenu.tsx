import React from "react";
import styles from "./styles.module.css";
import { UserPlayerInterface } from "../../interfaces/UserPlayerInterface";

interface TaskFormProps {
  userPlayerFormData: UserPlayerInterface;
  setUserPlayerFormData: React.Dispatch<React.SetStateAction<UserPlayerInterface>
  >;
  startGame: () => void;
}

export function GameMenu(props: TaskFormProps) {
  const options = ["A fazer", "Em andamento", "Concluída"];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    props.setUserPlayerFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setUserPlayerFormData((prevState) => ({
      ...prevState,
      status: convertStringToIntegerStatus(event.target.value),
    }));
  };

  function convertStringToIntegerStatus(status: string) {
    switch (status) {
      case "A fazer":
        return 1;

      case "Em andamento":
        return 2;

      case "Concluída":
        return 3;

      default:
        return 0;
    }
  }

  return (
    <>
      <div className={styles.formContainer}>
        <span className={styles.formTitle}>Menu de jogo</span>
        <span className={styles.formClose}>&times;</span>
        <div className={styles.inputContainer}>
          <input
            className="input"
            name="nickName"
            value={props.userPlayerFormData.nickName}
            onChange={handleInputChange}
            placeholder="Nickname"
            type="text"
          />
          <select className="input" onChange={handleSelectChange}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/*<br /><p>Valor selecionado: {props.taskFormData.status}</p>*/}
        </div>

        <div className={styles.buttonContainer}>
          <button className="button" onClick={props.startGame}>
            Iniciar partida
          </button>
        </div>
      </div>
    </>
  );
}
