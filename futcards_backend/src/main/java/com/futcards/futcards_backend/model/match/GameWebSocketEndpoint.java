package com.futcards.futcards_backend.model.match;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;


@ServerEndpoint("/game/{roomId}/{playerId}")
public class GameWebSocketEndpoint {
    private static Map<String, GameRoom> gameRooms = new ConcurrentHashMap<>(); // Gerenciamento de salas de jogo
    private static Map<String, Player> connectedPlayers = new ConcurrentHashMap<>(); // Gerenciamento de jogadores conectados

    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") String roomId, @PathParam("playerId") String playerId) {
        // Recupera ou cria a sala de jogo
        GameRoom gameRoom = gameRooms.get(roomId);
        if (gameRoom == null) {
            gameRoom = new GameRoom();
            gameRooms.put(roomId, gameRoom);
        }

        // Cria e adiciona um jogador à sala de jogo
        Player player = new Player(playerId, session, 1);
        gameRoom.addPlayer(player);
        connectedPlayers.put(session.getId(), player);

        // Notifica o início do jogo ou outras mensagens relevantes
        gameRoom.sendGameStartMessage();
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        // Recebe mensagens dos jogadores e processa a entrada
        Player player = connectedPlayers.get(session.getId());
        if (player == null) {
            return; // Se não há jogador, ignora a mensagem
        }

        GameRoom gameRoom = getPlayerGameRoom(player);

        if (gameRoom != null) {
            gameRoom.receivePlayerCardChoice(player, message); // Processa a mensagem
        }
    }

    @OnClose
    public void onClose(Session session) {
        // Quando a conexão é fechada, remove o jogador e ajusta a sala de jogo
        Player player = connectedPlayers.remove(session.getId());
        if (player != null) {
            GameRoom gameRoom = getPlayerGameRoom(player);
            if (gameRoom != null) {
                gameRoom.getPlayers().remove(player);

                // Se a sala de jogo estiver vazia, ela pode ser removida
                if (gameRoom.getPlayers().isEmpty()) {
                    gameRooms.remove(gameRoom.getRoomId());
                }
            }
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        // Gerencia erros de WebSocket
        System.err.println("Erro na conexão WebSocket: " + throwable.getMessage());
    }

    private GameRoom getPlayerGameRoom(Player player) {
        for (GameRoom room : gameRooms.values()) {
            if (room.getPlayers().contains(player)) {
                return room;
            }
        }
        return null;
    }
}
