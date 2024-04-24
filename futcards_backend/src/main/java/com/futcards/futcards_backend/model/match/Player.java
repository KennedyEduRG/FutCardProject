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
    private List<PlayerCard> hand;
    private Session webSocketSession;
    private int position;

    public Player(String nickname, Session webSocketSession, int position) {
        this.playerId = UUID.randomUUID().toString();
        this.nickname = nickname;
        this.hand = new ArrayList<>();
        this.webSocketSession = webSocketSession;
        this.position = position;

        loadCardsForPosition();
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

    // Carregar 4 cartas aleatórias para a posição especificada
    private void loadCardsForPosition() {
        File file = new File("futcards_backend/src/main/resources/PARAMETROS DOS JOGADORES.xlsx"); 
        Random random =  new Random();
        int randomInt = random.nextInt(3);
        String position = null;
        switch (randomInt) {
            case 0:
                position = "atacante";
                break;
            case 1: 
                position = "meio campo";
                break;
            case 2:
                position = "zagueiro";
                break;
            case 3:
                position = "goleiro";
            default:
                break;
        }
        List<Map<String, Double>> positionData = loadPositionData(file, position);

        // Selecionar 4 cartas aleatórias
        Set<Integer> selectedIndices = new HashSet<>();

        while (selectedIndices.size() < 4) { // Garante que teremos 4 cartas únicas
            int randomIndex = random.nextInt(positionData.size());
            selectedIndices.add(randomIndex);
        }

        for (int index : selectedIndices) {
            Map<String, Double> attributes = positionData.get(index);

            PlayerCard card = new PlayerCard(
                "Carta " + (index + 1), 
                position,
                attributes.get("Altura"), 
                attributes.get("Massa"), 
                attributes.get("Forca"), 
                attributes.get("VelocidadeX"), 
                attributes.get("VelocidadeY"), 
                attributes.get("Aceleracao"),
                (long) index // ID único
            );

            hand.add(card); // Adiciona a carta à mão do jogador
        }
    }

    // Método para carregar dados de uma posição específica do arquivo XML
    private List<Map<String, Double>> loadPositionData(File file, String position) {
        List<Map<String, Double>> positionData = new ArrayList<>();
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(file);

            doc.getDocumentElement().normalize();

            NodeList nodeList = doc.getElementsByTagName(position);

            for (int i = 0; i < nodeList.getLength(); i++) {
                Node node = nodeList.item(i);

                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;

                    Map<String, Double> attributes = new HashMap<>();

                    attributes.put("VelocidadeX", Double.parseDouble(element.getElementsByTagName("VelocidadeX").item(0).getTextContent()));
                    attributes.put("VelocidadeY", Double.parseDouble(element.getElementsByTagName("VelocidadeY").item(0).getTextContent()));
                    attributes.put("Forca", Double.parseDouble(element.getElementsByTagName("Forca").item(0).getTextContent()));
                    attributes.put("Massa", Double.parseDouble(element.getElementsByTagName("Massa").item(0).getTextContent()));
                    attributes.put("Aceleracao", Double.parseDouble(element.getElementsByTagName("Aceleracao").item(0).getTextContent()));
                    attributes.put("Altura", Double.parseDouble(element.getElementsByTagName("Altura").item(0).getTextContent()));

                    positionData.add(attributes);
                }
            }
        } catch (Exception e) {
            System.out.println("Erro ao carregar dados do arquivo XML: " + e.getMessage());
        }

        return positionData;
    }
}
