import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../GameMenu/styles.module.css";
import { UserPlayerInterface } from "../../interfaces/UserPlayerInterface";
//import { Match } from "../../classes/Match";
//import { Player } from "../../classes/Player";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs.js";
import { PlayerCardScreenInterface } from "../../interfaces/PlayerCardScreenInterface";

interface TaskFormProps {
  handCards: PlayerCardScreenInterface[];
  setCardIntoField: (number: number) => void;
  showHandCards: (item: PlayerCardScreenInterface) => string | undefined;
}

export function HandCards(props: TaskFormProps) {
  const [validateFields, setValidateFields] = useState(false);

  return (
    <>
      {props.handCards.map((item, index) => (
        <div key={index} onClick={() => props.setCardIntoField(index)}>
          <img
            src={props.showHandCards(item)}
            alt={item.posicaoJogador}
            className={styles.cardOnHand}
          />
          <div
            className={styles.hPosition}
            style={{ left: `${4.8 + index * 25}%` }}
          >
            {item.H}
          </div>
          <div
            className={styles.VxPosition}
            style={{ left: `${16.8 + index * 25}%` }}
          >
            {item.Vx}
          </div>
          <div
            className={styles.mPosition}
            style={{ left: `${4.8 + index * 25}%` }}
          >
            {item.m}
          </div>
          <div
            className={styles.VyPosition}
            style={{ left: `${16.8 + index * 25}%` }}
          >
            {item.Vy}
          </div>
          <div
            className={styles.fcPosition}
            style={{ left: `${4.8 + index * 25}%` }}
          >
            {item.F}
          </div>
          <div
            className={styles.axPosition}
            style={{ left: `${16.8 + index * 25}%` }}
          >
            {item.a}
          </div>
        </div>
      ))}
    </>
  );
}
