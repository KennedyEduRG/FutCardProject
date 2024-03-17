package BackEnd.Cards.SoccersPlayersCards;

public class GoleiroCreation implements CardCreation{

    @Override
    public PlayerCard Creation() {
        return new GoleiroCard();
    }
    
}
