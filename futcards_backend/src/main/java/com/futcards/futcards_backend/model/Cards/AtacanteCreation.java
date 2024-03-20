package com.futcards.futcards_backend.model.Cards;
import com.futcards.futcards_backend.model.PlayerCard;
public class AtacanteCreation implements CardCreation{

    @Override
    public PlayerCard Creation() {
        return new AtacanteCard();
    }
    
}
