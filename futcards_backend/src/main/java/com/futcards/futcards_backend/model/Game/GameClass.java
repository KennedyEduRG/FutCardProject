package com.futcards.futcards_backend.model.Game;

import java.util.ArrayList;
import java.util.List;

import com.futcards.futcards_backend.model.PlayerCard;
import com.futcards.futcards_backend.model.User.User;

public class GameClass implements Game{
    private User player1;
    private User player2;
    private List<PlayerCard> player1Cards = new ArrayList<PlayerCard>();
    private List<PlayerCard> player2Cards = new ArrayList<PlayerCard>();

    public GameClass(User player1, User player2 ){
        this.player1 = player1;
        this.player2 = player2;
    }

    @Override
    public void saveGame() {
        
    }

    @Override
    public void saveResult() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'saveResult'");
    }
    
}
