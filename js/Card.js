
let Card = class Card{

    constructor(unit){

        this.x=100;
        this.y=window.innerHeight - 300
        this.in_r=120 * Math.sqrt(3) / 2;;
        this.cir_r;
        this.unit=unit
        this.look = new Image();
        this.look.src = this.unit.look;

    }



}
export default Card
