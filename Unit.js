import {
    loadUnit
} from "./ajax.js";

loadUnit(function (data) {
    
    
    
});


export class Unit {

    constructor() {

        console.log(" Unit Constructer");
        this.range = 20;
        this.pieces = [1];
        this.basePiece = 99;
        this.attack = 20;
        this.defence = 0;
        this.hp = 0;
        this.isSelected = false;
        this.moveable = false;
        this.isPassable = false;



    }


}