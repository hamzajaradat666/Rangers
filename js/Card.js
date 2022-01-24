
class Card{

    constructor(unit){
        this.id;
        this.owner;
        this.x=100;
        this.y=window.outerHeight - 300
        this.in_r=100 * Math.sqrt(3) / 2;;
        this.cir_r;
        this.unit=unit
        this.side=window.outerWidth / 100 * 2
        this.look = new Image();
        this.look.src = this.unit.look;

    }



}
export default Card
