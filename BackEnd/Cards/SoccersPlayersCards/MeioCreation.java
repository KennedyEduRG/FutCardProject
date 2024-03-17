package BackEnd.Cards.SoccersPlayersCards;

public class MeioCreation implements CardCreation{

    @Override
    public PlayerCard Creation() {
        return new MeioCard();
    }
    
}
