package com.futcards.futcards_backend.model.match;

import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

import com.futcards.futcards_backend.model.PlayerCard;

public class Player {
    private String playerId; 
    private String nickname;
    private List<PlayerCard> hand; 

    public Player(String nickname) {
        this.playerId = UUID.randomUUID().toString();
        this.nickname = nickname;
        this.hand = new ArrayList<>();
    }

    public String getPlayerId() {
        return playerId; 
    }

    public String getNickname() {
        return nickname; 
    }

    public void setNickname(String nickname) {
        this.nickname = nickname; 
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