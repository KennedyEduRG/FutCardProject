package com.futcards.futcards_backend.controllers;

import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.futcards.futcards_backend.model.match.ChatMessage;
import com.futcards.futcards_backend.model.match.Match;

@Controller
public class MatchController {
	@MessageMapping("/chat")
	@SendTo("/topic/messages")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
		System.out.println("O cliente se conectou ao socket no servidor");
		chatMessage.setTimestamp(new Date());
		System.out.println("Nickname: " + chatMessage.getNickname());
		System.out.println("Mensagem: " + chatMessage.getContent());
		return chatMessage;
	}
	
	
	@MessageMapping("/match")
	@SendTo("/matchState")
	public Match sendMatchState(@Payload Match matchState) {
		return matchState;
	}
}
