package com.futcards.futcards_backend.model.GameAdminister;

import com.futcards.futcards_backend.model.User.User;

public interface GameAdminister {


    int getPlayersNum = 0;
    abstract void GameWait(User player);
    abstract void GameCreator();
    abstract void GameSave(User player);
    abstract long getPlayersNum();
}