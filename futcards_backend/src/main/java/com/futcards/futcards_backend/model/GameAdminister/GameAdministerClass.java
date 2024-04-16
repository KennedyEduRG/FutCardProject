package com.futcards.futcards_backend.model.GameAdminister;

import java.util.ArrayList;
import java.util.List;

import com.futcards.futcards_backend.model.Game.Game;
import com.futcards.futcards_backend.model.Game.GameClass;
import com.futcards.futcards_backend.model.User.User;

public class GameAdministerClass implements GameAdminister {
    private List<User> playersWaiting = new ArrayList<User>(); 
    @Override
    public void GameWait(User player) {
        playersWaiting.add(player);
    }

    @Override
    public void GameCreator() {
        User player1 = playersWaiting.get(0);
        User player2 = playersWaiting.get(1);

        playersWaiting.remove(0);  playersWaiting.remove(0);

        Game game = new GameClass(player1,player2);

    }

    @Override
    public void GameSave(User player) {
        
    }

    public long getPlayersNum(){
        return playersWaiting.size();
    }
}
