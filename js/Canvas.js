export default class Canvas {
    
    constructor() {
        this.canvas   = document.querySelector('#cnv');
        this.ctx      = this.canvas.getContext('2d');
        this.w        = 500;
        this.h        = 300;
        this.cellSize = 20;
    }

    resize() {
        this.canvas.width  = this.w;
        this.canvas.height = this.h;
    }

    drawLines() {
        // rgba(50,50,50,1);
        this.ctx.fillStyle = `rgba(50,50,50,0.5)`;
        for(let y = 0; y < this.h; y+=this.cellSize) {
            this.ctx.fillRect(0, y, this.w, 1);
            for (let x = 0; x < this.w; x += this.cellSize) {
                this.ctx.fillRect(x, 0, 1, this.h);
            }
        }
        this.ctx.fillRect(0, this.h-1, this.w, 1);
        this.ctx.fillRect(this.w-1, 0, 1, this.h);
    }

    update() {
        this.resize();
        this.drawLines();
    }
    
}
