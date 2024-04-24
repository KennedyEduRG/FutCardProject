package com.futcards.futcards_backend.model.match;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GameServer {
	Map<String, Player> players = new HashMap<String, Player>();
	List<GameRoom> rooms = new ArrayList<GameRoom>();
	private String player;
	private GameServer match;
	
	public String getPlayer() {
		return player;
	}
	
	public void setPlayer(String player) {
		this.player = player;
	}
	public GameServer getMatch() {
		return match;
	}
	public void setMatch(GameServer match) {
		this.match = match;
	}
	
	
}
