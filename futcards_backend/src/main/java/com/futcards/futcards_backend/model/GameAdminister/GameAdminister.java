package com.futcards.futcards_backend.model.GameAdminister;

import java.util.ArrayList;
import java.util.List;

import com.futcards.futcards_backend.model.User.User;

public interface GameAdminister {
    List<User> playersWaiting = new ArrayList<User>(); 

    abstract void GameWait(User player);
    abstract void GameCreator();
    abstract void GameSave(User player);
}