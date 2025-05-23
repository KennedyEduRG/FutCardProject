package com.futcards.futcards_backend.model.match;

import java.util.*;
import java.util.UUID;
import java.util.ArrayList;
import jakarta.websocket.Session;

import javax.xml.parsers.*;
import org.w3c.dom.*;

import java.io.File;

import com.futcards.futcards_backend.model.PlayerCard;

public class Player {
    private String playerId;
    private String nickname;
    PlayerCard hand;
    private Session webSocketSession;
    private int position;

    public Player(String nickname, Session webSocketSession, int position) {
        this.playerId = UUID.randomUUID().toString();
        this.nickname = nickname;
        this.webSocketSession = webSocketSession;
        this.position = position;
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

    public PlayerCard getHand() {
        return hand;
    }

    public void addCardToHand(PlayerCard card) {
        hand = card;
    }
}