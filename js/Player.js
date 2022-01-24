let Player = class Player{

    constructor(data){
        this.id=data.id,
        this.name=data.name,
        this.deck=data.deck,
        this.hp=data.hp
        this.cardsInHand = 40;
        this.selectedCard;
        this.color = data.color;
    }

}
export default Player