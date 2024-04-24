package com.futcards.futcards_backend.model.match;

import java.util.*;
import jakarta.websocket.Session;

import com.futcards.futcards_backend.model.PlayerCard;

public class GameRoom {
    private String roomId;
    private List<Player> players;
    private List<PlayerCard> cardsPlayed;
    private Map<Player, Integer> playerPositions;
    private final int WINNING_POSITION = 5;
    private List<String> questions;
    private Random random;
    private int numRandomCard; 

    public GameRoom() {
        this.roomId = UUID.randomUUID().toString();
        this.players = new ArrayList<>();
        this.cardsPlayed = new ArrayList<>();
        this.playerPositions = new HashMap<>();
        this.random = new Random();

        questions.add("Os ATACANTES estão comparando seus parâmetros. Eles escolheram chutar a bola o mais longe possível. Para isso, eles acordaram chutar a bola da mesma posição, sem lançar, ou seja, a bola só pode rolar. Qual dos jogadores ganhará esta disputa?");
        questions.add("Um MEIO-CAMPO e um ZAGUEIRO participarão de um lance em que eles partem do repouso e começam a correr. O meio-campo busca receber a bola, enquanto o zagueiro deseja interceptar. O mais importante nessa jogada é que um jogador passe na frente do outro. Que ultrapassará o outro?");
        questions.add("Durante o intervalo, os GOLEIROS dos dois times estavam disputando para saber quem tinha o maior pulo, ou seja, nesse evento em específico não é contabilizada a altura destes jogadores. Goleiros com os maiores saltos têm mais chances de pegar a bola chutada ao seu gol. Quem conseguiu se sair melhor nesta brincadeira?");
        questions.add("Um MEIO-CAMPO e um ZAGUEIRO estão correndo lado a lado e um deles executa o movimento de projeção do corpo sobre o outro jogador, chamado de “carga”, muito usado para mudar a trajetória do adversário, muitas vezes há um desequilíbrio e um dos jogadores acaba por cair. Que jogador ficará de pé depois dessa ação?");
        questions.add("Dois MEIO-CAMPOS partem do mesmo ponto, mantendo suas velocidades constantes, buscam chegar primeiro à bola. Eles correm em linha reta, lado a lado. É um lance importante para ter a posse de bola para o seu time. Quem chegará primeiro à bola?");
        questions.add("Um ATACANTE e um ZAGUEIRO estão na área do goleiro. Uma bola é lançada na área. Sem sair do chão o jogador mais alto conseguiu cabecear a bola. Quem conseguiu completar o lance?");
    }

    public String getRandomQuestion() {
        numRandomCard = random.nextInt(questions.size());
        return questions.get(numRandomCard);
    }

    public String getRoomId() {
        return roomId;
    }

    public void addPlayer(Player player) {
        if (players.size() < 2) { 
            players.add(player);
            this.playerPositions.put(player, 0); // Inicia a posição no tabuleiro
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

    public void sendGameStartMessage() {
        String message = "O jogo começou! Cada jogador compra 4 cartas aleatórias. Quem completar 5 casas primeiro, vence.";
        for (Player player : players) {
            sendMessageToPlayer(player, message);
        }
    }

    public void sendQuestionToPlayers(String question) {
        String message = "Pergunta: " + question;
        for (Player player : players) {
            sendMessageToPlayer(player, message);
        }
    }

    public void playRound(PlayerCard card1, PlayerCard card2) {
        String question = "Qual carta é mais forte?"; // Pergunta para determinar a carta vencedora
        sendQuestionToPlayers(question);

        // Lógica para determinar o vencedor da rodada
        PlayerCard winnerCard = determineWinner(card1, card2);
        Player winnerNickname = (winnerCard == card1) ? players.get(0) : players.get(1);

        // Avança a posição do vencedor
        advancePlayer(winnerNickname);

        // Notifica os jogadores do vencedor da rodada
        sendMessageToPlayer(winnerNickname, "Você venceu a rodada!");
    }

    private PlayerCard determineWinner(PlayerCard card1, PlayerCard card2) {
        // Lógica para determinar a carta vencedora
        // Simplesmente comparando o valor das cartas
        return (card1.getValue() > card2.getValue()) ? card1 : card2;
    }

    private void advancePlayer(Player winnerNickname) {
        int currentPosition = playerPositions.get(winnerNickname);
        currentPosition++;
        playerPositions.put(winnerNickname, currentPosition);

        // Se um jogador alcançar a posição 5, ele vence
        if (currentPosition >= WINNING_POSITION) {
            sendMessageToPlayer(winnerNickname, "Parabéns! Você venceu o jogo!");
        }
    }

    private void sendMessageToPlayer(Player winner, String message) {
        Session session = winner.getWebSocketSession();
        if (session != null && session.isOpen()) {
            try {
                session.getBasicRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
