import Cell from "/js/Cell.js";
import Food from "/js/Food.js";
export default class Logic {

    constructor(cnv) {
        
        this.data  = [];
        this.cnv   = cnv;
        this.w     = cnv.w/cnv.cellSize;
        this.h     = cnv.h/cnv.cellSize;
        this.cS    = cnv.cellSize;
        this.snake = [];
        this.sSize = 2;
        this.dX    = 0;
        this.dY    = -1;
        this.food  = null;
        this.end   = false;
        this.score = 0;

        this.createData();
        this.createSnake();
        this.createFood();
        this.navigator();
        console.log(this.data)
    }

    createData() {
        this.data = [];
        for (let y = 0; y < this.h; y++) {
            this.data.push([]);
            for (let x = 0; x < this.w; x++) {
                this.data[y].push(0)
            }
        }
    }

    createSnake() {
        this.snake.push(new Cell(
            Math.round(this.w / 2),
            Math.round(this.h / 2 - 1),
            this.cS))
        this.snake.push(new Cell(
            Math.round(this.w / 2),
            Math.round(this.h / 2),
            this.cS))
    }

    createFood() {
        this.createData();
        let random = (min, max) => Math.round(Math.random() * (max- min) + min)
        let stopB = this.snake.map(e => {return {x:e.x, y:e.y}})
        stopB.forEach(e => this.data[e.y][e.x] = 's');
        
        let whiteB = this.data.slice();
        whiteB = whiteB.map((a,y) => a.map((e,x) => {
            return e != 's'? {x:x, y:y} : false
        }).filter(e => e)).flat()

        let pose = whiteB[random(0, whiteB.length - 1)]
        console.log(this.data)
        this.food = new Food(pose.x, pose.y, this.cS)
    }

    snakeMove() {
        let head = this.snake[0]
        let [x,y] = [head.x + this.dX, head.y + this.dY]
        x = x<0? this.w-1:x>this.w-1?0:x
        y = y<0?this.h-1:y>this.h-1?0:y,

        this.snake.unshift(new Cell(
            x,
            y,
            this.cS
        ));
        this.snake.length > this.sSize ? this.snake.pop(): null

        this.snake.forEach((e,i) => {
            i>0 && e.x == x && e.y ==  y ? this.end = true : null
        })

        head = this.snake[0]
        if ( head.x == this.food.x && head.y == this.food.y ) {
            this.sSize++;
            this.score++;
            this.createFood();
        }

        this.snake.forEach(e => {
            e.draw(this.cnv.ctx)
        });
        this.food.draw(this.cnv.ctx)
    }

    navigator() {
        addEventListener('keydown', ({code}) => {
            switch (code) {
                case 'ArrowUp':
                    this.dX = 0;
                    this.dY != 1 ? this.dY = -1 : null;
                    break;
                case 'ArrowDown':
                    this.dX = 0;
                    this.dY != -1 ? this.dY = 1 : null;
                    break;
                case 'ArrowLeft':
                    this.dX != 1 ? this.dX = -1 : null;
                    this.dY = 0;
                    break;
                case 'ArrowRight':
                    this.dX != -1 ? this.dX = 1 : null
                    this.dY = 0;
                    break;
            }
        })
    }

    update() {
        this.snakeMove()

    }

}