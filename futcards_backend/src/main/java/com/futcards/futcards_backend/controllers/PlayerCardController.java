package com.futcards.futcards_backend.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futcards.futcards_backend.model.PlayerCard;
import com.futcards.futcards_backend.services.PlayerCardService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/cards")
public class PlayerCardController {

	@Autowired
	PlayerCardService playerCardService;

	@GetMapping
	public ResponseEntity<List<PlayerCard>> findAll() {
		List<PlayerCard> allCards = playerCardService.findAll();
		return new ResponseEntity<List<PlayerCard>>(allCards, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<PlayerCard> create(@Valid @RequestBody PlayerCard card) throws Exception {
		PlayerCard createdEntity = playerCardService.create(card);
		return new ResponseEntity<PlayerCard>(createdEntity, HttpStatus.CREATED);
	}
}

