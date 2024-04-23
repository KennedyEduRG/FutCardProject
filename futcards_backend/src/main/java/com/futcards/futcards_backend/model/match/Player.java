package com.futcards.futcards_backend.model.match;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;
import jakarta.websocket.Session;

import com.futcards.futcards_backend.model.PlayerCard;

public class Player {
    private String playerId;
    private String nickname;
    private List<PlayerCard> hand;
    private Session webSocketSession;

    public Player(String nickname, Session webSocketSession) {
        this.playerId = UUID.randomUUID().toString();
        this.nickname = nickname;
        this.hand = new ArrayList<>();
        this.webSocketSession = webSocketSession;
    }

    public String getNickname() {
        return nickname;
    }

    public Session getWebSocketSession() {
        return webSocketSession;
    }

    public void setWebSocketSession(Session session) {
        this.webSocketSession = session;
    }

    public List<PlayerCard> getHand() {
        return hand;
    }

    public void addCardToHand(PlayerCard card) {
        hand.add(card);
    }

    public void removeCardFromHand(PlayerCard card) {
        hand.remove(card);
    }

    public PlayerCard chooseCardToPlay(int index) {
        if (index >= 0 && index < hand.size()) {
            return hand.remove(index);
        } else {
            throw new IndexOutOfBoundsException("Índice de carta inválido");
        }
    }
}