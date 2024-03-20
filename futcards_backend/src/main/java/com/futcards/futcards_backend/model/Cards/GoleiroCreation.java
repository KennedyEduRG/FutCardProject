package com.futcards.futcards_backend.model.Cards;

import com.futcards.futcards_backend.model.PlayerCard;

public class GoleiroCreation implements CardCreation{

    @Override
    public PlayerCard Creation() {
        return new GoleiroCard();
    }
    
}
