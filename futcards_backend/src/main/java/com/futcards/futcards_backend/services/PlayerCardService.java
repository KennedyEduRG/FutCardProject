package com.futcards.futcards_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futcards.futcards_backend.model.PlayerCard;
import com.futcards.futcards_backend.repositories.PlayerCardRepository;

@Service
public class PlayerCardService {

	@Autowired
	private PlayerCardRepository cardRepository;

	public List<PlayerCard> findAll() {
		List<PlayerCard> finances = cardRepository.findAll();
		return finances;
	}
	
	
	public PlayerCard create(PlayerCard card) throws Exception {
		/*if(card.getNome().length() < 5) {
			throw new Exception("Nome da carta tem que ter pelo "
					+ "menos 5 caracteres");
		}*/
		PlayerCard createdCard = cardRepository.save(card);
		return createdCard;
	}
}
