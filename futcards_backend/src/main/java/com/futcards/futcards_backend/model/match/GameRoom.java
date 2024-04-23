package com.futcards.futcards_backend.model.match;

import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

import com.futcards.futcards_backend.model.PlayerCard;

public class GameRoom {
    private String roomId;
    private List<Player> players;
    private List<PlayerCard> cardsPlayed;

    public GameRoom() {
        this.roomId = UUID.randomUUID().toString();
        this.players = new ArrayList<>();
        this.cardsPlayed = new ArrayList<>();
    }

    public String getRoomId() {
        return roomId;
    }

    public void addPlayer(Player player) {
        if (players.size() < 2) { 
            players.add(player);
        }
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void addCardPlayed(PlayerCard card) {
        cardsPlayed.add(card); 
    }

    public List<PlayerCard> getCardsPlayed() {
        return cardsPlayed;
    }

    /*public PlayerCard determineWinner() {

    }*/
}