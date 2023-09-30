export default class Cell {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = 'rgb(50,50,50)'
    }

    draw(ctx) {
        let [normalX, normalY] = [this.x * this.size, this.y * this.size];
        ctx.fillStyle = this.color;
        ctx.fillRect(normalX,normalY, this.size, this.size);
    }

}