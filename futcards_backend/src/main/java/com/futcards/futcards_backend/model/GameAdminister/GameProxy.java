package com.futcards.futcards_backend.model.GameAdminister;

import com.futcards.futcards_backend.model.User.User;

public class GameProxy implements GameAdminister {
    private GameAdminister game;
 
    public GameProxy(){
        game = new GameAdministerClass();
    }

    @Override
    public void GameWait(User player) {
        game.GameWait(player);
        this.GameCreator();
    }

    @Override
    public void GameCreator() {
        if(this.getPlayersNum() >= 2){
            game.GameCreator();
        }

    }

    @Override
    public void GameSave(User player) {
        if(player.isItsLoged()){
            game.GameSave(player);
        }
    }

    @Override
    public long getPlayersNum() {
        return game.getPlayersNum();
    }
    
}
