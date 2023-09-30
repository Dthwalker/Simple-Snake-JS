import Canvas from "/js/Canvas.js";
import Logic from "/js/logic.js"

class Main {

    static start() {
        this.canvas = new Canvas();
        this.logic  = new Logic(this.canvas);

        this.speed  = 100;
        
        this.loop();
    }

    static end() {
        let block = document.createElement('div');
        block.className = 'end'
        block.innerHTML = `Счет: ${this.logic.score}
                          <button>restart</button>`
        block.querySelector('button').onclick = () => {
            this.start();
            block.remove();
        }
        document.body.append(block)
    }

    static loop() {
        this.canvas.update();
        this.logic.update();
        
        if (this.logic.end) {
            this.end()
        } else {
            setTimeout(this.loop.bind(this), this.speed)
        }
    }
    
}

Main.start();


