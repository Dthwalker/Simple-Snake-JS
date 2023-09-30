import Cell from "/js/Cell.js"

export default class Food extends Cell {

    constructor(x, y, size){
        super(x,y,size);
        this.color = 'rgb(50, 150, 50)';
    }
}

