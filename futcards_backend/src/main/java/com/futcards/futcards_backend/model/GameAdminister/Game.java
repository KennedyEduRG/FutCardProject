package com.futcards.futcards_backend.model.GameAdminister;

import com.futcards.futcards_backend.model.User.User;

public class Game implements GameAdminister {

    @Override
    public void GameWait(User player) {
        playersWaiting.add(player);
    }

    @Override
    public void GameCreator() {
        
    }

    @Override
    public void GameSave(User player) {
        
    }

}
