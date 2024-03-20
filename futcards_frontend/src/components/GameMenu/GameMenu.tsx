import React, { useState } from "react";
import styles from "./styles.module.css";
import { UserPlayerInterface } from "../../interfaces/UserPlayerInterface";

interface TaskFormProps {
  userPlayerFormData: UserPlayerInterface;
  setUserPlayerFormData: React.Dispatch<React.SetStateAction<UserPlayerInterface>>;
}

export function GameMenu(props: TaskFormProps) {
  const options = ["Modo 1", "Modo 2", "Modo 3"];
  const [validateFields, setValidateFields] = useState(false)

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
      case "Modo 1":
        return 1;
      case "Modo 2":
        return 2;
      case "Modo 3":
        return 3;
      default:
        return 0;
    }
  }

  function startGame() {
    if (props.userPlayerFormData.nickName.length >= 5 && props.userPlayerFormData.nickName.length <= 15) {
      window.location.href = "/match";
    } else {
      setValidateFields(true)
      console.log("Nickname deve ter pelo menos 5 caracteres");
    }
  }

  return (
    <>
      <div className={styles.formContainer}>
        <span className={styles.formTitle}>Menu de jogo</span>
        <span className={styles.formClose}>&times;</span>
        <div className={styles.inputContainer}>
          {validateFields &&<p className="text-red-600">Nickname precisa ter de 5 até 15 caracteres</p>}
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
        </div>

        <div className={styles.buttonContainer}>
          <button className="button">
            Criar partida
          </button>
          <button className="button" onClick={startGame}>
            Entrar partida
          </button>
        </div>
      </div>
    </>
  );
}
