package com.futcards.futcards_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.futcards.futcards_backend.model.PlayerCard;

@Repository
public interface PlayerCardRepository extends JpaRepository<PlayerCard, Long> {

}
