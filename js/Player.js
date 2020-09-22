let Player = class Player{

    constructor(data){
        this.id=data.id,
        this.name=data.name,
        this.deck=data.deck,
        this.hp=data.hp
        this.cardsInHand = [];
        this.selectedCard = this.deck[0];
    }

}
export default Player