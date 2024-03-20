package com.futcards.futcards_backend.model.GameAdminister;

import com.futcards.futcards_backend.model.User.User;

public class GameProxy implements GameAdminister {
    private GameAdminister game;

    public GameProxy(){
        game = new Game();
    }

    @Override
    public void GameWait(User player) {
        game.GameWait(player);
        this.GameCreator();
    }

    @Override
    public void GameCreator() {
        if(playersWaiting.size() >= 2){
            game.GameCreator();
            playersWaiting.remove(0);
            playersWaiting.remove(1);
        }

    }

    @Override
    public void GameSave(User player) {
        if(player.isItsLoged()){
            game.GameSave(player);
        }
    }
    
}
